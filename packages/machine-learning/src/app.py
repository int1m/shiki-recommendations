import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import PlainTextResponse

app = FastAPI(title="volsu-rating-bot")