import { Mail, ShieldCheck, UserRound } from "lucide-react";

const profileItems = [
  { label: "Role", value: "Healthcare user / evaluator" },
  { label: "Authentication", value: "Firebase Auth" },
  { label: "Database", value: "Cloud Firestore" },
  { label: "Plan", value: "Free-tier friendly setup" },
];

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-rose-700">Profile</p>
        <h1 className="text-2xl font-bold text-slate-950">
          Account and system profile
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          View signed-in user details and the current HeartGuard platform
          configuration.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
              <UserRound size={30} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                HeartGuard User
              </h2>
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <Mail size={15} />
                user@example.com
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {profileItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-md bg-slate-50 p-3"
              >
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="text-right text-sm font-semibold text-slate-950">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-950">
                Security Configuration
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                The frontend uses Firebase Authentication for sign-in state and
                sends Firebase ID tokens to the protected FastAPI backend
                endpoints.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-md border border-slate-100 p-4">
            <h3 className="text-sm font-semibold text-slate-950">
              Current Implementation Notes
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>
                Firebase client configuration is read from Vite environment
                variables.
              </li>
              <li>Prediction APIs require a valid signed-in user token.</li>
              <li>
                Firestore stores prediction history through the backend
                repository layer.
              </li>
              <li>Medical prediction output remains decision-support only.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
