"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getVeterinarianById, updateVetProfile } from "@/lib/firebase/firestore";
import { Veterinarian } from "@/lib/types";
import { 
  UserCog, 
  Award, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Save, 
  Stethoscope,
  Building
} from "lucide-react";

export default function VetProfilePage() {
  const { user } = useAuth();
  const [vet, setVet] = useState<Veterinarian | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [consultationFee, setConsultationFee] = useState(2500);
  const [experienceYears, setExperienceYears] = useState(10);
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const vetId = user?.uid || "vet_01";
      const data = await getVeterinarianById(vetId);
      if (data) {
        setVet(data);
        setDisplayName(data.displayName);
        setSpecialty(data.specialty);
        setLicenseNumber(data.licenseNumber);
        setClinicName(data.clinicName);
        setClinicAddress(data.clinicAddress);
        setConsultationFee(data.consultationFee);
        setExperienceYears(data.experienceYears);
        setBio(data.bio);
        setPhotoURL(data.photoURL || "");
      }
      setIsLoading(false);
    }
    load();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const vetId = user?.uid || "vet_01";
    await updateVetProfile(vetId, {
      displayName,
      specialty,
      licenseNumber,
      clinicName,
      clinicAddress,
      consultationFee: Number(consultationFee),
      experienceYears: Number(experienceYears),
      bio,
      photoURL,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  if (isLoading) {
    return <div className="py-12 text-center text-slate-400 text-xs">Loading clinical profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Veterinary Practitioner Profile</h2>
          <p className="text-xs text-slate-500">
            Keep your public credentials, clinical specialties, consultation rates, and bio up-to-date.
          </p>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoURL || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"}
              alt="Doctor portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Avatar Image URL</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Full Practitioner Title</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">State Board License #</label>
            <input
              type="text"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Clinical Specialty</label>
            <input
              type="text"
              required
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Years in Practice</label>
            <input
              type="number"
              min="0"
              required
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Clinic Hospital Affiliation</label>
            <input
              type="text"
              required
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Consultation Fee ($ USD)</label>
            <input
              type="number"
              min="0"
              required
              value={consultationFee}
              onChange={(e) => setConsultationFee(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
            />
          </div>
        </div>

        <div className="text-xs">
          <label className="block font-bold text-slate-700 uppercase mb-1">Clinic Address & Suite</label>
          <input
            type="text"
            required
            value={clinicAddress}
            onChange={(e) => setClinicAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="text-xs">
          <label className="block font-bold text-slate-700 uppercase mb-1">Professional Bio</label>
          <textarea
            rows={4}
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 resize-none leading-relaxed"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Update Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
}
