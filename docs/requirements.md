# HeartGuard Requirements Documentation

## Functional Requirements

Functional requirements describe what the HeartGuard system must do.

### Authentication And User Access

- FR-01: The system shall allow authorised users to log in using email and password.
- FR-02: The system shall allow authenticated users to log out securely.
- FR-03: The system shall restrict access to protected pages unless the user is logged in.
- FR-04: The system shall support role-based access control for admin, healthcare worker, researcher, and viewer.
- FR-05: The system shall allow administrators to manage user accounts.
- FR-06: The system shall allow administrators to assign roles to users.
- FR-07: The system shall prevent non-admin users from accessing user-management functions.

### Patient Data Entry

- FR-08: The system shall provide a patient health-data form for heart disease risk prediction.
- FR-09: The system shall allow users to enter anonymised patient codes instead of real patient-identifying information.
- FR-10: The system shall collect required clinical indicators needed by the machine-learning model.
- FR-11: The system shall validate required fields before submission.
- FR-12: The system shall reject missing, invalid, or out-of-range values.
- FR-13: The system shall display clear validation messages when input data is invalid.
- FR-14: The system shall use appropriate input controls such as dropdowns, numeric inputs, dates, checkboxes, and tooltips.
- FR-15: The system shall allow users to review entered patient data before generating a prediction.

### Prediction

- FR-16: The system shall send validated patient data from the frontend to the Python FastAPI backend.
- FR-17: The backend shall preprocess patient data using the same preprocessing pipeline used during model training.
- FR-18: The backend shall load the saved Scikit-learn model pipeline from a Joblib file.
- FR-19: The backend shall predict whether the entered patient data indicates low or high likelihood of heart disease.
- FR-20: The backend shall calculate and return the prediction probability or confidence score.
- FR-21: The system shall display the prediction result clearly as Lower Risk or Higher Risk.
- FR-22: The system shall display the prediction probability.
- FR-23: The system shall display the active model version used for the prediction.
- FR-24: The system shall display a clear medical disclaimer stating that the result is not a diagnosis.
- FR-25: The system shall avoid wording that directly tells a patient they have heart disease.

### Prediction Records

- FR-26: The system shall save each completed prediction record in Firebase Firestore.
- FR-27: Each prediction record shall include anonymised patient code, entered indicators, prediction result, probability, model version, user ID, and timestamp.
- FR-28: The system shall allow authorised users to view previous prediction records.
- FR-29: The system shall allow users to search prediction history by patient code.
- FR-30: The system shall allow users to filter prediction records by date and risk category.
- FR-31: The system shall allow users to view details of a selected prediction.
- FR-32: The system shall allow authorised users to delete incorrect prediction records.

### Dashboard, Reports, And Model Performance

- FR-33: The system shall display a dashboard after login.
- FR-34: The dashboard shall show total predictions, higher-risk predictions, lower-risk predictions, and predictions this month.
- FR-35: The dashboard shall display charts for prediction trends and risk distribution.
- FR-36: The dashboard shall display recent prediction records.
- FR-37: The system shall display model accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrix information where available.
- FR-38: The system shall generate prediction summary reports.
- FR-39: The system shall allow authorised users to export prediction records.
- FR-40: The system shall provide help, settings, and system information pages.

## Non-Functional Requirements

Non-functional requirements describe how well the system must work.

### Performance

- NFR-01: The system should return a heart disease risk prediction within 2 seconds under normal conditions.
- NFR-02: The dashboard should load summary statistics within 3 seconds under normal network conditions.
- NFR-03: The system should support multiple authorised users without major performance degradation.

### Security

- NFR-04: The system shall use Firebase Authentication to manage secure user login.
- NFR-05: The backend shall verify Firebase ID tokens before processing protected API requests.
- NFR-06: The system shall enforce role-based access control for admin-only features.
- NFR-07: Sensitive configuration values shall be stored in environment variables.
- NFR-08: The system shall validate user input on both the frontend and backend.

### Privacy

- NFR-09: The system shall avoid storing real patient-identifying information.
- NFR-10: The system shall use fictional or anonymised patient data for academic demonstration.
- NFR-11: Exported reports shall not include real patient-identifying information.

### Usability And Accessibility

- NFR-12: The interface shall use clear labels for all clinical input fields.
- NFR-13: The system shall display understandable validation messages.
- NFR-14: The interface shall be responsive on desktop, tablet, and mobile devices.
- NFR-15: Interactive controls shall have visible focus states.
- NFR-16: Charts shall include labels or legends.

### Reliability And Maintainability

- NFR-17: The same input data shall produce the same prediction when the same model version is used.
- NFR-18: Prediction records shall include timestamps and model version information.
- NFR-19: The project shall use a modular monorepo structure.
- NFR-20: The backend shall separate API routes, services, schemas, repositories, and configuration.
- NFR-21: Machine-learning training code shall be separated from backend inference code.

### Testing And DevOps

- NFR-22: The backend shall be testable using pytest.
- NFR-23: The frontend shall be testable using React testing tools.
- NFR-24: The project shall use Git and GitHub for version control.
- NFR-25: GitHub Actions shall run automated tests on push and pull request.
- NFR-26: The frontend shall be deployable to Firebase Hosting.
- NFR-27: The FastAPI backend shall be deployable separately.
