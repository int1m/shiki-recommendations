import uvicorn as uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from starlette.requests import Request
from starlette.responses import PlainTextResponse, JSONResponse

from RecommenderSystem.neuronet import Neuronet

app = FastAPI(title="shikireki-machine-learning")

origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


neuronet = Neuronet()


@app.on_event("startup")
async def startupEvent():
    if not neuronet.isLearned:
        neuronet.trainModel()
    neuronet.uploadWeights()


@app.post("/personal-recommendations", response_class=JSONResponse)
async def onPersonalRecommendationsHandler(request: Request):
    data = await request.json()
    if (neuronet.isReady):
        predictionVector = neuronet.predict(data[0:round(len(data) * 0.3)])
        animes = list()
        for score in predictionVector:
            animeDf = neuronet.df_animes.loc[score['index']][['externalId']]
            animes.append(animeDf.externalId.item())
        for rate in data:
            try:
                animes.remove(rate['animeExternalId'])
            except ValueError:
                pass

        return animes[0:100]

    return {
        'errors': ['Neuronet is not ready'],
    }


@app.get("/similar-animes", response_class=PlainTextResponse)
async def onSimilarAnimes(request: Request) -> str:
    data = await request.json()
    print(data)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
