from typing import Any

from firebase_admin import auth
from fastapi import HTTPException, status

from app.core.firebase import initialize_firebase_app


def verify_firebase_token(id_token: str) -> dict[str, Any]:
    """
    Verify a Firebase ID token and return the decoded token payload.
    """
    if not id_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token.",
        )

    try:
        initialize_firebase_app()
        return auth.verify_id_token(id_token)
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token.",
        ) from error


def get_user_id_from_token(id_token: str) -> str:
    """
    Extract the Firebase user ID from a verified ID token.
    """
    decoded_token = verify_firebase_token(id_token)
    user_id = decoded_token.get("uid")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user ID was not found.",
        )

    return user_id