from fastapi import APIRouter, HTTPException, status

from app.schemas.prediction import PredictionInput, PredictionResponse
from app.services.prediction_service import predict_heart_disease

router = APIRouter(prefix="/predictions", tags=["Predictions"])


@router.post("", response_model=PredictionResponse, status_code=status.HTTP_200_OK)
def create_prediction(prediction_input: PredictionInput):
    """
    Run a heart disease risk prediction using validated patient data.
    """
    try:
        result = predict_heart_disease(prediction_input)

        return PredictionResponse(
            message="Prediction completed successfully.",
            result=result,
        )
    except FileNotFoundError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        ) from error
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction failed. Please try again later.",
        ) from error