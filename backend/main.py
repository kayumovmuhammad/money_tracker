from contextlib import asynccontextmanager

import firebase_admin
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials
import uvicorn

import db.models
from api.config import Settings
from api.routers import auth_router, calclulate_router, transaction_router
from api.utils.security import get_current_user
from db.db import Base, engine
from db.models.user import User


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    if not firebase_admin._apps:
        settings = Settings()
        if settings.FIREBASE_CRED_PATH:
            cred = credentials.Certificate(settings.FIREBASE_CRED_PATH)
            firebase_admin.initialize_app(cred)
            print("[LOG] => Firebase Admin Initialized")
        else:
            print("[WARN] => FIREBASE_CRED_PATH not found in env")

    print("[LOG] => INIT")
    yield
    print("[LOG] => END")


app = FastAPI(title="Money Tracker", lifespan=lifespan)
app.include_router(transaction_router)
app.include_router(auth_router)
app.include_router(calclulate_router)


origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root(user: User = Depends(get_current_user)):
    return {"message": f"Welcome {user.name} to Money Tracker, created by Q.Muhammad"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)