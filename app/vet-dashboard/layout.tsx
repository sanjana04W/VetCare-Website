"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/website/components/Logo";
import { NotificationDropdown } from "@/website/components/NotificationDropdown";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Syringe, 
  Clock, 
  UserCog, 
  ArrowLeft,
  Menu,
  X,
  Stethoscope,
  Lock
} from "lucide-react";

export default function VetDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, role, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/vet-dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/vet-dashboard/appointments", label: "Appointments Queue", icon: Calendar },
    { href: "/vet-dashboard/patients", label: "Patient Directory", icon: Users },
    { href: "/vet-dashboard/medical-records", label: "Medical Records", icon: FileText },
    { href: "/vet-dashboard/vaccinations", label: "Vaccinations", icon: Syringe },
    { href: "/vet-dashboard/availability", label: "Hours & Availability", icon: Clock },
    { href: "/vet-dashboard/profile", label: "Clinical Profile", icon: UserCog },
  ];

  if (!isLoading && (!user || (role !== "veterinarian" && role !== "admin"))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-950/80 border border-teal-800 text-teal-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">Clinical Console Restricted</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This console is restricted to licensed veterinary medical professionals.
            </p>
          </div>
          <div className="bg-teal-950/40 border border-teal-900/60 rounded-xl p-3 text-left text-xs space-y-1">
            <p className="text-teal-300 font-bold">Licensed Veterinarian Demo Account:</p>
            <p className="text-slate-300 font-mono text-[11px]">Email: dr.sarah@pawpulse.com</p>
            <p className="text-slate-300 font-mono text-[11px]">Password: password123</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Link
              href="/login"
              className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl transition text-center shadow-sm"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="bg-white/10 p-2 rounded-xl">
              <Logo size="sm" />
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/70 text-xs">
            <span className="text-[10px] font-bold uppercase text-brand-400 block tracking-wider">
              Practitioner Workspace
            </span>
            <p className="font-bold text-white truncate mt-0.5">
              {user?.displayName || "Dr. Sarah Jenkins"}
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-brand-600 text-white shadow-sm shadow-brand-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-brand-600" />
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Veterinarian Clinical Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center border border-brand-200">
              Dr
            </div>
          </div>
        </header>

        {/* Child Pages */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
