# HeartGuard Model Evaluation

## Purpose

This document records the machine-learning model training and evaluation evidence for Phase 2 of the HeartGuard project.

The goal of the model is to predict whether a patient is likely to have heart disease using clinical attributes from the Cleveland Heart Disease dataset.

## Dataset

Dataset used: Cleveland Heart Disease dataset  
Raw file: `ml/data/raw/processed.cleveland.data`  
Total records: 303  
Total columns after loading: 15

The original target column contains values from 0 to 4.

For this project, the target was converted into a binary classification problem:

| Original Target Value | Meaning               |
| --------------------- | --------------------- |
| 0                     | No heart disease      |
| 1, 2, 3, 4            | Heart disease present |

The binary target column is named `target_binary`.

## Preprocessing Pipeline

The preprocessing pipeline handles numerical and categorical features separately.

### Numerical Features

| Feature  |
| -------- |
| age      |
| trestbps |
| chol     |
| thalach  |
| oldpeak  |
| ca       |

Processing applied:

- Missing values handled using median imputation.
- Numerical values scaled using `StandardScaler`.

### Categorical Features

| Feature |
| ------- |
| sex     |
| cp      |
| fbs     |
| restecg |
| exang   |
| slope   |
| thal    |

Processing applied:

- Missing values handled using most-frequent imputation.
- Categories encoded using `OneHotEncoder`.
- Unknown categories ignored during prediction.

## Train-Test Split

The dataset was split into training and testing sets.

| Setting          | Value           |
| ---------------- | --------------- |
| Test size        | 20%             |
| Random state     | 42              |
| Stratified split | Yes             |
| Target           | `target_binary` |

Stratification was used to preserve the class balance between the training and testing sets.

## Candidate Models

Three classification algorithms were trained and compared:

| Model               | Accuracy |
| ------------------- | -------: |
| Logistic Regression |   0.8689 |
| Decision Tree       |   0.7541 |
| Random Forest       |   0.8852 |

## Logistic Regression Results

Accuracy: `0.8689`

Confusion matrix:

```text
[[27  6]
 [ 2 26]]
```
