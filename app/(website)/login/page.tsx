"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Logo } from "@/website/components/Logo";
import { Lock, Mail, ShieldCheck, Stethoscope, HeartHandshake, AlertCircle, ArrowRight } from "lucide-react";
import { UserRole } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState("michael.scott@example.com");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState<UserRole>("petOwner");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const ok = await login(email, role);
      if (ok) {
        if (role === "admin") router.push("/admin-dashboard");
        else if (role === "veterinarian") router.push("/vet-dashboard");
        else router.push("/portal/pets");
      }
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillQuickRole = (targetRole: UserRole, targetEmail: string) => {
    setRole(targetRole);
    setEmail(targetEmail);
    setPassword("password123");
    switchRole(targetRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block mb-2">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to PawPulse
          </h1>
          <p className="text-xs text-slate-500">
            Access your companion&apos;s medical records, appointments, and hospital dashboards
          </p>
        </div>

        {/* Quick Demo Logins Pill Box */}
        <div className="bg-brand-50/70 border border-brand-200/80 rounded-2xl p-3.5 text-xs space-y-2">
          <p className="font-bold text-brand-900 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            1-Click Demo Pre-Fill:
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => fillQuickRole("petOwner", "michael.scott@example.com")}
              className={`p-1.5 rounded-lg border text-center font-medium transition ${
                role === "petOwner"
                  ? "bg-white border-brand-500 text-brand-700 shadow-xs"
                  : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
              }`}
            >
              Pet Owner
            </button>
            <button
              type="button"
              onClick={() => fillQuickRole("veterinarian", "dr.sarah@pawpulse.com")}
              className={`p-1.5 rounded-lg border text-center font-medium transition ${
                role === "veterinarian"
                  ? "bg-white border-brand-500 text-brand-700 shadow-xs"
                  : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
              }`}
            >
              Veterinarian
            </button>
            <button
              type="button"
              onClick={() => fillQuickRole("admin", "admin@pawpulse.com")}
              className={`p-1.5 rounded-lg border text-center font-medium transition ${
                role === "admin"
                  ? "bg-white border-brand-500 text-brand-700 shadow-xs"
                  : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Portal Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("petOwner")}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                    role === "petOwner"
                      ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Owner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("veterinarian")}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                    role === "veterinarian"
                      ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Vet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                    role === "admin"
                      ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="text-brand-600 hover:underline font-semibold">
              Create a free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
