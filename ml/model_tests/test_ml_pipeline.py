from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from ml.src.load_data import load_heart_disease_data
from ml.src.preprocessing import (
    FEATURE_COLUMNS,
    TARGET_COLUMN,
    build_preprocessor,
    split_features_and_target,
)


PROJECT_ROOT = Path(__file__).resolve().parents[2]
RAW_DATA_PATH = PROJECT_ROOT / "ml" / "data" / "raw" / "processed.cleveland.data"
MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "heart_disease_pipeline.joblib"


def test_raw_dataset_file_exists():
    assert RAW_DATA_PATH.exists()


def test_load_heart_disease_data_returns_expected_columns():
    df = load_heart_disease_data(RAW_DATA_PATH)

    assert isinstance(df, pd.DataFrame)
    assert df.shape[0] == 303
    assert TARGET_COLUMN in df.columns
    assert "target" in df.columns

    for column in FEATURE_COLUMNS:
        assert column in df.columns


def test_split_features_and_target_returns_expected_shapes():
    df = load_heart_disease_data(RAW_DATA_PATH)

    x, y = split_features_and_target(df)

    assert list(x.columns) == FEATURE_COLUMNS
    assert y.name == TARGET_COLUMN
    assert x.shape[0] == y.shape[0] == 303


def test_build_preprocessor_returns_column_transformer():
    preprocessor = build_preprocessor()

    assert isinstance(preprocessor, ColumnTransformer)


def test_saved_model_pipeline_exists_and_loads():
    assert MODEL_PATH.exists()

    model = joblib.load(MODEL_PATH)

    assert isinstance(model, Pipeline)
    assert hasattr(model, "predict")
    assert hasattr(model, "predict_proba")


def test_saved_model_pipeline_can_predict_one_sample():
    df = load_heart_disease_data(RAW_DATA_PATH)
    model = joblib.load(MODEL_PATH)

    sample = df[FEATURE_COLUMNS].head(1)
    prediction = model.predict(sample)
    probabilities = model.predict_proba(sample)

    assert prediction[0] in [0, 1]
    assert probabilities.shape == (1, 2)
    assert round(float(probabilities[0].sum()), 4) == 1.0