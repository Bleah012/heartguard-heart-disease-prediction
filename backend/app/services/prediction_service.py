from functools import lru_cache
from pathlib import Path

import joblib
import pandas as pd

from app.schemas.prediction import PredictionInput, PredictionResult

FEATURE_COLUMNS = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
]

MODEL_NAME = "Random Forest Classifier"
MODEL_VERSION = "1.0.0"


def get_model_path() -> Path:
    """
    Return the saved ML pipeline path from the project root.
    """
    return (
        Path(__file__).resolve().parents[3]
        / "ml"
        / "models"
        / "heart_disease_pipeline.joblib"
    )


@lru_cache(maxsize=1)
def load_model_pipeline():
    """
    Load and cache the saved HeartGuard ML pipeline.
    """
    model_path = get_model_path()

    if not model_path.exists():
        raise FileNotFoundError(f"Model pipeline not found: {model_path}")

    return joblib.load(model_path)


def build_input_dataframe(prediction_input: PredictionInput) -> pd.DataFrame:
    """
    Convert validated prediction input into the dataframe format expected by the ML model.
    """
    input_data = prediction_input.model_dump(exclude={"patient_name"})

    return pd.DataFrame([input_data], columns=FEATURE_COLUMNS)


def get_risk_label(prediction: int) -> str:
    """
    Convert numeric prediction output into a user-facing risk label.
    """
    if prediction == 1:
        return "Higher heart disease risk"

    return "Lower heart disease risk"


def predict_heart_disease(prediction_input: PredictionInput) -> PredictionResult:
    """
    Run heart disease risk prediction using the saved ML pipeline.
    """
    model = load_model_pipeline()
    input_df = build_input_dataframe(prediction_input)

    prediction = int(model.predict(input_df)[0])
    probabilities = model.predict_proba(input_df)[0]

    return PredictionResult(
        prediction=prediction,
        risk_label=get_risk_label(prediction),
        lower_risk_probability=round(float(probabilities[0]), 4),
        higher_risk_probability=round(float(probabilities[1]), 4),
        model_name=MODEL_NAME,
        model_version=MODEL_VERSION,
    )