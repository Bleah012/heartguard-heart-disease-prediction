# Phase 2 Summary: Dataset And Machine Learning Model

## Phase Objective

The objective of Phase 2 was to prepare the dataset, analyze the data, build the preprocessing pipeline, train and compare machine-learning models, select the final model, and save the complete prediction pipeline for later backend integration.

## Dataset Used

Dataset: Cleveland Heart Disease dataset  
Source file: `processed.cleveland.data`  
Local raw data path: `ml/data/raw/processed.cleveland.data`  
Records: 303  
Loaded columns: 15

The dataset was used to predict whether a patient is likely to have heart disease based on clinical attributes.

## Target Variable

The original dataset target values range from 0 to 4.

For HeartGuard, the target was converted into a binary classification problem:

| Original Target | Binary Target | Meaning                   |
| --------------- | ------------: | ------------------------- |
| 0               |             0 | Lower heart disease risk  |
| 1, 2, 3, 4      |             1 | Higher heart disease risk |

The final target column is:

```text
target_binary
```
