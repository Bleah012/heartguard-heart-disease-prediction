from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_current_user
from app.repositories.prediction_repository import (
    get_user_predictions,
    save_prediction_record,
)
from app.schemas.prediction import PredictionInput, PredictionResponse
from app.services.prediction_service import predict_heart_disease

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
def create_prediction(
    prediction_input: PredictionInput,
    current_user: dict[str, Any] = Depends(get_current_user),
):
    """
    Run and save a heart disease risk prediction for an authenticated Firebase user.
    """
    try:
        user_id = current_user["uid"]
        result = predict_heart_disease(prediction_input)
        save_prediction_record(user_id, prediction_input, result)

        return PredictionResponse(
            message="Prediction completed and saved successfully.",
            result=result,
        )
    except FileNotFoundError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        ) from error
    except KeyError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user ID was not found.",
        ) from error
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction failed. Please try again later.",
        ) from error


@router.get("", status_code=status.HTTP_200_OK)
def list_predictions(
    current_user: dict[str, Any] = Depends(get_current_user),
):
    """
    Return prediction history for the authenticated Firebase user.
    """
    try:
        user_id = current_user["uid"]
        predictions = get_user_predictions(user_id)

        return {
            "message": "Prediction history retrieved successfully.",
            "count": len(predictions),
            "predictions": predictions,
        }
    except KeyError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user ID was not found.",
        ) from error
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction history could not be retrieved.",
        ) from error