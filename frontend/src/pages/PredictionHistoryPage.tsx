import { AlertCircle, Clock3, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { getPredictionHistory } from "../services/api";
import { getCurrentUserToken } from "../services/auth";
import type { PredictionRecord } from "../types/prediction";

const sampleRecords: PredictionRecord[] = [
  {
    id: "sample-1",
    userId: "demo",
    patient_name: "Patient A",
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
    prediction: 1,
    risk_label: "Higher heart disease risk",
    lower_risk_probability: 0,
    higher_risk_probability: 1,
    model_name: "Random Forest Classifier",
    model_version: "1.0.0",
  },
  {
    id: "sample-2",
    userId: "demo",
    patient_name: "Patient B",
    age: 46,
    sex: 0,
    cp: 2,
    trestbps: 118,
    chol: 210,
    fbs: 0,
    restecg: 0,
    thalach: 172,
    exang: 0,
    oldpeak: 0.8,
    slope: 1,
    ca: 0,
    thal: 3,
    prediction: 0,
    risk_label: "Lower heart disease risk",
    lower_risk_probability: 0.86,
    higher_risk_probability: 0.14,
    model_name: "Random Forest Classifier",
    model_version: "1.0.0",
  },
];

export function PredictionHistoryPage() {
  const [records, setRecords] = useState<PredictionRecord[]>(sampleRecords);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadHistory() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = await getCurrentUserToken();

      if (!token) {
        throw new Error("Sign in to load saved prediction history.");
      }

      const response = await getPredictionHistory(token);
      setRecords(response.predictions);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load prediction history.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-rose-700">
            Prediction History
          </p>
          <h1 className="text-2xl font-bold text-slate-950">
            Saved risk assessments
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Review prior prediction records saved for the signed-in user.
          </p>
        </div>

        <button
          type="button"
          onClick={loadHistory}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={17} />
          ) : (
            <RefreshCw size={17} />
          )}
          Refresh
        </button>
      </div>

      {errorMessage ? (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <AlertCircle className="mt-0.5 shrink-0" size={20} />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-base font-semibold text-slate-950">
            Prediction Records
          </h2>
          <p className="text-sm text-slate-500">
            {records.length} records displayed.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {records.map((record) => (
            <div
              key={record.id ?? `${record.patient_name}-${record.age}`}
              className="grid gap-4 p-5 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold text-slate-950">
                    {record.patient_name || "Unnamed patient"}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      record.prediction === 1
                        ? "bg-rose-50 text-rose-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {record.risk_label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Age {record.age} | Cholesterol {record.chol} | Max heart rate{" "}
                  {record.thalach}
                </p>
              </div>

              <div className="flex min-w-56 items-center gap-3 rounded-md bg-slate-50 p-3">
                <Clock3 className="text-slate-500" size={18} />
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Higher-risk probability
                  </p>
                  <p className="text-lg font-bold text-slate-950">
                    {(record.higher_risk_probability * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
