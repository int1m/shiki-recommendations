import pymongo
import pandas as pd

from os import getenv

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer


environment = getenv("env")

if environment == 'production':
    from configs.config import ConfigProd as Config
else:
    from configs.config import ConfigDev as Config


class ContentBasedRecommender:
    def __init__(self):
        self.df, self.similarity = self.preprocessData()

    @staticmethod
    def preprocessData():
        stopWords = stopwords.words('russian')
        ps = SnowballStemmer("russian")

        client = pymongo.MongoClient(Config.MONGODB_URL)
        db = client["shikireki"]
        coll = db['animes']

        df = pd.DataFrame(list(coll.find()))
        df = df[["externalId", "name", "description", "genres", "rating", "status", "kind", "synonyms", "studios",
                 "duration", "episodes", "score"]]

        def convert(obj):
            L = []
            for i in obj:
                L.append(i["name"])
            return L

        def stem(text):
            y = []
            for i in text.split():
                y.append(ps.stem(i))
            return " ".join(y)

        df.dropna(inplace=True)
        df = df.reset_index(drop=True)
        df['genres'] = df['genres'].apply(convert)
        df['studios'] = df['studios'].apply(convert)
        df['description'] = df['description'].apply(lambda x: x.split())
        df['description'] = df['description'].apply(lambda x: [i.replace(" ", "") for i in x])
        df['genres'] = df['genres'].apply(lambda x: [i.replace(" ", "") for i in x])
        df['studios'] = df['studios'].apply(lambda x: [i.replace(" ", "") for i in x])
        df['tags'] = df['description'] + df['genres'] + df['studios']

        new_df = df[['externalId', 'name', 'tags']].copy()
        new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))
        new_df['tags'] = new_df['tags'].apply(lambda x: x.lower())
        new_df['tags'] = new_df['tags'].apply(stem)

        cv = CountVectorizer(max_features=5000, encoding='koi8r', stop_words=stopWords)
        vectors = cv.fit_transform(new_df['tags']).toarray()
        similarity = cosine_similarity(vectors)
        return new_df, similarity

    def recommend(self, anime, sigma):
        anime_list = list()
        anime_index = self.df[self.df['externalId'] == anime].index[0]
        distances = self.similarity[anime_index]
        anime_list_all = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])
        for i in anime_list_all:
            if i[1] > sigma:
                anime_list.append(i)
        res = list()
        for i in anime_list:
            res.append({"name": self.df['name'].loc[i[0]],  "externalId": self.df['externalId'].loc[i[0]]})
        return res


if __name__ == '__main__':
    contentBasedRecommender = ContentBasedRecommender()
    recommendation = contentBasedRecommender.recommend(anime=40462, sigma=0.20)
    print(recommendation)
