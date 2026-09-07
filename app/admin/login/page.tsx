"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState("admin@pawpulse.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Strict admin check: Only admin@pawpulse.com with password123 can log in here
    if (cleanEmail !== "admin@pawpulse.com" || password !== "password123") {
      setError("Invalid administrator credentials. Access denied.");
      return;
    }

    setIsLoading(true);
    try {
      const ok = await adminLogin(cleanEmail, password);
      if (ok) {
        router.push("/admin-dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[420px] bg-white rounded-[28px] p-8 sm:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center">
        {/* Pink / Brand Circular Lock Icon - matching website's teal/emerald palette */}
        <div className="w-14 h-14 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-5 shadow-xs">
          <Lock className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-wider text-center uppercase mb-1">
          ADMIN PORTAL
        </h1>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 font-medium text-center mb-7">
          Sign in to manage your veterinary hospital
        </p>

        {/* Error Alert */}
        {error && (
          <div className="w-full p-3 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pawpulse.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50/90 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md shadow-brand-600/25 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}
