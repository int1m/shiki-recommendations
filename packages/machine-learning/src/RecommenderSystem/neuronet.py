from keras import Sequential
from keras.layers import Dense
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA
from sklearn.feature_extraction.text import CountVectorizer
from pymongo import MongoClient

import pandas as pd
import numpy as np
import os


class Neuronet:
    isReady: bool = False
    isLearned: bool = False

    def __init__(self):
        self.df_users = None
        self.df_animes = None
        self.isLearned = os.path.exists('../weights/weights.h5')
        self.x_data_raw, self.y_data = self.loadData()
        self.pca = PCA(n_components=500)
        self.x_data = self.pca.fit_transform(self.x_data_raw)
        self.x_train, self.x_test, self.y_train, self.y_test = train_test_split(self.x_data, self.y_data,
                                                                                test_size=0.33)
        scaler = StandardScaler()
        self.x_train = scaler.fit_transform(self.x_train)
        self.x_test = scaler.fit_transform(self.x_test)
        self.model = Sequential([
            Dense(2000, input_dim=self.x_data.shape[1], kernel_initializer='normal', activation='relu'),
            Dense(5000, kernel_initializer='normal', activation='relu'),
            Dense(self.y_data.shape[1], activation='sigmoid')
        ])
        self.model.compile(optimizer='adam', loss='huber_loss', metrics=['Accuracy'])

        self.loadDatasets()

    def trainModel(self):
        history = self.model.fit(self.x_train, self.y_train, batch_size=20, epochs=5, validation_split=0.2)
        self.model.save_weights('../weights/weights.h5')
        self.isLearned = True

    def predict(self, rates):
        x_vector = np.reshape(self.preprocessUser(rates), 500)
        x_vector = np.expand_dims(x_vector, axis=0)
        pred = self.model.predict(x_vector)[0]
        result = list()
        for index, item in enumerate(pred):
            result.append({'score': item, 'index': index})
        result.sort(key=lambda x: x["score"], reverse=True)

        return result

    def uploadWeights(self):
        self.model.load_weights('../weights/weights.h5')
        self.isReady = True
        print('Neuronet is ready')

    def loadData(self):
        if os.path.exists("../data/x_vector.csv") and os.path.exists("../data/y_vector.csv"):
            x_vector = np.array(pd.read_csv("../data/x_vector.csv"))
            y_vector = np.array(pd.read_csv("../data/y_vector.csv"))
            y_vector = y_vector / 10
            return x_vector, y_vector
        else:
            self.preprocessTrainingData()
            return self.loadData()

    def loadDatasets(self):
        if os.path.exists('../data/animes.json') and os.path.exists('../data/users.json'):
            self.df_animes = pd.read_json('../data/animes.json', orient='records')
            self.df_users = pd.read_json('../data/users.json', orient='records')
        else:
            self.preprocessTrainingData()
            self.loadDatasets()

    def preprocessUser(self, rates):
        ratesVector = np.array([0 for x in self.df_animes['x_vector'][0]])

        rates.sort(key=lambda x: x["score"], reverse=True)

        for rate in rates:
            index = self.df_animes[self.df_animes['externalId'] == rate['animeExternalId']].index
            if len(index) > 0:
                ratesVector += self.df_animes.loc[index[0]]['x_vector']

        x_data = np.insert(self.x_data_raw, 0, ratesVector, axis=0)

        ratesVector = self.pca.transform(x_data)[0]
        return ratesVector

    @staticmethod
    def preprocessTrainingData():
        if not os.path.exists("../data"):
            os.makedirs("../data")
        if not os.path.exists("../weights"):
            os.makedirs("../weights")
        client = MongoClient('mongodb://root:gkkI7ifm3cmOpQerxb@localhost:27017')
        db = client["shikireki"]
        users = db['users']
        animes = db['animes']

        df_users = pd.DataFrame(list(users.find()))
        df_animes = pd.DataFrame(list(animes.find()))

        df_animes = df_animes[
            ["externalId", "description", "name", "franchise", "genres", "rating", "status", "kind", "studios",
             "characters", "persons", "duration", "episodes", "score", "releasedOn"]]
        df_users = df_users[["externalId", "rates"]]

        df_animes = df_animes.drop(df_animes[pd.isnull(df_animes['description'])].index)
        df_animes = df_animes.reset_index(drop=True)

        def convert(obj):
            L = []
            for i in obj:
                L.append(i["name"])
            return L

        def convSeyu(obj):
            L = []
            for i in obj:
                if len(i["seyus"]) > 0:
                    L.append(i['seyus'][0]['name'])
            return L

        df_animes['genres'] = df_animes['genres'].apply(convert)
        df_animes['studios'] = df_animes['studios'].apply(convert)
        df_animes['characters'] = df_animes['characters'].apply(convSeyu)
        df_animes['persons'] = df_animes['persons'].apply(convert)

        df_users['countRates'] = df_users.rates.transform(len)

        df_animes['genres'] = df_animes['genres'].apply(lambda x: [i.replace(" ", "") for i in x])
        df_animes['studios'] = df_animes['studios'].apply(lambda x: [i.replace(" ", "") for i in x])
        df_animes['characters'] = df_animes['characters'].apply(lambda x: [i.replace(" ", "") for i in x])
        df_animes['persons'] = df_animes['persons'].apply(lambda x: [i.replace(" ", "") for i in x])

        df_animes['tags'] = df_animes['genres'] + df_animes['studios'] + \
                            df_animes['characters'] + df_animes['persons']
        df_animes['tags'] = df_animes['tags'].apply(lambda x: " ".join(x))
        df_animes['tags'] = df_animes['tags'] + " " + df_animes['status'] + " " + df_animes['kind'] + " " + df_animes[
            'rating']

        df_animes['tags'] = df_animes['tags'].apply(lambda x: x.lower())
        cv = CountVectorizer(stop_words='english')
        x_vector = cv.fit_transform(df_animes['tags']).toarray()

        df_animes['x_vector'] = [[0 for i in x_vector] for x in df_animes['externalId']]

        for iterator in range(len(df_animes['x_vector'])):
            df_animes["x_vector"][iterator] = x_vector[iterator]

        def animeVector(user_rates):
            y_vector = np.array([0 for x in range(len(df_animes['externalId']))])
            for rate in user_rates:
                index = df_animes[df_animes['externalId'] == rate['animeExternalId']].index
                if len(index) > 0:
                    y_vector[index[0]] = rate['score']
            return y_vector

        df_users['y_vector'] = df_users['rates'].apply(animeVector)

        x_vector = np.array([[0 for x in df_animes['x_vector'][0]] for c in df_users['rates']])
        y_vector = np.array([[0 for x in df_animes['externalId']] for c in df_users['rates']])
        for rates in df_users['rates']:
            rates.sort(key=lambda x: x["score"], reverse=True)

        df_users['rates'] = df_users['rates'].apply(lambda x: x[0:5])
        i = 0
        for user in df_users['rates']:
            for rate in user:
                index = df_animes[df_animes['externalId'] == rate['animeExternalId']].index
                if len(index) > 0:
                    x_vector[i] += df_animes.loc[index[0]]['x_vector']
            i += 1
        i = 0
        for vector in df_users['y_vector']:
            y_vector[i] = vector
            i += 1

        df_animes.to_json('../data/animes.json', index=True, orient='records', default_handler=str)
        df_users.to_json('../data/users.json', index=True, orient='records', default_handler=str)
        pd.DataFrame(x_vector).to_csv("../data/x_vector.csv", header=None, index=None)
        pd.DataFrame(y_vector).to_csv("../data/y_vector.csv", header=None, index=None)


# if __name__ == '__main__':
#     neuronet = Neuronet()
#
#     if not neuronet.isLearned:
#         neuronet.trainModel()
#     neuronet.uploadWeights()
#
#     one_user = neuronet.df_users.loc[150]
#     print(type(one_user), one_user)
#     predictionVector = neuronet.predict(one_user)
#     animes = list()
#     for score in predictionVector[0:5]:
#         animes.append(neuronet.df_animes.loc[score['index']][['name', 'externalId']])
#     print(animes)
