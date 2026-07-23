from datetime import UTC, datetime
from typing import Any

from app.core.firebase import get_firestore_client
from app.schemas.prediction import PredictionInput, PredictionResult

PREDICTIONS_COLLECTION = "predictions"


def build_prediction_record(
    user_id: str,
    prediction_input: PredictionInput,
    prediction_result: PredictionResult,
) -> dict[str, Any]:
    """
    Build a Firestore-ready prediction record.
    """
    input_data = prediction_input.model_dump()
    result_data = prediction_result.model_dump()

    return {
        "userId": user_id,
        "patientName": input_data.pop("patient_name", None),
        **input_data,
        **result_data,
        "createdAt": datetime.now(UTC),
    }


def save_prediction_record(
    user_id: str,
    prediction_input: PredictionInput,
    prediction_result: PredictionResult,
) -> str:
    """
    Save a prediction record to Firestore and return its document ID.
    """
    db = get_firestore_client()
    record = build_prediction_record(user_id, prediction_input, prediction_result)

    document_reference = db.collection(PREDICTIONS_COLLECTION).document()
    document_reference.set(record)

    return document_reference.id


def _created_at_sort_value(record: dict[str, Any]) -> datetime:
    created_at = record.get("createdAt")

    if isinstance(created_at, datetime):
      return created_at

    return datetime.min.replace(tzinfo=UTC)


def get_user_predictions(user_id: str) -> list[dict[str, Any]]:
    """
    Return prediction records owned by the given Firebase user.
    """
    db = get_firestore_client()

    query = db.collection(PREDICTIONS_COLLECTION).where(
        "userId",
        "==",
        user_id,
    )

    records = [
        {"id": document.id, **document.to_dict()}
        for document in query.stream()
    ]

    return sorted(records, key=_created_at_sort_value, reverse=True)