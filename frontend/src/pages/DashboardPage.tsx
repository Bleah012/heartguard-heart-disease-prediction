import {
  Activity,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const stats = [
  {
    label: "Total Predictions",
    value: "128",
    icon: ClipboardCheck,
    color: "text-rose-700",
  },
  {
    label: "Higher Risk Cases",
    value: "42",
    icon: HeartPulse,
    color: "text-red-700",
  },
  {
    label: "Lower Risk Cases",
    value: "86",
    icon: ShieldCheck,
    color: "text-emerald-700",
  },
  {
    label: "Model Accuracy",
    value: "88.52%",
    icon: Activity,
    color: "text-sky-700",
  },
];

const chartData = [
  { month: "Jan", predictions: 18 },
  { month: "Feb", predictions: 22 },
  { month: "Mar", predictions: 30 },
  { month: "Apr", predictions: 26 },
  { month: "May", predictions: 34 },
  { month: "Jun", predictions: 41 },
];

const recentPredictions = [
  {
    patient: "Patient A",
    risk: "Higher risk",
    date: "Today",
    tone: "text-red-700",
  },
  {
    patient: "Patient B",
    risk: "Lower risk",
    date: "Yesterday",
    tone: "text-emerald-700",
  },
  {
    patient: "Patient C",
    risk: "Lower risk",
    date: "2 days ago",
    tone: "text-emerald-700",
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-rose-700">Dashboard</p>
        <h1 className="text-2xl font-bold text-slate-950">
          HeartGuard overview
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Monitor prediction activity, model performance, and recent patient
          risk assessments.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <Icon className={item.color} size={20} />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-950">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-950">
              Prediction Volume
            </h2>
            <p className="text-sm text-slate-500">
              Monthly completed heart disease risk checks.
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="predictions"
                  stroke="#e11d48"
                  fill="#ffe4e6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Recent Predictions
          </h2>
          <div className="mt-5 space-y-3">
            {recentPredictions.map((item) => (
              <div
                key={item.patient}
                className="rounded-md border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-slate-950">{item.patient}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <p className={`mt-1 text-sm font-medium ${item.tone}`}>
                  {item.risk}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
