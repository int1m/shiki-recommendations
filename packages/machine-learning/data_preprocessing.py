# name    franchise(!) genres rating status kind studios seyu mangaka
# duration X episodes   score    popularity(?)  releasedOn

import pymongo
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

client = pymongo.MongoClient('mongodb://root:gkkI7ifm3cmOpQerxb@localhost:27017/')
db = client["shiki-recommendations"]
users = db['users']
animes = db['animes']

df_users = pd.DataFrame(list(users.find()))
df_animes = pd.DataFrame(list(animes.find()))

df_animes = df_animes[["externalId", "description", "name", "franchise", "genres", "rating", "status", "kind", "studios", "characters", "persons", "duration", "episodes", "score", "releasedOn"]]
df_users = df_users[["externalId", "rates"]]

# df_animes.dropna(inplace=True)
df_animes = df_animes.drop(df_animes[pd.isnull(df_animes['description'])].index)
df_animes = df_animes.reset_index(drop=True)
print(df_animes.info())

def convert(obj):
    L = []
    for i in obj:
        L.append(i["name"])
    return L

def convSeyu(obj):
    L = []
    for i in obj:
        if (len(i["seyus"]) > 0):
            L.append(i['seyus'][0]['name'])
    return L

df_animes['genres'] = df_animes['genres'].apply(convert)
df_animes['studios'] = df_animes['studios'].apply(convert)
df_animes['characters'] = df_animes['characters'].apply(convSeyu)
df_animes['persons'] = df_animes['persons'].apply(convert)

df_users['countRates'] = df_users.rates.transform(len)

df_animes['genres'] = df_animes['genres'].apply(lambda x:[i.replace(" ", "") for i in x])
df_animes['studios'] = df_animes['studios'].apply(lambda x:[i.replace(" ", "") for i in x])
df_animes['characters'] = df_animes['characters'].apply(lambda x:[i.replace(" ", "") for i in x])
df_animes['persons'] = df_animes['persons'].apply(lambda x:[i.replace(" ", "") for i in x])

df_animes['tags'] = df_animes['genres'] + df_animes['studios'] +\
                    df_animes['characters'] + df_animes['persons']
df_animes['tags'] = df_animes['tags'].apply(lambda x:" ".join(x))
df_animes['tags'] = df_animes['tags'] + " " + df_animes['status'] + " " + df_animes['kind'] + " " + df_animes['rating']

df_animes['tags'] = df_animes['tags'].apply(lambda x:x.lower())
# cv = CountVectorizer(max_features=2500, stop_words='english')
cv = CountVectorizer(stop_words='english')
x_vector = cv.fit_transform(df_animes['tags']).toarray()

df_animes['x_vector'] = [[0 for i in x_vector] for x in df_animes['externalId']]

for iterator in range(len(df_animes['x_vector'])):
    df_animes["x_vector"][iterator] = x_vector[iterator]


def animeVector(user_rates):
    y_vector = np.array([0 for x in range(len(df_animes['externalId']))])
    for rate in user_rates:
        index = df_animes[df_animes['externalId'] == rate['animeExternalId']].index
        if (len(index) > 0):
            y_vector[index[0]] = rate['score']
    return y_vector

df_users['y_vector'] = df_users['rates'].apply(animeVector)


x_vector = np.array([[0 for x in df_animes['x_vector'][0]] for c in df_users['rates']])
y_vector = np.array([[0 for x in df_animes['externalId']] for c in df_users['rates']])
for rates in df_users['rates']:
    rates.sort(key = lambda x: x["score"], reverse=True)

df_users['rates'] = df_users['rates'].apply(lambda x: x[0:5])
i = 0
for user in df_users['rates']:
    for rate in user:
        index = df_animes[df_animes['externalId'] == rate['animeExternalId']].index
        if (len(index) > 0):
          x_vector[i] += df_animes.loc[index[0]]['x_vector']
    i += 1
i = 0
for vector in df_users['y_vector']:
    y_vector[i] = vector
    i += 1

from sklearn.decomposition import PCA
print(x_vector.shape)
pca = PCA(n_components = 500)

x_vector = pca.fit_transform(x_vector)

print(x_vector.shape)
print(x_vector[0:2])

df_animes.to_json('./data/animes.json', index=True, orient='records', default_handler=str)
df_users.to_json('./data/users.json', index=True, orient='records', default_handler=str)
pd.DataFrame(x_vector).to_csv("./data/x_vector.csv", header=None, index=None)
pd.DataFrame(y_vector).to_csv("./data/y_vector.csv", header=None, index=None)

# print(x_vector.shape, df_animes['x_vector'].shape)
# print(df_users[['y_vector', 'externalId']].head())