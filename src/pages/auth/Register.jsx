import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authServices";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success(response.message || "Account created successfully");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again...";
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wide">NotesApp</span>
          </div>

          {/* Feature Highlight / Value Proposition */}
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Start capturing your <br />
              <span className="text-indigo-400">ideas in seconds.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Join thousands of users organizing their thoughts, staying productive, and keeping their notes synchronized across every device.
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

      {/* RIGHT SIDE: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Form Header */}
          <div className="text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-4 lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Get Started</h1>
            <p className="text-sm text-slate-500 mt-2">Create an account to manage your notes and workspace</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-slate-50/50"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

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
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
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
              Create Account
            </button>
          </form>

          {/* Already have an account link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;