"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getAllPets, 
  getAllVaccinations, 
  createVaccinationRecord 
} from "@/lib/firebase/firestore";
import { Pet, VaccinationRecord } from "@/lib/types";
import { 
  Syringe, 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  X, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const COMMON_VACCINES = [
  "Rabies 3-Year Core Vaccine",
  "Rabies 1-Year Core Vaccine",
  "DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)",
  "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)",
  "Bordetella Bronchiseptica (Kennel Cough)",
  "Leptospirosis 4-Way Vaccine",
  "Feline Leukemia Virus (FeLV)",
  "Lyme Borreliosis Vaccine",
  "RHDV2 (Rabbit Hemorrhagic Disease Virus)",
];

export default function VetVaccinationsPage() {
  const { user } = useAuth();
  const [vaccines, setVaccines] = useState<VaccinationRecord[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedPetId, setSelectedPetId] = useState("");
  const [vaccineName, setVaccineName] = useState(COMMON_VACCINES[0]);
  const [batchNumber, setBatchNumber] = useState("");
  const [dateAdministered, setDateAdministered] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allPets, allVacs] = await Promise.all([
        getAllPets(),
        getAllVaccinations(),
      ]);
      setPets(allPets);
      if (allPets.length > 0 && !selectedPetId) {
        setSelectedPetId(allPets[0].id);
      }
      setVaccines(allVacs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const today = new Date().toISOString().split("T")[0];
    setDateAdministered(today);

    // Default next due date: 1 year from today
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    setNextDueDate(nextYear.toISOString().split("T")[0]);
  }, []);

  const setDueYears = (years: number) => {
    const d = new Date(dateAdministered || new Date());
    d.setFullYear(d.getFullYear() + years);
    setNextDueDate(d.toISOString().split("T")[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pet = pets.find(p => p.id === selectedPetId);
    if (!pet) return;

    await createVaccinationRecord({
      petId: pet.id,
      petName: pet.name,
      ownerId: pet.ownerId,
      vetId: user?.uid || "vet_01",
      vetName: user?.displayName || "Dr. Sarah Jenkins, DVM",
      vaccineName,
      batchNumber: batchNumber || `LOT-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
      dateAdministered,
      nextDueDate,
      notes: notes || undefined,
    });

    setIsModalOpen(false);
    setNotes("");
    setBatchNumber("");
    loadData();
  };

  const filtered = vaccines.filter(v => {
    const matchSearch =
      v.petName.toLowerCase().includes(search.toLowerCase()) ||
      v.vaccineName.toLowerCase().includes(search.toLowerCase()) ||
      v.batchNumber.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "All" || v.status === filterStatus.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Vaccine & Immunization Management</h2>
          <p className="text-xs text-slate-500">
            Log serial batch numbers, calculate booster expirations, and notify pet parents.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Administer Vaccination</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient, vaccine, or batch..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {["All", "Valid", "Due", "Overdue"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterStatus === st
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading immunizations...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Syringe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Immunizations Found</h3>
          <p className="text-xs text-slate-500 mt-1">Administer and record companion booster shots.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((v) => {
            const statusClass =
              v.status === "valid"
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : v.status === "due"
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-rose-100 text-rose-800 border-rose-200";

            return (
              <div
                key={v.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                      {v.petName}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${statusClass}`}>
                      {v.status === 'valid' ? 'Current' : v.status === 'due' ? 'Due Soon' : 'Overdue'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{v.vaccineName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">Lot: {v.batchNumber}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Administered</span>
                      <span className="font-semibold text-slate-800">{formatDate(v.dateAdministered)}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Booster</span>
                      <span className={`font-semibold ${v.status === 'overdue' ? 'text-rose-600' : 'text-slate-800'}`}>
                        {formatDate(v.nextDueDate)}
                      </span>
                    </div>
                  </div>

                  {v.notes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-xl border border-slate-100">
                      {v.notes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Practitioner: {v.vetName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Administer Vaccine Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-brand-700 text-white p-6 flex items-center justify-between">
              <h3 className="font-bold text-lg">Record Administered Vaccination</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Select Patient</label>
                <select
                  value={selectedPetId}
                  onChange={(e) => setSelectedPetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 font-semibold"
                  required
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.species} • Owner: {p.ownerName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Vaccine Formulation</label>
                <select
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 font-medium"
                >
                  {COMMON_VACCINES.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Batch / Manufacturer Lot #</label>
                <input
                  type="text"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  placeholder="e.g. DEF-RAB-9921 (Leave blank to auto-generate)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Administered Date</label>
                  <input
                    type="date"
                    required
                    value={dateAdministered}
                    onChange={(e) => setDateAdministered(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Next Booster Due</label>
                  <input
                    type="date"
                    required
                    value={nextDueDate}
                    onChange={(e) => setNextDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Quick helper buttons for expiration */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-semibold">Booster Term:</span>
                <button
                  type="button"
                  onClick={() => setDueYears(1)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                >
                  +1 Year Booster
                </button>
                <button
                  type="button"
                  onClick={() => setDueYears(3)}
                  className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                >
                  +3 Year Core Rabies
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Injection Site & Tolerance Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Right rear limb subcutaneous injection; well tolerated; no immediate adverse reaction."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs transition"
                >
                  Save Vaccine Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
