"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getPetsByOwner, 
  getMedicalRecordsByPet, 
  getVaccinationsByPet 
} from "@/lib/firebase/firestore";
import { Pet, MedicalRecord, VaccinationRecord } from "@/lib/types";
import { 
  FileText, 
  Syringe, 
  Calendar, 
  Clock, 
  Pill, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Stethoscope,
  ChevronRight
} from "lucide-react";
import { formatDate, getStatusBadgeClass } from "@/lib/utils";

export default function RecordsPortalPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"vaccines" | "clinical">("vaccines");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPets() {
      if (!user) return;
      setIsLoading(true);
      try {
        const userPets = await getPetsByOwner(user.uid);
        setPets(userPets);
        if (userPets.length > 0) {
          setSelectedPetId(userPets[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadPets();
  }, [user]);

  useEffect(() => {
    async function loadRecords() {
      if (!selectedPetId) return;
      const [recs, vacs] = await Promise.all([
        getMedicalRecordsByPet(selectedPetId),
        getVaccinationsByPet(selectedPetId)
      ]);
      setMedicalRecords(recs);
      setVaccinations(vacs);
    }
    loadRecords();
  }, [selectedPetId]);

  const currentPet = pets.find(p => p.id === selectedPetId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Health Dossier & Immunizations</h2>
          <p className="text-xs text-slate-500">Official veterinary clinical records, prescriptions, and booster timelines.</p>
        </div>

        {/* Pet Switcher */}
        {pets.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Patient:</span>
            <select
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-xs"
            >
              {pets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.species})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Sub tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab("vaccines")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "vaccines"
              ? "border-brand-600 text-brand-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>Vaccination Passport ({vaccinations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("clinical")}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === "clinical"
              ? "border-brand-600 text-brand-700"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Clinical Consultations ({medicalRecords.length})</span>
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading health history...</div>
      ) : !currentPet ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <p className="text-slate-600 text-sm">Please register a pet first to view health dossiers.</p>
        </div>
      ) : activeTab === "vaccines" ? (
        <div className="space-y-4">
          {vaccinations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Syringe className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-medium text-sm">No vaccination records logged for {currentPet.name}.</p>
              <p className="text-slate-400 text-xs mt-1">Vaccinations logged by your doctor will automatically display here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vaccinations.map((vac) => {
                const statusBadge = vac.status === "valid"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : vac.status === "due"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : "bg-rose-100 text-rose-800 border-rose-200";

                return (
                  <div
                    key={vac.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{vac.vaccineName}</h4>
                        <p className="text-xs text-slate-500">Batch Lot: {vac.batchNumber}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusBadge}`}>
                        {vac.status === 'valid' ? 'Protected' : vac.status === 'due' ? 'Due Soon' : 'Booster Overdue'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Date Given</span>
                        <span className="font-semibold text-slate-800">{formatDate(vac.dateAdministered)}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Next Booster Due</span>
                        <span className={`font-semibold ${vac.status === 'overdue' ? 'text-rose-600' : 'text-slate-800'}`}>
                          {formatDate(vac.nextDueDate)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
                      <span>Administered by {vac.vetName}</span>
                      {vac.notes && <span className="text-[11px] italic text-slate-400">{vac.notes}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {medicalRecords.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-medium text-sm">No clinical consultation records logged yet for {currentPet.name}.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {medicalRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider">
                        Clinical Consultation
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                        {rec.diagnosis}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Attending Doctor: {rec.vetName} • Weight at visit: {rec.weightAtVisit} kg
                      </p>
                    </div>

                    <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 self-start sm:self-auto">
                      Visit Date: {formatDate(rec.visitDate)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Presenting Symptoms:</p>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                        {rec.symptoms}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">Administered Treatment:</p>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                        {rec.treatment}
                      </p>
                    </div>
                  </div>

                  {/* Prescriptions */}
                  {rec.prescriptions && rec.prescriptions.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-brand-600" />
                        <span>Prescribed Medications & Dosages</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {rec.prescriptions.map((rx, idx) => (
                          <div key={idx} className="p-3 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs space-y-1">
                            <p className="font-bold text-brand-900 text-sm">{rx.medicationName}</p>
                            <p className="text-brand-800">
                              <span className="font-semibold">Dosage:</span> {rx.dosage} • {rx.frequency} ({rx.duration})
                            </p>
                            <p className="text-slate-600 italic mt-1">{rx.instructions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lab Results / Notes */}
                  {rec.labResults && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <p className="font-bold text-slate-800 uppercase text-[10px]">Diagnostics & Lab Findings:</p>
                      <p className="text-slate-600">{rec.labResults}</p>
                    </div>
                  )}

                  {rec.followUpDate && (
                    <div className="text-xs text-brand-800 bg-brand-50/60 p-2.5 rounded-xl border border-brand-100 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>Recommended Follow-up Visit: <strong>{formatDate(rec.followUpDate)}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
