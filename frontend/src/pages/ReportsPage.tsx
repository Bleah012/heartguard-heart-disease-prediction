import {
  AlertCircle,
  Download,
  FileText,
  Loader2,
  Printer,
  ShieldAlert,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { getCurrentUserToken } from "../services/auth";
import { getPredictionHistory } from "../services/api";
import type { PredictionRecord } from "../types/prediction";

function isHigherRisk(record: PredictionRecord) {
  return (
    record.prediction === 1 ||
    record.risk_label.toLowerCase().includes("higher")
  );
}

function getPatientName(record: PredictionRecord) {
  return record.patient_name ?? record.patientName ?? "Unnamed patient";
}

function buildReportFile(records: PredictionRecord[]) {
  const higherRisk = records.filter(isHigherRisk).length;
  const lowerRisk = records.length - higherRisk;

  return {
    generatedAt: new Date().toISOString(),
    totalPredictions: records.length,
    higherRiskCases: higherRisk,
    lowerRiskCases: lowerRisk,
    modelName: records[0]?.model_name ?? "Random Forest Classifier",
    modelVersion: records[0]?.model_version ?? "1.0.0",
    evaluationAccuracy: "88.52%",
    records: records.map((record) => ({
      patientName: getPatientName(record),
      riskLabel: record.risk_label,
      higherRiskProbability: record.higher_risk_probability,
      lowerRiskProbability: record.lower_risk_probability,
      age: record.age,
      cholesterol: record.chol,
      maximumHeartRate: record.thalach,
      createdAt: record.createdAt,
    })),
  };
}

export function ReportsPage() {
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = await getCurrentUserToken();

      if (!token) {
        setRecords([]);
        setErrorMessage("Sign in to load report data.");
        return;
      }

      const response = await getPredictionHistory(token);
      setRecords(response.predictions);
    } catch {
      setRecords([]);
      setErrorMessage("Report data could not be retrieved.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadReports();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadReports]);

  const reportStats = useMemo(() => {
    const higherRisk = records.filter(isHigherRisk).length;
    const lowerRisk = records.length - higherRisk;

    return {
      total: records.length,
      higherRisk,
      lowerRisk,
      riskData: [
        { name: "Lower risk", value: lowerRisk, color: "#059669" },
        { name: "Higher risk", value: higherRisk, color: "#e11d48" },
      ],
      modelName: records[0]?.model_name ?? "Random Forest Classifier",
      modelVersion: records[0]?.model_version ?? "1.0.0",
    };
  }, [records]);

  function handlePrint() {
    window.print();
  }

  function handleExport() {
    const report = buildReportFile(records);
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "heartguard-prediction-report.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-rose-600">Reports</p>
          <h1 className="text-3xl font-bold text-slate-950">
            Prediction report summary
          </h1>
          <p className="mt-2 text-slate-600">
            Review real risk distribution, model evidence, and report notes for
            documentation.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-rose-200 hover:text-rose-600"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
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
          Loading report data...
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Risk Distribution
          </h2>
          <p className="text-slate-500">
            Distribution from saved prediction records.
          </p>

          <div className="mt-8 h-72">
            {reportStats.total === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                No saved predictions yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reportStats.riskData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                  >
                    {reportStats.riskData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-slate-100 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <span className="h-3 w-3 rounded-full bg-emerald-600" />
                Lower risk
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-950">
                {reportStats.lowerRisk}
              </p>
            </div>

            <div className="rounded-md border border-slate-100 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <span className="h-3 w-3 rounded-full bg-rose-600" />
                Higher risk
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-950">
                {reportStats.higherRisk}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="rounded-md bg-rose-50 p-3 text-rose-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Model Summary
                </h2>
                <p className="mt-2 text-slate-600">
                  The current HeartGuard model uses a saved{" "}
                  {reportStats.modelName} pipeline version{" "}
                  {reportStats.modelVersion} trained on the Cleveland Heart
                  Disease dataset.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="rounded-md bg-rose-50 p-3 text-rose-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Evaluation Evidence
                </h2>
                <p className="mt-2 text-slate-600">
                  The selected model achieved 88.52% accuracy during the Phase 2
                  test evaluation run.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="rounded-md bg-rose-50 p-3 text-rose-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Clinical Disclaimer
                </h2>
                <p className="mt-2 text-slate-600">
                  Predictions support early risk awareness and should not
                  replace professional medical diagnosis.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <div className="flex gap-4">
              <ShieldAlert className="h-6 w-6 shrink-0" />
              <div>
                <h2 className="font-bold">Medical Use Notice</h2>
                <p className="mt-2">
                  HeartGuard is an educational prediction support system. A
                  qualified clinician should review all decisions related to
                  diagnosis, treatment, or emergency care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
