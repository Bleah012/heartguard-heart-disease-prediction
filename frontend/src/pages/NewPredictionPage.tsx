import { Save, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";

import type { PredictionInput } from "../types/prediction";
import { predictionFields } from "../utils/predictionFields";

const initialFormState: PredictionInput = {
  patient_name: "",
  age: 58,
  sex: 1,
  cp: 4,
  trestbps: 140,
  chol: 250,
  fbs: 0,
  restecg: 2,
  thalach: 120,
  exang: 1,
  oldpeak: 2,
  slope: 2,
  ca: 1,
  thal: 7,
};

export function NewPredictionPage() {
  const [formData, setFormData] = useState<PredictionInput>(initialFormState);

  const requiredFieldsCompleted = useMemo(
    () =>
      predictionFields
        .filter((field) => field.name !== "patient_name")
        .every(
          (field) =>
            formData[field.name] !== undefined && formData[field.name] !== "",
        ),
    [formData],
  );

  function updateField(name: keyof PredictionInput, value: string) {
    setFormData((current) => ({
      ...current,
      [name]: name === "patient_name" ? value : Number(value),
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-rose-700">New Prediction</p>
        <h1 className="text-2xl font-bold text-slate-950">
          Patient risk assessment
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Enter clinical values from the Cleveland heart disease feature set to
          prepare a prediction request.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex size-10 items-center justify-center rounded-md bg-rose-50 text-rose-700">
            <Stethoscope size={20} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-950">
              Clinical Inputs
            </h2>
            <p className="text-sm text-slate-500">
              All numeric fields are required.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {predictionFields.map((field) => (
            <label key={field.name} className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                {field.label}
              </span>
              <input
                type={field.type}
                min={field.min}
                max={field.max}
                step={field.step}
                value={formData[field.name] ?? ""}
                onChange={(event) =>
                  updateField(field.name, event.target.value)
                }
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              />
              {field.helper ? (
                <span className="block text-xs text-slate-500">
                  {field.helper}
                </span>
              ) : null}
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            The final prediction will be saved to Firebase after backend
            integration is connected.
          </p>
          <button
            type="submit"
            disabled={!requiredFieldsCompleted}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Save size={18} />
            Save Prediction
          </button>
        </div>
      </form>
    </div>
  );
}
