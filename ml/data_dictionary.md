# HeartGuard Data Dictionary

Dataset: Cleveland Heart Disease Dataset

## Column Names

The raw `processed.cleveland.data` file does not contain column headers. The following column names will be assigned during data loading.

| Column   | Description                                        | Type                | Example Values                                                                  |
| -------- | -------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| age      | Patient age in years                               | Numeric             | 29, 45, 63                                                                      |
| sex      | Biological sex                                     | Categorical         | 0 = female, 1 = male                                                            |
| cp       | Chest pain type                                    | Categorical         | 1 = typical angina, 2 = atypical angina, 3 = non-anginal pain, 4 = asymptomatic |
| trestbps | Resting blood pressure in mm Hg                    | Numeric             | 120, 140, 160                                                                   |
| chol     | Serum cholesterol in mg/dl                         | Numeric             | 180, 240, 300                                                                   |
| fbs      | Fasting blood sugar greater than 120 mg/dl         | Categorical         | 0 = false, 1 = true                                                             |
| restecg  | Resting electrocardiographic results               | Categorical         | 0 = normal, 1 = ST-T abnormality, 2 = left ventricular hypertrophy              |
| thalach  | Maximum heart rate achieved                        | Numeric             | 120, 150, 180                                                                   |
| exang    | Exercise-induced angina                            | Categorical         | 0 = no, 1 = yes                                                                 |
| oldpeak  | ST depression induced by exercise relative to rest | Numeric             | 0.0, 1.5, 3.0                                                                   |
| slope    | Slope of the peak exercise ST segment              | Categorical         | 1 = upsloping, 2 = flat, 3 = downsloping                                        |
| ca       | Number of major vessels coloured by fluoroscopy    | Numeric/Categorical | 0, 1, 2, 3                                                                      |
| thal     | Thalassemia result                                 | Categorical         | 3 = normal, 6 = fixed defect, 7 = reversible defect                             |
| target   | Heart disease diagnosis                            | Target              | 0 = no disease, 1-4 = disease presence                                          |

## Target Transformation

The original target values are:

| Original Value | Meaning               |
| -------------- | --------------------- |
| 0              | No heart disease      |
| 1              | Heart disease present |
| 2              | Heart disease present |
| 3              | Heart disease present |
| 4              | Heart disease present |

For this project, the target will be converted into a binary classification label:

| Binary Target | Meaning                                    | HeartGuard Display |
| ------------- | ------------------------------------------ | ------------------ |
| 0             | No heart disease detected in dataset label | Lower Risk         |
| 1             | Heart disease present in dataset label     | Higher Risk        |

Transformation rule:

```txt
target_binary = 0 if target == 0 else 1
```
