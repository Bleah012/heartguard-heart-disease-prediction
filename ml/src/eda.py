from pathlib import Path

from load_data import load_heart_disease_data


def run_eda() -> None:
    dataset_path = Path(__file__).resolve().parents[1] / "data" / "raw" / "processed.cleveland.data"
    df = load_heart_disease_data(dataset_path)

    print("HeartGuard Exploratory Data Analysis")
    print("=" * 45)

    print("\n1. Dataset Shape")
    print(df.shape)

    print("\n2. Column Names")
    print(list(df.columns))

    print("\n3. Data Types")
    print(df.dtypes)

    print("\n4. Missing Values")
    print(df.isna().sum())

    print("\n5. Duplicate Rows")
    print(df.duplicated().sum())

    print("\n6. Original Target Distribution")
    print(df["target"].value_counts().sort_index())

    print("\n7. Binary Target Distribution")
    print(df["target_binary"].value_counts().sort_index())

    print("\n8. Summary Statistics")
    print(df.describe())

    print("\n9. Class Balance Percentage")
    class_percentages = df["target_binary"].value_counts(normalize=True).sort_index() * 100
    print(class_percentages.round(2))


if __name__ == "__main__":
    run_eda()