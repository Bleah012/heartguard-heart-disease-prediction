import { AlertCircle, Clock3, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getCurrentUserToken } from "../services/auth";
import { getPredictionHistory } from "../services/api";
import type { PredictionRecord } from "../types/prediction";

function getPatientName(record: PredictionRecord) {
  return record.patient_name ?? record.patientName ?? "Unnamed patient";
}

function formatProbability(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatCreatedAt(value: unknown) {
  if (!value) {
    return "Recently";
  }

  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Recently" : date.toLocaleString();
  }

  if (typeof value === "object" && value !== null && "seconds" in value) {
    const timestamp = value as { seconds?: number };
    if (typeof timestamp.seconds === "number") {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
  }

  return "Recently";
}

export function PredictionHistoryPage() {
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = await getCurrentUserToken();

      if (!token) {
        setRecords([]);
        setErrorMessage("Sign in to load saved prediction history.");
        return;
      }

      const response = await getPredictionHistory(token);
      setRecords(response.predictions);
    } catch (error) {
      setRecords([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load prediction history.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadHistory]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-rose-600">
            Prediction History
          </p>
          <h1 className="text-3xl font-bold text-slate-950">
            Saved risk assessments
          </h1>
          <p className="mt-2 text-slate-600">
            Review prior prediction records saved for the signed-in user.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void loadHistory()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh
        </button>
      </div>

      {errorMessage ? (
        <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-semibold text-amber-800">
          <AlertCircle className="h-5 w-5" />
          {errorMessage}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-950">
            Prediction Records
          </h2>
          <p className="text-sm text-slate-500">
            {records.length} {records.length === 1 ? "record" : "records"}{" "}
            displayed.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-3 px-6 py-12 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading saved predictions...
          </div>
        ) : records.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500">
            No saved predictions yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {records.map((record, index) => {
              const isHigherRisk =
                record.prediction === 1 ||
                record.risk_label.toLowerCase().includes("higher");

              return (
                <article
                  key={record.id ?? `${getPatientName(record)}-${index}`}
                  className="grid gap-4 px-6 py-5 lg:grid-cols-[1fr_260px]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-slate-950">
                        {getPatientName(record)}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isHigherRisk
                            ? "bg-rose-50 text-rose-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {record.risk_label}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-600">
                      Age {record.age} | Cholesterol {record.chol} | Max heart
                      rate {record.thalach}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <Clock3 className="h-4 w-4" />
                      {formatCreatedAt(record.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-md bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Higher-risk probability
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {formatProbability(record.higher_risk_probability)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
