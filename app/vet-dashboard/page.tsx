"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getDashboardMetrics, 
  getAppointmentsByVet, 
  getAllMedicalRecords, 
  getAllVaccinations,
  updateAppointmentStatus
} from "@/lib/firebase/firestore";
import { Appointment, MedicalRecord, VaccinationRecord, DashboardMetrics } from "@/lib/types";
import { 
  PawPrint, 
  Calendar, 
  FileText, 
  Syringe, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  User,
  Stethoscope
} from "lucide-react";
import { formatDateTime, formatDate, getStatusBadgeClass } from "@/lib/utils";

export default function VetDashboardOverview() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [vaccines, setVaccines] = useState<VaccinationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const vetId = user?.uid || "vet_01";
      const [m, apts, recs, vacs] = await Promise.all([
        getDashboardMetrics("veterinarian", vetId),
        getAppointmentsByVet(vetId),
        getAllMedicalRecords(),
        getAllVaccinations()
      ]);
      setMetrics(m);
      setAppointments(apts);
      setMedicalRecords(recs.filter(r => r.vetId === vetId).slice(0, 4));
      setVaccines(vacs.filter(v => v.status === "due" || v.status === "overdue").slice(0, 4));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleStatusChange = async (aptId: string, status: any) => {
    await updateAppointmentStatus(aptId, status);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Patients
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {metrics?.totalPets ?? 0}
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              Active Registered Pets
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <PawPrint className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Upcoming Visits
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {metrics?.upcomingAppointmentsCount ?? 0}
            </p>
            <span className="text-[11px] text-brand-600 font-semibold flex items-center gap-1 mt-1">
              Confirmed & Pending
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Recent Consults
            </span>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">
              {metrics?.recentRecordsCount ?? 0}
            </p>
            <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mt-1">
              Clinical Medical Logs
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Vaccine Alerts
            </span>
            <p className="text-3xl font-extrabold text-rose-600 mt-1">
              {metrics?.vaccinationAlertsCount ?? 0}
            </p>
            <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
              Due / Overdue Boosters
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Syringe className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Queue + Recent Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Appointments Queue */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Appointment Queue</h2>
              <p className="text-xs text-slate-500">Upcoming clinical consults and action statuses.</p>
            </div>
            <Link
              href="/vet-dashboard/appointments"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {appointments.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No scheduled visits in queue.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.slice(0, 5).map((apt) => (
                <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{apt.petName} ({apt.petSpecies})</span>
                      <span className="text-xs text-slate-400">• Owner: {apt.ownerName}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{apt.serviceType}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDateTime(apt.dateTime)} ({apt.durationMinutes} mins)
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {apt.status === "pending" && (
                      <button
                        onClick={() => handleStatusChange(apt.id, "confirmed")}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status === "confirmed" && (
                      <button
                        onClick={() => handleStatusChange(apt.id, "in-progress")}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition"
                      >
                        Start Consult
                      </button>
                    )}
                    {apt.status === "in-progress" && (
                      <button
                        onClick={() => handleStatusChange(apt.id, "completed")}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition"
                      >
                        Complete
                      </button>
                    )}
                    {apt.status !== "cancelled" && apt.status !== "completed" && (
                      <button
                        onClick={() => handleStatusChange(apt.id, "cancelled")}
                        className="px-2.5 py-1.5 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-lg text-xs transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Alerts & Recent Clinical Dossiers */}
        <div className="lg:col-span-4 space-y-6">
          {/* Vaccination Reminders Tracker */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-rose-500" />
                <span>Immunization Alerts</span>
              </h3>
              <Link
                href="/vet-dashboard/vaccinations"
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                View
              </Link>
            </div>

            {vaccines.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No overdue vaccinations.</p>
            ) : (
              <div className="space-y-3">
                {vaccines.map((v) => (
                  <div key={v.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{v.petName}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        v.status === 'overdue' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{v.vaccineName}</p>
                    <p className="text-[10px] text-slate-400">Due: {formatDate(v.nextDueDate)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Records */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>Recent Medical Logs</span>
              </h3>
              <Link
                href="/vet-dashboard/medical-records"
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                New Log
              </Link>
            </div>

            {medicalRecords.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No clinical logs yet.</p>
            ) : (
              <div className="space-y-3">
                {medicalRecords.map((m) => (
                  <div key={m.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{m.petName}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(m.visitDate)}</span>
                    </div>
                    <p className="text-[11px] text-brand-800 font-semibold truncate">{m.diagnosis}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{m.treatment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
