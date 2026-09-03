import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authServices";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setStatus({ loading: false, error: "Email is required", success: false });

    setStatus({ loading: true, error: "", success: false });

    try {
      await forgotPassword(email);
      setStatus({ loading: false, error: "", success: true });
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setStatus({ loading: false, error: message, success: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        {status.success ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Check your inbox</h2>
            <p className="mt-2 text-sm text-slate-500">
              If that email is registered, a password reset link has been sent.
            </p>
            <Link to="/login" className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Forgot Password?</h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter your email address to receive a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              {status.error && (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {status.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 transition"
              >
                {status.loading ? "Sending link..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-slate-500 pt-2">
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Back to login
                </Link>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}