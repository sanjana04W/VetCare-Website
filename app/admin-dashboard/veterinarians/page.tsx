"use client";

import React, { useState, useEffect } from "react";
import { getAllVeterinarians, updateVeterinarianApproval, updateUserStatus } from "@/lib/firebase/firestore";
import { Veterinarian } from "@/lib/types";
import { 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Award, 
  MapPin, 
  DollarSign,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

export default function AdminVetsPage() {
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [search, setSearch] = useState("");
  const [filterApproval, setFilterApproval] = useState<"All" | "Approved" | "Pending">("All");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllVeterinarians();
      setVets(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleApproval = async (vet: Veterinarian) => {
    const nextApproved = !vet.isApproved;
    await updateVeterinarianApproval(vet.uid, nextApproved);
    loadData();
  };

  const handleToggleStatus = async (vet: Veterinarian) => {
    const nextStatus = vet.status === "active" ? "deactivated" : "active";
    await updateUserStatus(vet.uid, nextStatus);
    loadData();
  };

  const filtered = vets.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch =
      v.displayName.toLowerCase().includes(q) ||
      v.specialty.toLowerCase().includes(q) ||
      v.licenseNumber.toLowerCase().includes(q) ||
      v.clinicName.toLowerCase().includes(q);

    const matchApproval =
      filterApproval === "All"
        ? true
        : filterApproval === "Approved"
        ? v.isApproved
        : !v.isApproved;

    return matchSearch && matchApproval;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Hospital Staff Veterinarians</h2>
          <p className="text-xs text-slate-500">
            Verify medical board licenses, approve onboarding doctors, and manage clinical privileges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by doctor or license..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1">
            {(["All", "Approved", "Pending"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterApproval(tab)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  filterApproval === tab
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Vets */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading doctors...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Veterinarians Match Filter</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((vet) => (
            <div
              key={vet.uid}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vet.photoURL || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"}
                    alt={vet.displayName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                      vet.isApproved ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    }`}>
                      {vet.isApproved ? "Verified & Approved" : "Pending Approval"}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      {vet.specialty}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{vet.displayName}</h3>
                    <p className="text-xs text-slate-500 font-mono">License: {vet.licenseNumber}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Rating</span>
                      <span className="font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {vet.rating} ({vet.reviewCount})
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Rate</span>
                      <span className="font-bold text-slate-900">${vet.consultationFee} / Visit</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 flex items-start gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{vet.clinicName}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleApproval(vet)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 ${
                    vet.isApproved
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{vet.isApproved ? "Revoke Approval" : "Approve Doctor"}</span>
                </button>

                <button
                  onClick={() => handleToggleStatus(vet)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    vet.status === "active"
                      ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                      : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {vet.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
