from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore

from app.core.config import get_settings


def initialize_firebase_app():
    """
    Initialize Firebase Admin SDK once for backend services.
    """
    if firebase_admin._apps:
        return firebase_admin.get_app()

    settings = get_settings()

    if settings.firebase_credentials_path:
        credentials_path = Path(settings.firebase_credentials_path)

        if not credentials_path.exists():
            raise FileNotFoundError(
                f"Firebase credentials file not found: {credentials_path}"
            )

        credential = credentials.Certificate(credentials_path)
        return firebase_admin.initialize_app(
            credential,
            {"projectId": settings.firebase_project_id},
        )

    return firebase_admin.initialize_app()


def get_firestore_client():
    """
    Return a Firestore client using the initialized Firebase app.
    """
    initialize_firebase_app()
    return firestore.client()