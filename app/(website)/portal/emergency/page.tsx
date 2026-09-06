"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  Phone, 
  ShieldAlert, 
  AlertTriangle, 
  Heart, 
  Activity, 
  User, 
  CheckCircle2,
  PhoneCall,
  Flame
} from "lucide-react";

export default function EmergencyPortalPage() {
  const { user } = useAuth();
  const [primaryName, setPrimaryName] = useState("Pam Beesly");
  const [primaryPhone, setPrimaryPhone] = useState("+1 (555) 998-1122");
  const [primaryRelation, setPrimaryRelation] = useState("Co-owner / Spouse");

  const [secondaryName, setSecondaryName] = useState("Jim Halpert");
  const [secondaryPhone, setSecondaryPhone] = useState("+1 (555) 998-3344");
  const [secondaryRelation, setSecondaryRelation] = useState("Neighbor / Emergency Caretaker");

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Companion Emergency Profile</h2>
        <p className="text-xs text-slate-500">
          Designate emergency caretakers authorized to make medical decisions if you cannot be reached during critical triage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Emergency Contacts Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>Authorized Emergency Caretakers</span>
            </h3>
            {saved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Primary */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Primary Alternate Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={primaryName}
                    onChange={(e) => setPrimaryName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Relationship</label>
                <input
                  type="text"
                  value={primaryRelation}
                  onChange={(e) => setPrimaryRelation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Secondary */}
            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Secondary Contact</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={secondaryName}
                    onChange={(e) => setSecondaryName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={secondaryPhone}
                    onChange={(e) => setSecondaryPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Relationship</label>
                <input
                  type="text"
                  value={secondaryRelation}
                  onChange={(e) => setSecondaryRelation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
            >
              Update Emergency Contacts
            </button>
          </form>
        </div>

        {/* Hotlines & First Aid */}
        <div className="lg:col-span-5 space-y-6">
          {/* Rapid Triage Card */}
          <div className="bg-rose-900 text-white rounded-3xl p-6 border border-rose-800 shadow-md space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-[10px] font-bold uppercase tracking-wider">
              24/7 Hospital ICU Hotline
            </span>
            <h4 className="text-xl font-bold">Immediate Veterinary Triage</h4>
            <p className="text-rose-100 text-xs leading-relaxed">
              For acute collapse, vehicular trauma, or toxin ingestion:
            </p>
            <a
              href="tel:18005557297"
              className="w-full py-3 bg-white hover:bg-rose-50 text-rose-900 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-rose-700" />
              <span>(800) 555-PAWS (7297)</span>
            </a>
          </div>

          {/* Quick First-Aid Rules */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Emergency Golden Rules</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>Never induce vomiting:</strong> Caustic chemicals or batteries cause double damage if regurgitated. Call emergency triage first.
              </li>
              <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>Gentle transport:</strong> Use a flat board or rigid blanket stretcher for suspected spinal injury or fractured limbs.
              </li>
              <li className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <strong>Heatstroke protocol:</strong> Apply cool (never ice-cold) tap water to paws and groin; transport with AC on full blast.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
