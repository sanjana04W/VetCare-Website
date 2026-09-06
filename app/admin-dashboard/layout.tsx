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
  Lock
} from "lucide-react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
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

          <div className="px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs">
            <span className="text-[10px] font-bold uppercase text-purple-400 block tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Hospital Administration
            </span>
            <p className="font-bold text-white truncate mt-0.5">
              {user?.displayName || "Eleanor Vance"}
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
                      ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30"
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
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Site</span>
          </Link>
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
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Hospital Command & Administration Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationDropdown />
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center border border-purple-200">
              Adm
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
