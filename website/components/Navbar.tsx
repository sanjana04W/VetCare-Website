"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NotificationDropdown } from "./NotificationDropdown";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  Menu, 
  X, 
  User, 
  Calendar, 
  Stethoscope, 
  ShieldCheck, 
  LogOut, 
  ChevronRight,
  PhoneCall
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/find-a-vet", label: "Find a Vet" },
    { href: "/pet-care-tips", label: "Pet Care Tips" },
    { href: "/contact", label: "Contact" },
  ];

  const getPortalLink = () => {
    if (role === "admin") return { href: "/admin-dashboard", label: "Admin Console", icon: ShieldCheck };
    if (role === "veterinarian") return { href: "/vet-dashboard", label: "Vet Dashboard", icon: Stethoscope };
    return { href: "/portal/pets", label: "My Pet Portal", icon: Calendar };
  };

  const portal = getPortalLink();
  const PortalIcon = portal.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" showTagline />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "text-brand-700 bg-brand-50/80 font-semibold shadow-xs"
                      : "text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* 24/7 Hotline Badge */}
            <a
              href="tel:18005557297"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200/70 hover:bg-rose-100 transition"
              title="24/7 Veterinary Emergency Dispatch"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>24/7 Emergency: (800) 555-PAWS</span>
            </a>

            {/* In-App Notifications */}
            <NotificationDropdown />

            {/* Role Dedicated Button */}
            <Link
              href={portal.href}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm shadow-brand-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PortalIcon className="w-4 h-4" />
              <span>{portal.label}</span>
            </Link>

            {/* Auth/Profile Pill */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-bold text-xs">
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    user.displayName.charAt(0)
                  )}
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <NotificationDropdown />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === link.href ? "text-brand-700 bg-brand-50" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Link
              href={portal.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-brand-600 text-white font-medium text-sm"
            >
              <span className="flex items-center gap-2">
                <PortalIcon className="w-4 h-4" />
                {portal.label}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:18005557297"
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency Dispatch: (800) 555-PAWS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
