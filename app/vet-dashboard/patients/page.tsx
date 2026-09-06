"use client";

import React, { useState, useEffect } from "react";
import { 
  getAllPets, 
  getAllMedicalRecords, 
  getAllVaccinations 
} from "@/lib/firebase/firestore";
import { Pet, MedicalRecord, VaccinationRecord } from "@/lib/types";
import { 
  PawPrint, 
  Search, 
  User, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Syringe, 
  X, 
  Calendar,
  AlertCircle
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function VetPatientsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [petRecords, setPetRecords] = useState<MedicalRecord[]>([]);
  const [petVaccines, setPetVaccines] = useState<VaccinationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const allPets = await getAllPets();
        setPets(allPets);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleSelectPet = async (pet: Pet) => {
    setSelectedPet(pet);
    const [allRecs, allVacs] = await Promise.all([
      getAllMedicalRecords(),
      getAllVaccinations()
    ]);
    setPetRecords(allRecs.filter(r => r.petId === pet.id));
    setPetVaccines(allVacs.filter(v => v.petId === pet.id));
  };

  const filteredPets = pets.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.species.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      (p.microchipNumber && p.microchipNumber.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Patient Registry</h2>
          <p className="text-xs text-slate-500">
            Comprehensive companion dossiers, medical histories, and active vaccination statuses.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, owner, or chip..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />
        </div>
      </div>

      {/* Patients Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading patient directory...</div>
      ) : filteredPets.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <PawPrint className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Patients Found</h3>
          <p className="text-xs text-slate-500 mt-1">No registered pets match your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pet.photoURL || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white">
                    {pet.species} • {pet.breed}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">{pet.name}</h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pet.gender}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Age</span>
                      <span className="font-semibold text-slate-800">{pet.age} Years</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Weight</span>
                      <span className="font-semibold text-slate-800">{pet.weight} kg</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                    <p className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Owner: <strong className="text-slate-800">{pet.ownerName}</strong></span>
                    </p>
                    {pet.microchipNumber && (
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                        <span className="truncate">Chip: {pet.microchipNumber}</span>
                      </p>
                    )}
                  </div>

                  {pet.allergies && pet.allergies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {pet.allergies.map((a, i) => (
                        <span key={i} className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 mt-2">
                <button
                  onClick={() => handleSelectPet(pet)}
                  className="w-full py-2 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Inspect Clinical Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Dossier Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-brand-800 to-teal-700 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-200 tracking-wider">Clinical Dossier</span>
                <h3 className="text-xl font-bold">{selectedPet.name} ({selectedPet.species} • {selectedPet.breed})</h3>
              </div>
              <button
                onClick={() => setSelectedPet(null)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Vitals Summary */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Gender</span>
                  <span className="font-semibold text-slate-800">{selectedPet.gender}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Age</span>
                  <span className="font-semibold text-slate-800">{selectedPet.age} Years</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Weight</span>
                  <span className="font-semibold text-slate-800">{selectedPet.weight} kg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Owner</span>
                  <span className="font-semibold text-slate-800 truncate block">{selectedPet.ownerName}</span>
                </div>
              </div>

              {/* Microchip & Allergies */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <p><strong>Microchip ID:</strong> {selectedPet.microchipNumber || "Not microchipped"}</p>
                <p><strong>Known Allergies:</strong> {selectedPet.allergies?.join(", ") || "None reported"}</p>
                {selectedPet.emergencyContact && (
                  <p><strong>Emergency Contact:</strong> {selectedPet.emergencyContact.name} ({selectedPet.emergencyContact.phone})</p>
                )}
              </div>

              {/* Vaccinations */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Syringe className="w-4 h-4 text-brand-600" />
                  <span>Vaccination History ({petVaccines.length})</span>
                </h4>
                {petVaccines.length === 0 ? (
                  <p className="text-slate-400 italic">No immunizations recorded.</p>
                ) : (
                  <div className="space-y-2">
                    {petVaccines.map((v) => (
                      <div key={v.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{v.vaccineName}</p>
                          <p className="text-slate-500">Given: {formatDate(v.dateAdministered)} • Lot: {v.batchNumber}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                          v.status === 'valid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          Due: {formatDate(v.nextDueDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Consultations */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Clinical Consultations ({petRecords.length})</span>
                </h4>
                {petRecords.length === 0 ? (
                  <p className="text-slate-400 italic">No medical records logged.</p>
                ) : (
                  <div className="space-y-3">
                    {petRecords.map((r) => (
                      <div key={r.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-brand-800">{r.diagnosis}</span>
                          <span className="text-slate-400">{formatDate(r.visitDate)}</span>
                        </div>
                        <p className="text-slate-600"><strong>Symptoms:</strong> {r.symptoms}</p>
                        <p className="text-slate-600"><strong>Treatment:</strong> {r.treatment}</p>
                        {r.prescriptions && r.prescriptions.length > 0 && (
                          <div className="bg-slate-50 p-2 rounded-xl text-[11px] text-slate-700">
                            <strong>Rx:</strong> {r.prescriptions.map(p => `${p.medicationName} (${p.dosage})`).join(", ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50">
              <button
                onClick={() => setSelectedPet(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
