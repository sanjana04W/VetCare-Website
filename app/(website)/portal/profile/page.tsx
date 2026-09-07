"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Save,
  Camera
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhoneNumber(user.phoneNumber || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      user.displayName = displayName;
      user.phoneNumber = phoneNumber;
      user.photoURL = photoURL;
      try {
        localStorage.setItem("pawpulse_current_user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Personal Profile & Account Settings</h2>
          <p className="text-xs text-slate-500">
            Manage your personal contact details, display name, and communication preferences.
          </p>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-50 border-2 border-brand-200 flex items-center justify-center text-brand-700 font-bold text-xl shrink-0">
            {photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              displayName?.charAt(0) || "U"
            )}
          </div>
          <div className="flex-1 space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase">Profile Photo URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* User Info Fields */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Display Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 outline-none cursor-not-allowed"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Email address cannot be changed directly.</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+94 77 000 0000"
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Account Details Badges */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Role</span>
            <span className="font-semibold text-slate-800 capitalize">{user?.role || "Pet Owner"}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Member Since</span>
            <span className="font-semibold text-slate-800">
              {user?.createdAt ? formatDate(user.createdAt) : "Active Member"}
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
