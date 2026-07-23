from app.schemas.prediction import PredictionInput
from app.services.prediction_service import predict_heart_disease


def test_predict_heart_disease_returns_expected_response_shape():
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

    result = predict_heart_disease(prediction_input)

    assert result.prediction in [0, 1]
    assert result.risk_label in [
        "Lower heart disease risk",
        "Higher heart disease risk",
    ]
    assert 0.0 <= result.lower_risk_probability <= 1.0
    assert 0.0 <= result.higher_risk_probability <= 1.0
    assert result.model_name == "Random Forest Classifier"
    assert result.model_version == "1.0.0"


def test_predict_heart_disease_probabilities_sum_to_one():
    prediction_input = PredictionInput(
        age=45,
        sex=0,
        cp=2,
        trestbps=120,
        chol=210,
        fbs=0,
        restecg=0,
        thalach=170,
        exang=0,
        oldpeak=0.5,
        slope=1,
        ca=0,
        thal=3,
    )

    result = predict_heart_disease(prediction_input)

    total_probability = (
        result.lower_risk_probability + result.higher_risk_probability
    )

    assert round(total_probability, 4) == 1.0