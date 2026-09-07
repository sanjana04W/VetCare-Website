"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NotificationDropdown } from "./NotificationDropdown";
import { BookingModal } from "./BookingModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  Menu, 
  X, 
  Calendar, 
  LogOut, 
  ChevronDown,
  PhoneCall,
  User
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/find-a-vet", label: "Find a Vet" },
    { href: "/pet-care-tips", label: "Pet Care Tips" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-0"
          : "bg-white/95 backdrop-blur-xs border-b border-slate-100 shadow-2xs py-0.5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.01]">
              <Logo size="md" showTagline />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "text-brand-700 bg-brand-50/90 font-semibold shadow-2xs"
                        : "text-slate-600 hover:text-brand-600 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* 24/7 Hotline Badge */}
              <a
                href="tel:18005557297"
                className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200/70 hover:bg-rose-100 transition whitespace-nowrap"
                title="24/7 Emergency Dispatch"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                <span>24/7 Emergency: (800) 555-PAWS</span>
              </a>

              {/* In-App Notifications */}
              <NotificationDropdown />

              {/* Primary Public CTA: Book Appointment */}
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-800 hover:to-brand-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              {/* User Profile Dropdown / Sign In */}
              {user ? (
                <div className="relative pl-1 border-l border-slate-200" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition text-left"
                    aria-label="User profile menu"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-700 font-bold text-xs shrink-0">
                      {user.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                      ) : (
                        user.displayName.charAt(0)
                      )}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.displayName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 text-brand-700">
                          {role === "admin" ? "Hospital Admin" : role === "veterinarian" ? "Veterinarian" : "Pet Parent"}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/portal/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-700 transition"
                        >
                          <User className="w-4 h-4 text-brand-600" />
                          <span>Profile</span>
                        </Link>
                        {role === "petOwner" && (
                          <Link
                            href="/portal/appointments"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-700 transition"
                          >
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>My Appointments</span>
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 whitespace-nowrap"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
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
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href ? "text-brand-700 bg-brand-50 font-bold" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBookingOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              {user ? (
                <div className="space-y-2 pt-2">
                  <Link
                    href="/portal/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 text-slate-800 text-xs font-semibold"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-600" />
                      Profile
                    </span>
                    <span className="text-[10px] text-slate-400">&rarr;</span>
                  </Link>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out ({user.displayName})</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Booking Modal Triggerable from Navbar */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
