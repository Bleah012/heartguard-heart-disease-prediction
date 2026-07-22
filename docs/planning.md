# HeartGuard Planning Documentation

## Project Title

HeartGuard: Heart Disease Prediction Using Machine Learning

## Problem Statement

Heart disease is a major health concern, and early identification of people who may be at risk can support timely medical screening and clinical decision-making. However, manually interpreting several health indicators such as age, cholesterol, resting blood pressure, chest pain type, maximum heart rate, and exercise-related symptoms can be time-consuming and prone to inconsistency.

Many healthcare screening environments also need a simple system that can store prediction records, display model performance, and provide a clear history of previous assessments. A Jupyter Notebook alone is not enough for this purpose because it does not provide authentication, patient-data entry, prediction history, reporting, or a usable interface for healthcare workers.

## Proposed Solution

HeartGuard will be developed as a complete software engineering system that uses a trained machine-learning model to estimate whether a patient has a low or high likelihood of heart disease based on selected clinical indicators.

The system will allow authorised users to:

- Log in securely.
- Enter anonymised patient health indicators.
- Validate patient data before prediction.
- Send the data to a Python FastAPI prediction service.
- Use a trained Scikit-learn model to generate a risk prediction.
- Display the prediction result, probability, and model version.
- Save prediction records in Firebase Firestore.
- View dashboard statistics and prediction history.
- Generate reports and view model performance.

## Medical Disclaimer

HeartGuard is an educational clinical decision-support prototype. It does not provide a medical diagnosis. All predictions must be interpreted by qualified healthcare professionals.
