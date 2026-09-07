"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getDashboardMetrics, 
  getAllAppointments, 
  getAllVeterinarians, 
  getAllUsers,
  getAllReviews 
} from "@/lib/firebase/firestore";
import { DashboardMetrics, Appointment, Veterinarian, UserProfile, Review } from "@/lib/types";
import { 
  Users, 
  Stethoscope, 
  PawPrint, 
  Calendar, 
  Star, 
  ShieldAlert, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Syringe,
  FileText
} from "lucide-react";
import { formatDateTime, getStatusBadgeClass } from "@/lib/utils";

export default function AdminOverviewPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const [m, apts, v, u, r] = await Promise.all([
          getDashboardMetrics("admin"),
          getAllAppointments(),
          getAllVeterinarians(),
          getAllUsers(),
          getAllReviews(),
        ]);
        setMetrics(m);
        setAppointments(apts);
        setVets(v);
        setUsers(u);
        setReviews(r);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const pendingVets = vets.filter(v => !v.isApproved);

  return (
    <div className="space-y-8">
      {/* 6 Executive KPIs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pet Owners</span>
            <Users className="w-5 h-5 text-brand-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{metrics?.totalUsers ?? 0}</p>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">Verified Accounts</span>
        </div>

        {/* Total Vets */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Veterinarians</span>
            <Stethoscope className="w-5 h-5 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{metrics?.totalVets ?? 0}</p>
          <span className="text-[10px] text-brand-600 font-semibold block mt-1">Staff Clinicians</span>
        </div>

        {/* Total Pets */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Pets</span>
            <PawPrint className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{metrics?.totalPets ?? 0}</p>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">Registered Dossiers</span>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Upcoming Visits</span>
            <Calendar className="w-5 h-5 text-brand-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{metrics?.upcomingAppointmentsCount ?? 0}</p>
          <span className="text-[10px] text-brand-600 font-semibold block mt-1">Active Queue</span>
        </div>

        {/* Vaccine Alerts */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Booster Alerts</span>
            <Syringe className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold text-rose-600 mt-2">{metrics?.vaccinationAlertsCount ?? 0}</p>
          <span className="text-[10px] text-rose-500 font-semibold block mt-1">Due / Overdue</span>
        </div>

        {/* Rating Overview */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Satisfaction</span>
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{metrics?.averageRating ?? 5.0}</p>
          <span className="text-[10px] text-amber-600 font-semibold block mt-1">{reviews.length} Client Reviews</span>
        </div>
      </div>

      {/* Main Grid: Pending Approvals Alert + Global Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Global Schedule */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Hospital-Wide Appointments Stream</h2>
              <p className="text-xs text-slate-500">Live feed of all veterinary consultations across departments.</p>
            </div>
            <Link
              href="/admin-dashboard/appointments"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {appointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{apt.petName} ({apt.petSpecies})</span>
                    <span className="text-xs text-slate-400">• Doctor: {apt.vetName}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{apt.serviceType}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDateTime(apt.dateTime)}
                  </p>
                </div>

                <div className="text-xs text-slate-500">
                  <span>Parent: <strong>{apt.ownerName}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Pending Vet Approvals & Reviews Overview */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending Vet Approvals */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Doctor Approvals</span>
              </h3>
              <Link
                href="/admin-dashboard/veterinarians"
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Manage
              </Link>
            </div>

            {pendingVets.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                All veterinarians verified & active!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingVets.map((pv) => (
                  <div key={pv.uid} className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                    <p className="font-bold text-amber-950">{pv.displayName}</p>
                    <p className="text-amber-800 text-[11px]">{pv.specialty} • License: {pv.licenseNumber}</p>
                    <Link
                      href="/admin-dashboard/veterinarians"
                      className="inline-block pt-1 text-[11px] font-bold text-brand-700 hover:underline"
                    >
                      Review Credentials &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Overview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Recent Reviews</span>
              </h3>
              <Link
                href="/admin-dashboard/reviews"
                className="text-xs font-semibold text-brand-600 hover:underline"
              >
                Moderate
              </Link>
            </div>

            <div className="space-y-3">
              {reviews.slice(0, 3).map((r) => (
                <div key={r.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{r.ownerName}</span>
                    <span className="text-amber-500 font-bold">★ {r.rating}.0</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 italic">&ldquo;{r.comment}&rdquo;</p>
                  <p className="text-[10px] text-slate-400">For {r.vetName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
