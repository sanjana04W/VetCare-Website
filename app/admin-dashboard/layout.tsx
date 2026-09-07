"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/website/components/Logo";
import { NotificationDropdown } from "@/website/components/NotificationDropdown";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  ArrowLeft,
  Menu,
  X,
  Lock,
  LogOut
} from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { adminUser, isAdminLoading, adminLogout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: "/admin-dashboard", label: "Executive Metrics", icon: LayoutDashboard },
    { href: "/admin-dashboard/users", label: "Pet Owners (Users)", icon: Users },
    { href: "/admin-dashboard/veterinarians", label: "Veterinarians & Approvals", icon: Stethoscope },
    { href: "/admin-dashboard/appointments", label: "All Appointments", icon: Calendar },
    { href: "/admin-dashboard/pet-care-tips", label: "Pet Care Tips CMS", icon: BookOpen },
    { href: "/admin-dashboard/reviews", label: "Reviews & Ratings", icon: MessageSquare },
    { href: "/admin-dashboard/notifications", label: "Broadcast & Alerts", icon: Bell },
  ];

  if (!isAdminLoading && !adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-brand-950/80 border border-brand-800 text-brand-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Access Restricted</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This panel is exclusively for hospital administrators.
              Regular user accounts cannot access this dashboard.
            </p>
          </div>
          <div className="bg-brand-950/40 border border-brand-900/60 rounded-xl p-3.5 text-left text-xs space-y-1.5">
            <p className="text-brand-300 font-bold">Authorized Admin Credentials:</p>
            <p className="text-slate-300 font-mono text-[11px]">Email: <strong>admin@pawpulse.com</strong></p>
            <p className="text-slate-300 font-mono text-[11px]">Password: <strong>password123</strong></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Link
              href="/admin/login"
              className="flex-1 py-2.5 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl transition text-center shadow-sm"
            >
              Sign In as Admin
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
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200
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

          <div className="px-3 py-2 rounded-xl bg-brand-950/40 border border-brand-800/40 text-xs">
            <span className="text-[10px] font-bold uppercase text-brand-400 block tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Hospital Administration
            </span>
            <p className="font-bold text-white truncate mt-0.5">
              {adminUser?.displayName || "Eleanor Vance (Hospital Director)"}
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
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-900 space-y-2 text-xs">
          <button
            onClick={adminLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out (Admin)</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Hospital Command & Administration Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <button
              onClick={adminLogout}
              title="Sign Out of Admin Panel"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition border border-slate-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
