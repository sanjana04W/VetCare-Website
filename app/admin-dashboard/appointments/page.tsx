"use client";

import React, { useState, useEffect } from "react";
import { 
  getAllAppointments, 
  getAllVeterinarians, 
  updateAppointmentStatus, 
  reassignAppointment 
} from "@/lib/firebase/firestore";
import { Appointment, Veterinarian, AppointmentStatus } from "@/lib/types";
import { 
  Calendar, 
  Search, 
  Clock, 
  User, 
  Stethoscope, 
  RefreshCw, 
  X, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { formatDateTime, getStatusBadgeClass } from "@/lib/utils";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [reassignModalApt, setReassignModalApt] = useState<Appointment | null>(null);
  const [selectedNewVetId, setSelectedNewVetId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [apts, allVets] = await Promise.all([
        getAllAppointments(),
        getAllVeterinarians()
      ]);
      setAppointments(apts);
      setVets(allVets.filter(v => v.isApproved));
      if (allVets.length > 0) setSelectedNewVetId(allVets[0].uid);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancelApt = async (apt: Appointment) => {
    const reason = prompt(`Provide administrative cancellation note for ${apt.petName}'s booking:`);
    if (reason !== null) {
      await updateAppointmentStatus(apt.id, "cancelled", reason || "Cancelled by hospital administration");
      loadData();
    }
  };

  const handleReassignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reassignModalApt) return;
    const targetVet = vets.find(v => v.uid === selectedNewVetId);
    if (!targetVet) return;

    await reassignAppointment(reassignModalApt.id, targetVet.uid, targetVet.displayName);
    setReassignModalApt(null);
    loadData();
  };

  const filtered = appointments.filter((apt) => {
    const q = search.toLowerCase();
    const matchSearch =
      apt.petName.toLowerCase().includes(q) ||
      apt.ownerName.toLowerCase().includes(q) ||
      apt.vetName.toLowerCase().includes(q) ||
      apt.serviceType.toLowerCase().includes(q) ||
      apt.id.toLowerCase().includes(q);

    const matchStatus = filterStatus === "All" || apt.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Hospital Appointment Master Ledger</h2>
          <p className="text-xs text-slate-500">
            Monitor hospital capacity, balance doctor caseloads, reassign specialists, or cancel bookings.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search booking ID, pet, or doctor..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", "Confirmed", "Pending", "In-Progress", "Completed", "Cancelled"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterStatus === st
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Appointments Master Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading master ledger...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No appointments match filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Booking Info</th>
                  <th className="px-6 py-4">Patient (Pet)</th>
                  <th className="px-6 py-4">Pet Parent</th>
                  <th className="px-6 py-4">Assigned Doctor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-[10px] text-slate-400 block">{apt.id}</span>
                      <p className="font-bold text-slate-900 text-xs mt-0.5">{apt.serviceType}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-brand-600" />
                        {formatDateTime(apt.dateTime)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{apt.petName}</p>
                      <span className="text-[10px] text-slate-500">{apt.petSpecies}</span>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{apt.ownerName}</p>
                      <span className="text-[11px] text-slate-400">{apt.ownerPhone}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-brand-600" />
                        <span className="font-bold text-slate-900">{apt.vetName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[180px]">
                        {apt.vetSpecialty}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status !== "completed" && apt.status !== "cancelled" && (
                          <>
                            <button
                              onClick={() => {
                                setReassignModalApt(apt);
                                setSelectedNewVetId(vets[0]?.uid || "");
                              }}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg text-slate-700 font-semibold text-[11px] transition"
                              title="Reassign to another doctor"
                            >
                              Reassign
                            </button>
                            <button
                              onClick={() => handleCancelApt(apt)}
                              className="px-2.5 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg font-semibold text-[11px] transition"
                              title="Cancel consultation"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reassign Modal */}
      {reassignModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-600 tracking-wider">Caseload Rebalance</span>
                <h3 className="font-bold text-slate-900 text-base">Reassign Appointment</h3>
              </div>
              <button
                onClick={() => setReassignModalApt(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <p><strong>Patient:</strong> {reassignModalApt.petName} ({reassignModalApt.petSpecies})</p>
              <p><strong>Service:</strong> {reassignModalApt.serviceType}</p>
              <p><strong>Current Attending:</strong> {reassignModalApt.vetName}</p>
              <p><strong>Date & Time:</strong> {formatDateTime(reassignModalApt.dateTime)}</p>
            </div>

            <form onSubmit={handleReassignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Select New Attending Veterinarian
                </label>
                <select
                  value={selectedNewVetId}
                  onChange={(e) => setSelectedNewVetId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 font-medium"
                >
                  {vets.map((v) => (
                    <option key={v.uid} value={v.uid}>
                      {v.displayName} — {v.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReassignModalApt(null)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition"
                >
                  Confirm Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
