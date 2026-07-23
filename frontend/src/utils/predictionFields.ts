import type { PredictionInput } from "../types/prediction";

export type PredictionField = {
  name: keyof PredictionInput;
  label: string;
  type: "number" | "text";
  min?: number;
  max?: number;
  step?: number;
  helper?: string;
};

export const predictionFields: PredictionField[] = [
  {
    name: "patient_name",
    label: "Patient Name",
    type: "text",
    helper: "Optional patient label.",
  },
  { name: "age", label: "Age", type: "number", min: 1, max: 120 },
  {
    name: "sex",
    label: "Sex",
    type: "number",
    min: 0,
    max: 1,
    helper: "0 = female, 1 = male.",
  },
  { name: "cp", label: "Chest Pain Type", type: "number", min: 1, max: 4 },
  {
    name: "trestbps",
    label: "Resting Blood Pressure",
    type: "number",
    min: 50,
    max: 250,
  },
  { name: "chol", label: "Cholesterol", type: "number", min: 100, max: 700 },
  {
    name: "fbs",
    label: "Fasting Blood Sugar",
    type: "number",
    min: 0,
    max: 1,
    helper: "0 = false, 1 = true.",
  },
  { name: "restecg", label: "Resting ECG", type: "number", min: 0, max: 2 },
  {
    name: "thalach",
    label: "Maximum Heart Rate",
    type: "number",
    min: 50,
    max: 250,
  },
  {
    name: "exang",
    label: "Exercise Induced Angina",
    type: "number",
    min: 0,
    max: 1,
  },
  {
    name: "oldpeak",
    label: "ST Depression",
    type: "number",
    min: 0,
    max: 10,
    step: 0.1,
  },
  { name: "slope", label: "Slope", type: "number", min: 1, max: 3 },
  { name: "ca", label: "Major Vessels", type: "number", min: 0, max: 3 },
  { name: "thal", label: "Thalassemia", type: "number", min: 3, max: 7 },
];
