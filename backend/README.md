# HeartGuard Backend API

This folder contains the Python FastAPI backend for the HeartGuard heart disease prediction system.

## Responsibilities

The backend API is responsible for:

- Providing API endpoints for the frontend
- Validating request data
- Verifying Firebase Authentication tokens
- Loading and running the saved machine-learning pipeline
- Returning prediction results
- Saving prediction records to Firebase Firestore

## Technology Stack

| Tool               | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| FastAPI            | Backend API framework                            |
| Uvicorn            | ASGI development server                          |
| Pydantic           | Request and response validation                  |
| Firebase Admin SDK | Firebase token verification and Firestore access |
| Scikit-learn       | Machine-learning pipeline support                |
| joblib             | Loading the saved ML model                       |

## Run Locally

From the project root:

```powershell
uvicorn app.main:app --reload --app-dir backend
```
