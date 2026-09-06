import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
              <Logo size="md" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              PawPulse VetCare is an AAHA-accredited animal hospital system delivering compassionate clinical excellence, advanced diagnostics, and dedicated companion care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-brand-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AAHA Certified Hospital</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-amber-400 font-medium">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Fear-Free Certified Staff</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Navigation</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-brand-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> About Our Team
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Clinical Services
                </Link>
              </li>
              <li>
                <Link href="/find-a-vet" className="hover:text-brand-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Find a Specialist
                </Link>
              </li>
              <li>
                <Link href="/pet-care-tips" className="hover:text-brand-400 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Pet Care Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Emergency */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Hospital Hours</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon – Fri:</p>
                  <p>7:30 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Saturday:</p>
                  <p>8:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-200 mt-2">
                <p className="font-semibold text-rose-400 flex items-center gap-1">
                  <span>🚨 24/7 Critical Triage</span>
                </p>
                <p className="text-[11px] mt-0.5">Emergency veterinary doctors on site 24/7/365.</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Contact Us</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>742 Evergreen Terrace, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:18005557297" className="hover:text-white transition">
                  (800) 555-PAWS / (555) 019-2834
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="mailto:support@pawpulse.com" className="hover:text-white transition">
                  care@pawpulse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PawPulse VetCare Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
            <Link href="/admin-dashboard" className="text-slate-600 hover:text-slate-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
