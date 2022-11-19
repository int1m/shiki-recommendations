import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import PlainTextResponse
from RecommenderSystem.neuronet import Neuronet

app = FastAPI(title="shikireki-machine-learning")

neuronet = Neuronet()

@app.on_event("startup")
async def startupEvent():
    if not neuronet.isLearned:
        neuronet.trainModel()
    neuronet.uploadWeights()

@app.post("/personal-recommendations", response_class=PlainTextResponse)
async def onPersonalRecommendationsHandler(request: Request) -> str:
    print('ok')
    # data = await request.json()
    # print(data)
    # if (neuronet.isReady):

@app.post("/similar-animes", response_class=PlainTextResponse)
async def onSimilarAnimes(request: Request) -> str:
    data = await request.json()
    print(data)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)