import pymongo
import pandas as pd
import numpy as np

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer

stopWords = stopwords.words('russian')
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)
ps = SnowballStemmer("russian")

# name desc(?) genres rating status kind synonyms studios seyu mangaka 
# duration episodes score

# db_client = pymongo.MongoClient('mongodb://shiki:gf9ff8791khhdg@localhost:27017/shiki-recommendations/animes')
# current_db = db_client("shiki-recommendations")
client = pymongo.MongoClient('mongodb://root:gkkI7ifm3cmOpQerxb@localhost:27017/')
db = client["shiki-recommendations"]
coll = db['animes']

query = {}

# for x in coll.find(query, {'_id': 0, "externalId": 1, "name": 1, "description": 1, "duration": 1, "episodes": 1, "genres": 1, "rating": 1, "score": 1 }):
#     print(x)
df = pd.DataFrame(list(coll.find()))
df = df[["externalId", "name", "description", "genres", "rating", "status", "kind", "synonyms", "studios", "duration", "episodes", "score"]]
df_digits = df[["duration", "episodes", "score"]]
df_words = pd.DataFrame(list(coll.find(query, {'_id': 0, "externalId": 1, "name": 1, "description": 1, "genres": 1, "rating": 1, "status": 1, "kind": 1})))
# print(df.info())
# print(df.genres[0])

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




df.dropna(inplace = True)
df = df.reset_index(drop=True)
df['genres'] = df['genres'].apply(convert)
df['studios'] = df['studios'].apply(convert)
df['description'] = df['description'].apply(lambda x:x.split())

df['description'] = df['description'].apply(lambda x:[i.replace(" ", "") for i in x])
df['genres'] = df['genres'].apply(lambda x:[i.replace(" ", "") for i in x])
df['studios'] = df['studios'].apply(lambda x:[i.replace(" ", "") for i in x])

df['tags'] = df['description'] + df['genres'] + df['studios']

new_df = df[['externalId', 'name', 'tags']].copy()
new_df['tags'] = new_df['tags'].apply(lambda x:" ".join(x))
new_df['tags'] = new_df['tags'].apply(lambda x:x.lower())
new_df['tags'] = new_df['tags'].apply(stem)



cv = CountVectorizer(max_features=5000, encoding='koi8r', stop_words=stopWords)
vectors = cv.fit_transform(new_df['tags']).toarray()
similarity = cosine_similarity(vectors)

def recommend(anime):
    anime_list = []
    anime_index = new_df[new_df['name'] == anime].index[0]
    distances = similarity[anime_index]
    anime_list_all = sorted(list(enumerate(distances)), reverse=True, key=lambda x:x[1])[1:11]
    for i in anime_list_all:
        if(i[1] > 0.20):
            anime_list.append(i)
    # print(anime_list)
    for i in anime_list:
        print(new_df['name'].loc[i[0]])

# print(new_df.head(10))
# print(new_df[new_df['name'] == 'One Piece'])
recommend('Itou Junji: Collection')