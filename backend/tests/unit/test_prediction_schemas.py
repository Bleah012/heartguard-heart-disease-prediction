import pytest
from pydantic import ValidationError

from app.schemas.prediction import PredictionInput


def test_prediction_input_accepts_valid_data():
    prediction_input = PredictionInput(
        patient_name="Test Patient",
        age=58,
        sex=1,
        cp=4,
        trestbps=140,
        chol=250,
        fbs=0,
        restecg=2,
        thalach=120,
        exang=1,
        oldpeak=2.0,
        slope=2,
        ca=1,
        thal=7,
    )

    assert prediction_input.age == 58
    assert prediction_input.patient_name == "Test Patient"
    assert prediction_input.thal == 7


def test_prediction_input_requires_age():
    with pytest.raises(ValidationError):
        PredictionInput(
            sex=1,
            cp=4,
            trestbps=140,
            chol=250,
            fbs=0,
            restecg=2,
            thalach=120,
            exang=1,
            oldpeak=2.0,
            slope=2,
            ca=1,
            thal=7,
        )


def test_prediction_input_rejects_invalid_age():
    with pytest.raises(ValidationError):
        PredictionInput(
            age=-1,
            sex=1,
            cp=4,
            trestbps=140,
            chol=250,
            fbs=0,
            restecg=2,
            thalach=120,
            exang=1,
            oldpeak=2.0,
            slope=2,
            ca=1,
            thal=7,
        )