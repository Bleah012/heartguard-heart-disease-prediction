from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Backend application settings loaded from environment variables.
    """

    app_name: str = "HeartGuard Backend API"
    firebase_project_id: str | None = None
    firebase_credentials_path: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()