import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import PlainTextResponse

app = FastAPI(title="volsu-rating-bot")

@app.post("/personal-recommendations", response_class=PlainTextResponse)
async def boot(request: Request) -> str:
    data = await request.json()
    print(data)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)