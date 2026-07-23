import { Download, FileText, Printer, ShieldAlert } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const riskData = [
  { name: "Lower risk", value: 86, color: "#059669" },
  { name: "Higher risk", value: 42, color: "#e11d48" },
];

const reportSections = [
  {
    title: "Model Summary",
    body: "The current HeartGuard model uses a saved Random Forest pipeline trained on the Cleveland Heart Disease dataset.",
  },
  {
    title: "Evaluation Evidence",
    body: "The selected model achieved 88.52% accuracy during the Phase 2 test evaluation run.",
  },
  {
    title: "Clinical Disclaimer",
    body: "Predictions support early risk awareness and should not replace professional medical diagnosis.",
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-rose-700">Reports</p>
          <h1 className="text-2xl font-bold text-slate-950">
            Prediction report summary
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Review model evidence, risk distribution, and report notes for
            documentation.
          </p>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            <Printer size={17} />
            Print
          </button>
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700">
            <Download size={17} />
            Export
          </button>
        </div>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-950">
            Risk Distribution
          </h2>
          <p className="text-sm text-slate-500">
            Sample dashboard distribution for report preview.
          </p>

          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={92}
                >
                  {riskData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {riskData.map((item) => (
              <div
                key={item.name}
                className="rounded-md border border-slate-100 p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <p className="text-sm font-medium text-slate-700">
                    {item.name}
                  </p>
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reportSections.map((section) => (
            <div
              key={section.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-700">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {section.body}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 shrink-0" size={22} />
              <div>
                <h2 className="font-semibold">Medical Use Notice</h2>
                <p className="mt-1 text-sm leading-6">
                  HeartGuard is an educational prediction support system. A
                  qualified clinician should review all decisions related to
                  diagnosis, treatment, or emergency care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
