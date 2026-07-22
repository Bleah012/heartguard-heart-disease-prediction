from pathlib import Path

import joblib
import pandas as pd

from preprocessing import FEATURE_COLUMNS


def load_model():
    """
    Load the saved HeartGuard machine-learning pipeline.
    """
    model_path = (
        Path(__file__).resolve().parents[1]
        / "models"
        / "heart_disease_pipeline.joblib"
    )

    if not model_path.exists():
        raise FileNotFoundError(f"Model pipeline not found: {model_path}")

    return joblib.load(model_path)


def predict_sample_patient() -> None:
    """
    Run a sample prediction using the saved pipeline.
    """
    sample_patient = pd.DataFrame(
        [
            {
                "age": 58,
                "sex": 1,
                "cp": 4,
                "trestbps": 140,
                "chol": 250,
                "fbs": 0,
                "restecg": 2,
                "thalach": 120,
                "exang": 1,
                "oldpeak": 2.0,
                "slope": 2,
                "ca": 1,
                "thal": 7,
            }
        ],
        columns=FEATURE_COLUMNS,
    )

    model = load_model()
    prediction = model.predict(sample_patient)[0]
    probabilities = model.predict_proba(sample_patient)[0]

    risk_label = "Higher heart disease risk" if prediction == 1 else "Lower heart disease risk"

    print("HeartGuard Sample Prediction")
    print("=" * 35)
    print(f"Prediction: {prediction}")
    print(f"Risk label: {risk_label}")
    print(f"Lower-risk probability: {probabilities[0]:.4f}")
    print(f"Higher-risk probability: {probabilities[1]:.4f}")


if __name__ == "__main__":
    predict_sample_patient()