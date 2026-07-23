from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_endpoint_returns_api_metadata():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()
    assert data["message"] == "Welcome to the HeartGuard Backend API"
    assert data["docs"] == "/docs"
    assert data["health"] == "/health"


def test_health_endpoint_returns_ok_status():
    response = client.get("/health")

    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "HeartGuard Backend API"


def test_create_prediction_requires_authorization_header():
    payload = {
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

    response = client.post("/predictions", json=payload)

    assert response.status_code in [401, 403]
    assert response.json()["detail"] == "Authorization header is required."


def test_prediction_history_requires_authorization_header():
    response = client.get("/predictions")

    assert response.status_code in [401, 403]
    assert response.json()["detail"] == "Authorization header is required."