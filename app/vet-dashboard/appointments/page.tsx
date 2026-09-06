"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getAppointmentsByVet, 
  updateAppointmentStatus 
} from "@/lib/firebase/firestore";
import { Appointment, AppointmentStatus } from "@/lib/types";
import { 
  Calendar, 
  Clock, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Play, 
  CheckCheck,
  User,
  Phone,
  Mail,
  AlertCircle
} from "lucide-react";
import { formatDateTime, getStatusBadgeClass } from "@/lib/utils";
import Link from "next/link";

export default function VetAppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const vetId = user?.uid || "vet_01";
      const data = await getAppointmentsByVet(vetId);
      setAppointments(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleStatus = async (id: string, status: AppointmentStatus, rejection?: string) => {
    await updateAppointmentStatus(id, status, rejection);
    loadData();
  };

  const handleDecline = async (apt: Appointment) => {
    const reason = prompt(`Provide a reason for declining ${apt.petName}'s appointment:`);
    if (reason !== null) {
      await handleStatus(apt.id, "cancelled", reason || "Declined by veterinarian schedule conflict");
    }
  };

  const filtered = appointments.filter((apt) => {
    const matchStatus = filter === "All" || apt.status.toLowerCase() === filter.toLowerCase();
    const matchSearch =
      apt.petName.toLowerCase().includes(search.toLowerCase()) ||
      apt.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      apt.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      apt.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Scheduled Appointments Queue</h2>
          <p className="text-xs text-slate-500">
            Review requests, advance clinical consult statuses, and track patient arrivals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/vet-dashboard/medical-records"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl transition shadow-xs"
          >
            + New Medical Record
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by pet, owner, or service..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {["All", "Pending", "Confirmed", "In-Progress", "Completed", "Cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  filter === st
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Cards */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading appointments...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Appointments In Queue</h3>
          <p className="text-xs text-slate-500 mt-1">
            No visits match the current status or search filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getStatusBadgeClass(apt.status)}`}>
                    {apt.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">ID: {apt.id}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-slate-900">
                    {apt.serviceType}
                  </h3>
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md">
                    Patient: {apt.petName} ({apt.petSpecies})
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Parent: {apt.ownerName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {apt.ownerPhone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    {formatDateTime(apt.dateTime)} ({apt.durationMinutes} min)
                  </span>
                </div>

                {apt.notes && (
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-2xl">
                    <strong className="text-slate-700">Patient Symptoms / Notes:</strong> {apt.notes}
                  </p>
                )}

                {apt.rejectionReason && (
                  <p className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-100 max-w-2xl">
                    <strong className="text-rose-800">Status Reason:</strong> {apt.rejectionReason}
                  </p>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {apt.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatus(apt.id, "confirmed")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Request</span>
                    </button>
                    <button
                      onClick={() => handleDecline(apt)}
                      className="px-3 py-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-semibold transition"
                    >
                      Decline
                    </button>
                  </>
                )}

                {apt.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => handleStatus(apt.id, "in-progress")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Begin Consultation</span>
                    </button>
                    <button
                      onClick={() => handleDecline(apt)}
                      className="px-3 py-2 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl text-xs font-semibold transition"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === "in-progress" && (
                  <>
                    <button
                      onClick={() => handleStatus(apt.id, "completed")}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                    <Link
                      href="/vet-dashboard/medical-records"
                      className="px-3 py-2 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-xl text-xs font-semibold transition"
                    >
                      Add Medical Record
                    </Link>
                  </>
                )}

                {apt.status === "completed" && (
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Visit Completed
                  </span>
                )}

                {apt.status === "cancelled" && (
                  <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
