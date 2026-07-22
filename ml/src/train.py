from pathlib import Path

import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier

from load_data import load_heart_disease_data
from preprocessing import build_preprocessor, split_features_and_target


def build_candidate_models() -> dict:
    """
    Define candidate classification algorithms for comparison.
    """
    return {
        "logistic_regression": LogisticRegression(max_iter=1000, random_state=42),
        "decision_tree": DecisionTreeClassifier(random_state=42),
        "random_forest": RandomForestClassifier(
            n_estimators=100,
            random_state=42,
        ),
    }


def train_and_compare_models() -> None:
    """
    Train multiple models, compare accuracy, and save the best complete pipeline.
    """
    dataset_path = (
        Path(__file__).resolve().parents[1]
        / "data"
        / "raw"
        / "processed.cleveland.data"
    )
    model_output_path = (
        Path(__file__).resolve().parents[1]
        / "models"
        / "heart_disease_pipeline.joblib"
    )

    df = load_heart_disease_data(dataset_path)
    x, y = split_features_and_target(df)

    x_train, x_test, y_train, y_test = train_test_split(
        x,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    candidate_models = build_candidate_models()

    best_model_name = None
    best_accuracy = 0
    best_pipeline = None

    print("HeartGuard Model Training")
    print("=" * 35)

    for model_name, model in candidate_models.items():
        pipeline = Pipeline(
            steps=[
                ("preprocessor", build_preprocessor()),
                ("classifier", model),
            ]
        )

        pipeline.fit(x_train, y_train)
        predictions = pipeline.predict(x_test)
        accuracy = accuracy_score(y_test, predictions)

        print()
        print(f"Model: {model_name}")
        print(f"Accuracy: {accuracy:.4f}")
        print("Confusion Matrix:")
        print(confusion_matrix(y_test, predictions))
        print("Classification Report:")
        print(classification_report(y_test, predictions))

        if accuracy > best_accuracy:
            best_model_name = model_name
            best_accuracy = accuracy
            best_pipeline = pipeline

    model_output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(best_pipeline, model_output_path)

    print()
    print("Best Model")
    print("-" * 35)
    print(f"Name: {best_model_name}")
    print(f"Accuracy: {best_accuracy:.4f}")
    print(f"Saved pipeline: {model_output_path}")


if __name__ == "__main__":
    train_and_compare_models()