from pydantic import BaseModel, Field


class PredictionInput(BaseModel):
    """
    Patient clinical input data required for heart disease risk prediction.
    """

    patient_name: str | None = Field(
        default=None,
        max_length=100,
        description="Optional patient name or label.",
    )
    age: float = Field(..., ge=1, le=120)
    sex: float = Field(..., ge=0, le=1)
    cp: float = Field(..., ge=1, le=4)
    trestbps: float = Field(..., ge=50, le=250)
    chol: float = Field(..., ge=100, le=700)
    fbs: float = Field(..., ge=0, le=1)
    restecg: float = Field(..., ge=0, le=2)
    thalach: float = Field(..., ge=50, le=250)
    exang: float = Field(..., ge=0, le=1)
    oldpeak: float = Field(..., ge=0, le=10)
    slope: float = Field(..., ge=1, le=3)
    ca: float = Field(..., ge=0, le=3)
    thal: float = Field(..., ge=3, le=7)


class PredictionResult(BaseModel):
    """
    Machine-learning prediction result returned by the backend.
    """

    prediction: int
    risk_label: str
    lower_risk_probability: float
    higher_risk_probability: float
    model_name: str
    model_version: str


class PredictionResponse(BaseModel):
    """
    API response returned after a prediction request.
    """

    message: str
    result: PredictionResult