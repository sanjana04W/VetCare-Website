"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getAllPets, 
  getAllMedicalRecords, 
  createMedicalRecord 
} from "@/lib/firebase/firestore";
import { Pet, MedicalRecord, Prescription } from "@/lib/types";
import { 
  FileText, 
  Plus, 
  Search, 
  Pill, 
  Trash2, 
  X, 
  CheckCircle2, 
  Calendar,
  User,
  Stethoscope
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function VetMedicalRecordsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedPetId, setSelectedPetId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [weightAtVisit, setWeightAtVisit] = useState(15.0);
  const [labResults, setLabResults] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { medicationName: "", dosage: "", frequency: "Once daily", duration: "7 days", instructions: "" }
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allPets, allRecs] = await Promise.all([
        getAllPets(),
        getAllMedicalRecords()
      ]);
      setPets(allPets);
      if (allPets.length > 0 && !selectedPetId) {
        setSelectedPetId(allPets[0].id);
      }
      setRecords(allRecs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setVisitDate(new Date().toISOString().split("T")[0]);
  }, []);

  const addPrescriptionRow = () => {
    setPrescriptions([
      ...prescriptions,
      { medicationName: "", dosage: "", frequency: "Once daily", duration: "7 days", instructions: "" }
    ]);
  };

  const removePrescriptionRow = (idx: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  const updatePrescription = (idx: number, field: keyof Prescription, val: string) => {
    const updated = [...prescriptions];
    updated[idx] = { ...updated[idx], [field]: val };
    setPrescriptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pet = pets.find(p => p.id === selectedPetId);
    if (!pet) return;

    const validPrescriptions = prescriptions.filter(p => p.medicationName.trim().length > 0);

    await createMedicalRecord({
      petId: pet.id,
      petName: pet.name,
      ownerId: pet.ownerId,
      vetId: user?.uid || "vet_01",
      vetName: user?.displayName || "Dr. Sarah Jenkins, DVM",
      visitDate: new Date(visitDate).toISOString(),
      symptoms,
      diagnosis,
      treatment,
      prescriptions: validPrescriptions,
      weightAtVisit: Number(weightAtVisit),
      labResults: labResults || undefined,
      followUpDate: followUpDate || undefined,
    });

    setIsModalOpen(false);
    // Reset fields
    setSymptoms("");
    setDiagnosis("");
    setTreatment("");
    setLabResults("");
    setFollowUpDate("");
    setPrescriptions([{ medicationName: "", dosage: "", frequency: "Once daily", duration: "7 days", instructions: "" }]);
    loadData();
  };

  const filtered = records.filter(r => 
    r.petName.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
    r.treatment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clinical Medical Dossiers</h2>
          <p className="text-xs text-slate-500">Record diagnostic assessments, treatments, and electronic prescriptions.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation Log</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter records by diagnosis or patient..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {filtered.length} Records Logged
        </span>
      </div>

      {/* Records List */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading medical records...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Clinical Records Found</h3>
          <p className="text-xs text-slate-500 mt-1">Log your first veterinary medical consultation record.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{rec.diagnosis}</h3>
                    <p className="text-xs text-slate-500">
                      Patient: <strong className="text-brand-700">{rec.petName}</strong> • Attending: {rec.vetName} • {rec.weightAtVisit} kg
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 self-start sm:self-auto">
                  {formatDate(rec.visitDate)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Exam Findings / Symptoms:</span>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    {rec.symptoms}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Clinical Treatment Given:</span>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    {rec.treatment}
                  </p>
                </div>
              </div>

              {rec.prescriptions && rec.prescriptions.length > 0 && (
                <div className="pt-2">
                  <p className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-brand-600" />
                    <span>Electronic Prescriptions</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rec.prescriptions.map((p, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs">
                        <p className="font-bold text-brand-900">{p.medicationName} ({p.dosage})</p>
                        <p className="text-[11px] text-slate-600">{p.frequency} • {p.duration}</p>
                        {p.instructions && <p className="text-[11px] italic text-slate-500 mt-0.5">{p.instructions}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rec.labResults && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Diagnostics / Lab:</strong> {rec.labResults}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Record Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-brand-700 text-white p-6 flex items-center justify-between">
              <h3 className="font-bold text-lg">Log Clinical Medical Consultation</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase mb-1">Select Patient</label>
                  <select
                    value={selectedPetId}
                    onChange={(e) => {
                      setSelectedPetId(e.target.value);
                      const p = pets.find(pet => pet.id === e.target.value);
                      if (p) setWeightAtVisit(p.weight);
                    }}
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
                  <label className="block font-bold text-slate-700 uppercase mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={weightAtVisit}
                    onChange={(e) => setWeightAtVisit(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Primary Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acute Allergic Dermatitis, Grade 1 Dental Tartar, Otitis Externa"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Presenting Symptoms / History</label>
                  <textarea
                    rows={3}
                    required
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Patient presentation, duration, physical vitals..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Treatment & Interventions</label>
                  <textarea
                    rows={3}
                    required
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    placeholder="Clinical procedures performed, fluids, injections..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none"
                  />
                </div>
              </div>

              {/* Prescriptions */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-brand-600" />
                    <span>Prescriptions (Rx)</span>
                  </label>
                  <button
                    type="button"
                    onClick={addPrescriptionRow}
                    className="text-[11px] font-bold text-brand-700 hover:underline"
                  >
                    + Add Medication
                  </button>
                </div>

                {prescriptions.map((rx, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Medication Name (e.g. Amoxicillin)"
                        value={rx.medicationName}
                        onChange={(e) => updatePrescription(idx, "medicationName", e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g. 250 mg tab)"
                        value={rx.dosage}
                        onChange={(e) => updatePrescription(idx, "dosage", e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Frequency (e.g. BID / twice daily)"
                        value={rx.frequency}
                        onChange={(e) => updatePrescription(idx, "frequency", e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Instructions (e.g. Give with food, keep refrigerated)"
                        value={rx.instructions}
                        onChange={(e) => updatePrescription(idx, "instructions", e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px]"
                      />
                      {prescriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePrescriptionRow(idx)}
                          className="p-1.5 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lab & Follow Up */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Lab Results (Optional)</label>
                  <input
                    type="text"
                    value={labResults}
                    onChange={(e) => setLabResults(e.target.value)}
                    placeholder="e.g. CBC/Chem normal; Cytology yeast negative"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Recommended Follow-Up Date</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
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
                  Save Consultation Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
