import { ArrowLeft, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] p-4">
      <section className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
          <HeartPulse size={30} />
        </div>
        <p className="mt-5 text-sm font-semibold text-rose-700">404</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-950">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The page you opened does not exist in the HeartGuard workspace.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
