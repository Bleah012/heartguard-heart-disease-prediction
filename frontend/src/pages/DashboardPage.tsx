import {
  Activity,
  AlertCircle,
  ClipboardCheck,
  HeartPulse,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getCurrentUserToken } from "../services/auth";
import { getPredictionHistory } from "../services/api";
import type { PredictionRecord } from "../types/prediction";

function getPatientName(record: PredictionRecord) {
  return record.patient_name ?? record.patientName ?? "Unnamed patient";
}

function isHigherRisk(record: PredictionRecord) {
  return (
    record.prediction === 1 ||
    record.risk_label.toLowerCase().includes("higher")
  );
}

function getCreatedDate(record: PredictionRecord) {
  const createdAt = record.createdAt;

  if (typeof createdAt === "string") {
    const date = new Date(createdAt);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (
    typeof createdAt === "object" &&
    createdAt !== null &&
    "seconds" in createdAt
  ) {
    const timestamp = createdAt as { seconds?: number };
    return typeof timestamp.seconds === "number"
      ? new Date(timestamp.seconds * 1000)
      : null;
  }

  return null;
}

function formatRelativeDate(record: PredictionRecord) {
  const date = getCreatedDate(record);

  if (!date) {
    return "Recently";
  }

  return date.toLocaleDateString();
}

function buildVolumeData(records: PredictionRecord[]) {
  const monthCounts = new Map<string, number>();

  records.forEach((record) => {
    const date = getCreatedDate(record);
    const label = date
      ? date.toLocaleString("default", { month: "short" })
      : "Recent";

    monthCounts.set(label, (monthCounts.get(label) ?? 0) + 1);
  });

  if (monthCounts.size === 0) {
    return [{ month: "No data", predictions: 0 }];
  }

  return Array.from(monthCounts, ([month, predictions]) => ({
    month,
    predictions,
  }));
}

export function DashboardPage() {
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = await getCurrentUserToken();

      if (!token) {
        setRecords([]);
        setErrorMessage("Sign in to load dashboard data.");
        return;
      }

      const response = await getPredictionHistory(token);
      setRecords(response.predictions);
    } catch {
      setRecords([]);
      setErrorMessage("Dashboard data could not be retrieved.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  const stats = useMemo(() => {
    const higherRisk = records.filter(isHigherRisk).length;
    const lowerRisk = records.length - higherRisk;

    return {
      total: records.length,
      higherRisk,
      lowerRisk,
      volume: buildVolumeData(records),
      recent: records.slice(0, 3),
    };
  }, [records]);

  const statCards = [
    {
      label: "Total Predictions",
      value: stats.total,
      icon: ClipboardCheck,
      color: "text-rose-600",
    },
    {
      label: "Higher Risk Cases",
      value: stats.higherRisk,
      icon: HeartPulse,
      color: "text-rose-600",
    },
    {
      label: "Lower Risk Cases",
      value: stats.lowerRisk,
      icon: ShieldCheck,
      color: "text-emerald-600",
    },
    {
      label: "Model Accuracy",
      value: "88.52%",
      icon: Activity,
      color: "text-sky-600",
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-rose-600">Dashboard</p>
        <h1 className="text-3xl font-bold text-slate-950">
          HeartGuard overview
        </h1>
        <p className="mt-2 text-slate-600">
          Monitor real prediction activity, model performance, and recent
          patient risk assessments.
        </p>
      </div>

      {errorMessage ? (
        <div className="flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-semibold text-amber-800">
          <AlertCircle className="h-5 w-5" />
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 text-slate-600 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading dashboard data...
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="font-semibold text-slate-500">{card.label}</p>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="mt-6 text-4xl font-bold text-slate-950">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Prediction Volume
          </h2>
          <p className="text-slate-500">
            Saved heart disease risk checks grouped by month.
          </p>

          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.volume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis allowDecimals={false} stroke="#64748b" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="predictions"
                  stroke="#e11d48"
                  fill="#ffe4e6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Recent Predictions
          </h2>

          <div className="mt-6 space-y-4">
            {stats.recent.length === 0 ? (
              <p className="rounded-md border border-slate-100 px-4 py-8 text-center text-slate-500">
                No saved predictions yet.
              </p>
            ) : (
              stats.recent.map((record, index) => (
                <div
                  key={record.id ?? `${getPatientName(record)}-${index}`}
                  className="rounded-md border border-slate-100 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-950">
                        {getPatientName(record)}
                      </p>
                      <p
                        className={`mt-2 text-sm font-semibold ${
                          isHigherRisk(record)
                            ? "text-rose-700"
                            : "text-emerald-700"
                        }`}
                      >
                        {record.risk_label}
                      </p>
                    </div>
                    <p className="text-sm text-slate-400">
                      {formatRelativeDate(record)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
