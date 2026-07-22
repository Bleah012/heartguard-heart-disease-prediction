from pathlib import Path

import pandas as pd


COLUMN_NAMES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
    "target",
]


def load_heart_disease_data(data_path: str | Path) -> pd.DataFrame:
    """
    Load the Cleveland Heart Disease dataset.

    The raw dataset has no header row and uses '?' for missing values.
    This function assigns column names, converts '?' values to missing values,
    converts columns to numeric values, and creates a binary target column.
    """
    path = Path(data_path)

    if not path.exists():
        raise FileNotFoundError(f"Dataset not found: {path}")

    df = pd.read_csv(
        path,
        header=None,
        names=COLUMN_NAMES,
        na_values="?",
    )

    for column in COLUMN_NAMES:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    df["target_binary"] = (df["target"] > 0).astype(int)

    return df


if __name__ == "__main__":
    dataset_path = Path(__file__).resolve().parents[1] / "data" / "raw" / "processed.cleveland.data"
    data = load_heart_disease_data(dataset_path)

    print("Dataset loaded successfully")
    print(f"Shape: {data.shape}")
    print(data.head())
    print()
    print("Missing values:")
    print(data.isna().sum())