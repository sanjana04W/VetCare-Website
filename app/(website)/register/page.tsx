"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Logo } from "@/website/components/Logo";
import { UserRole } from "@/lib/types";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Stethoscope, 
  HeartHandshake, 
  Award, 
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState<UserRole>("petOwner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialty, setSpecialty] = useState("Canine & Feline Practice");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const ok = await register(name, email, role, phone);
      if (ok) {
        if (role === "veterinarian") {
          router.push("/vet-dashboard");
        } else {
          router.push("/portal/pets");
        }
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block mb-2">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Your PawPulse Account
          </h1>
          <p className="text-xs text-slate-500">
            Join thousands of pet parents and veterinary clinicians managing animal health
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Register As:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("petOwner")}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition ${
                    role === "petOwner"
                      ? "bg-brand-50/80 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <HeartHandshake className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold">Pet Parent</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Bookings & Pet Health</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("veterinarian")}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition ${
                    role === "veterinarian"
                      ? "bg-brand-50/80 border-brand-500 text-brand-900 ring-2 ring-brand-500/20 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Stethoscope className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold">Veterinarian</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Clinical Practice</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  placeholder={role === "veterinarian" ? "Dr. Jane Doe, DVM" : "Jane Doe"}
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Veterinarian Specific Fields */}
            {role === "veterinarian" && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Veterinary State License #
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                      placeholder="e.g. VET-NY-12345"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Clinical Specialty
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  >
                    <option value="Canine & Feline Practice">Canine & Feline Internal Medicine</option>
                    <option value="Orthopedic & Soft Tissue Surgery">Orthopedic & Soft Tissue Surgery</option>
                    <option value="Exotic Animals & Avian Specialist">Exotic Animals & Avian Specialist</option>
                    <option value="Veterinary Dentistry">Veterinary Dentistry</option>
                    <option value="Emergency & Critical Care">Emergency & Critical Care</option>
                  </select>
                </div>
              </>
            )}

            {/* Password */}
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
                  placeholder="At least 8 characters"
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Creating Account..." : "Complete Registration"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Already registered with PawPulse?{" "}
            <Link href="/login" className="text-brand-600 hover:underline font-semibold">
              Sign in to your portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
