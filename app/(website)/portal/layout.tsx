"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  PawPrint, 
  Calendar, 
  FileText, 
  ShieldAlert, 
  User, 
  Heart,
  Plus
} from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const tabs = [
    { href: "/portal/pets", label: "My Pets", icon: PawPrint },
    { href: "/portal/appointments", label: "Appointments", icon: Calendar },
    { href: "/portal/records", label: "Health & Vaccines", icon: FileText },
    { href: "/portal/emergency", label: "Emergency Profile", icon: ShieldAlert },
  ];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-160px)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Portal Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-brand-600/20">
              {user?.displayName?.charAt(0) || "P"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {user?.displayName || "Pet Parent"}
                </h1>
                <span className="text-[10px] font-bold bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full uppercase">
                  Active Caretaker
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.email} • Managing companion wellness dossiers & appointments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Link
              href="/find-a-vet"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-brand-700 border border-slate-200 shadow-xs"
                    : "text-slate-600 hover:text-brand-600 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-brand-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Portal Page Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
