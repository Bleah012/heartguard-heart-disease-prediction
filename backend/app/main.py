from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.predictions import router as predictions_router

app = FastAPI(
    title="HeartGuard Backend API",
    description="FastAPI backend for HeartGuard heart disease prediction system.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(predictions_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to the HeartGuard Backend API",
        "docs": "/docs",
        "health": "/health",
        "predictions": "/predictions",
    }