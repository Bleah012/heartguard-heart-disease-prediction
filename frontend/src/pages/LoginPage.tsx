import { HeartPulse, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginWithEmail } from "../services/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] p-4">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-md bg-rose-600 text-white">
            <HeartPulse size={24} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-950">HeartGuard</p>
            <p className="text-sm text-slate-500">Sign in to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-md bg-amber-50 p-3 text-sm font-medium text-amber-900">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <LogIn size={18} />
            )}
            Sign In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          Need an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-rose-700 hover:text-rose-800"
          >
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
