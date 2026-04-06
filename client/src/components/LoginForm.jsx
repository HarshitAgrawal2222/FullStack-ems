import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate(); // ✅ added

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || error.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      <LoginLeftSide />

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">

          {/* 🔙 Back */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-8 transition"
          >
            <ArrowLeft size={16} />
            Back to portals
          </Link>

          {/* 🧾 Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-zinc-800">
              {title}
            </h1>
            <p className="text-slate-500 mt-2">
              {subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          {/* ✅ FIXED FORM (wrapped correctly) */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* 📧 Email */}
            <div>
              <label className="text-sm text-slate-600 mb-1 block">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* 🔒 Password */}
            <div>
              <label className="text-sm text-slate-600 mb-1 block">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 🚀 Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition"
            >
              Sign in
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;