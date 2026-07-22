# HeartGuard User Stories

User stories describe HeartGuard features from the user's point of view.

## Authentication And Access

- US-01: As a healthcare worker, I want to log in securely, so that only authorised users can access patient prediction features.
- US-02: As a user, I want to log out, so that my session is closed when I finish using the system.
- US-03: As an administrator, I want to assign user roles, so that each user only accesses the functions they are permitted to use.
- US-04: As an administrator, I want to manage user accounts, so that I can control who can use HeartGuard.
- US-05: As a researcher or viewer, I want read-only access, so that I can review prediction information without accidentally changing records.

## Patient Data Entry

- US-06: As a healthcare worker, I want to enter anonymised patient health indicators, so that I can generate a heart disease risk estimate.
- US-07: As a healthcare worker, I want the system to validate patient data, so that incorrect or incomplete values are caught before prediction.
- US-08: As a healthcare worker, I want clinical fields grouped into clear sections, so that I can enter data quickly and accurately.
- US-09: As a healthcare worker, I want helper text or tooltips for medical fields, so that I understand what each field means.
- US-10: As a healthcare worker, I want to review entered patient data before submitting, so that I can correct mistakes before generating a prediction.

## Prediction

- US-11: As a healthcare worker, I want to generate a prediction from patient indicators, so that I can estimate whether the patient has lower or higher likelihood of heart disease.
- US-12: As a healthcare worker, I want to see the prediction probability, so that I understand the model's confidence level.
- US-13: As a healthcare worker, I want to see the model version used, so that the prediction result is traceable.
- US-14: As a healthcare worker, I want to see a medical disclaimer, so that I remember the result is not a confirmed diagnosis.
- US-15: As a healthcare worker, I want safer wording for high-risk results, so that the system does not make alarming or medically definitive claims.

## Prediction Records And History

- US-16: As a healthcare worker, I want prediction results to be saved, so that previous assessments can be reviewed later.
- US-17: As a healthcare worker, I want to search prediction records by patient code, so that I can quickly find a previous assessment.
- US-18: As a healthcare worker, I want to filter records by date or risk category, so that I can narrow down prediction history.
- US-19: As an authorised user, I want to view prediction details, so that I can review the entered values and prediction result.
- US-20: As an administrator, I want to delete incorrect prediction records, so that the database remains accurate.

## Dashboard And Analytics

- US-21: As a healthcare worker, I want to see dashboard summary cards, so that I can quickly understand system activity.
- US-22: As an administrator, I want to see total predictions, high-risk predictions, low-risk predictions, and monthly predictions, so that I can monitor system usage.
- US-23: As a user, I want to see charts for prediction trends and risk distribution, so that I can understand patterns visually.
- US-24: As a user, I want to see recent predictions on the dashboard, so that I can access the latest records quickly.
- US-25: As an administrator or researcher, I want to see model performance metrics, so that I can judge how reliable the active model is.

## Reports And Exporting

- US-26: As a healthcare worker, I want to print or export a prediction result, so that it can be included in academic or screening documentation.
- US-27: As an administrator, I want to generate prediction summary reports, so that I can review system activity over a selected period.
- US-28: As a researcher or viewer, I want to export anonymised prediction summaries, so that I can analyse results without exposing patient identity.
- US-29: As an administrator, I want reports to include model version and generation date, so that exported information is traceable.

## Patient Records

- US-30: As a healthcare worker, I want to view anonymised patient records, so that I can review previous predictions for the same patient code.
- US-31: As a healthcare worker, I want patient records to avoid real identifying information, so that patient privacy is protected.
- US-32: As an administrator, I want to search patient records by anonymised code, so that I can locate records efficiently.

## Model Information

- US-33: As a researcher or viewer, I want to view the active model algorithm, so that I understand what type of model is being used.
- US-34: As a researcher or viewer, I want to view accuracy, precision, recall, F1-score, ROC-AUC, and confusion matrix information, so that I can evaluate model performance.
- US-35: As a user, I want to see model limitations, so that I do not over-trust the system output.

## Error Handling And Feedback

- US-36: As a user, I want loading indicators, so that I know the system is processing my request.
- US-37: As a user, I want clear error messages, so that I understand what went wrong and how to correct it.
- US-38: As a healthcare worker, I want invalid form values to be highlighted, so that I can quickly fix input mistakes.
- US-39: As a user, I want success messages after important actions, so that I know the action was completed.

## Settings And Help

- US-40: As a user, I want to view my profile information, so that I can confirm my account details.
- US-41: As a user, I want a help page, so that I can understand how to use HeartGuard.
- US-42: As a user, I want guidance for prediction inputs, so that I can enter clinical values correctly.
- US-43: As an administrator, I want to view system and model version information, so that I can monitor the deployed system.

## Priority User Stories For First Implementation

- US-01: Login securely.
- US-06: Enter patient indicators.
- US-07: Validate patient data.
- US-10: Review entered data.
- US-11: Generate prediction.
- US-12: Display prediction probability.
- US-14: Display medical disclaimer.
- US-16: Save prediction records.
- US-17: Search prediction history.
- US-21: View dashboard summary.
- US-25: View model performance.
