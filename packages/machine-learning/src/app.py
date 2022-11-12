import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import PlainTextResponse
from RecommenderSystem.neuronet import Neuronet

app = FastAPI(title="shikireki-machine-learning")

neuronet = Neuronet()

@app.on_event("startup")
async def startupEvent():
    # neuronet.trainModel()
    neuronet.uploadWeights()

@app.post("/personal-recommendations", response_class=PlainTextResponse)
async def onPersonalRecommendationsHandler(request: Request) -> str:
    #data = await request.json()
    # print(data)
    if (neuronet.isReady):
        oneUser = neuronet.df_users.loc[150]
        print(type(oneUser), oneUser)
        predictionVector = neuronet.predict(oneUser)
        animes = list()
        for score in predictionVector[0:5]:
            animes.append(neuronet.df_animes.loc[score['index']][['name', 'externalId']])
            print(animes)
@app.post("/similar-animes", response_class=PlainTextResponse)
async def onSimilarAnimes(request: Request) -> str:
    data = await request.json()
    print(data)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)