import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authServices";
import { loginSuccess } from "../../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const user = response?.data?.user || response?.user;
      const token = response?.data?.token || response?.token;

      dispatch(loginSuccess({ user, token }));
      toast.success(response.message || "Logged in successfully");
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      
      {/* LEFT SIDE: Branding Showcase & Background Image */}
      <div 
        className="hidden lg:flex flex-1 relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80')"
        }}
      >
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/90 via-slate-900/80 to-indigo-900/40 backdrop-blur-[2px]" />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          
          {/* Logo / Top Header */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/30 backdrop-blur-md rounded-xl border border-indigo-400/30">
              <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wide">NotesApp</span>
          </div>

          {/* Feature Highlight / Value Proposition */}
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Capture thoughts, <br />
              <span className="text-indigo-400">organize ideas anywhere.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Never lose a bright idea again. Sync your thoughts seamlessly, structure your daily to-dos, and retrieve your notes from any device.
            </p>

            {/* Feature Bullets */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                  <span className="text-indigo-300 text-xs">✓</span>
                </div>
                <span>Real-time cloud synchronization</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                  <span className="text-indigo-300 text-xs">✓</span>
                </div>
                <span>Distraction-free workspace</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                  <span className="text-indigo-300 text-xs">✓</span>
                </div>
                <span>End-to-end security for your privacy</span>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Notes App. All rights reserved.
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Form Header */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4 lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-2">Sign in to access your saved notes and workspace</p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50/50"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50/50"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Sign In
            </button>
          </form>

          {/* Create Account Link */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create account
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;