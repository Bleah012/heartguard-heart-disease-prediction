export type PredictionInput = {
  patient_name?: string;
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
};

export type PredictionResult = {
  prediction: number;
  risk_label: string;
  lower_risk_probability: number;
  higher_risk_probability: number;
  model_name: string;
  model_version: string;
};

export type PredictionResponse = {
  message: string;
  result: PredictionResult;
};

export type PredictionRecord = PredictionInput &
  PredictionResult & {
    id?: string;
    userId: string;
    createdAt?: unknown;
  };

export type PredictionHistoryResponse = {
  message: string;
  count: number;
  predictions: PredictionRecord[];
};
