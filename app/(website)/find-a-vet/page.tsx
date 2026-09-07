"use client";

import React, { useState, useEffect } from "react";
import { getAllVeterinarians } from "@/lib/firebase/firestore";
import { SEED_VETS } from "@/lib/firebase/seed";
import { Veterinarian } from "@/lib/types";
import { BookingModal } from "@/website/components/BookingModal";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Phone
} from "lucide-react";

export default function FindAVetPage() {
  const [vets, setVets] = useState<Veterinarian[]>(() => SEED_VETS.filter(v => v.isApproved));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedDay, setSelectedDay] = useState<number | "All">("All");
  const [sortBy, setSortBy] = useState<"rating" | "experience" | "fee">("rating");
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllVeterinarians();
        if (data && data.length > 0) {
          setVets(data.filter(v => v.isApproved));
        }
      } catch (e) {
        console.warn("FindAVetPage load fallback active:", e);
      }
    }
    load();
  }, []);

  const specialties = [
    "All",
    "Canine & Feline Internal Medicine",
    "Orthopedic & Soft Tissue Surgery",
    "Exotic Animals & Avian Specialist",
    "Emergency Medicine & Critical Care",
    "Advanced Radiology & Diagnostic Imaging",
    "Dermatology & Allergy Medicine",
    "Veterinary Dentistry & Oral Surgery",
    "Cardiology & Vascular Medicine",
  ];

  const daysOfWeek = [
    { label: "All Days", value: "All" },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];

  const filteredVets = vets
    .filter((vet) => {
      const matchSearch =
        vet.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.clinicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSpecialty =
        selectedSpecialty === "All" || vet.specialty.includes(selectedSpecialty);

      const matchDay =
        selectedDay === "All" ||
        (vet.availability?.daysOfWeek && vet.availability.daysOfWeek.includes(selectedDay as number));

      return matchSearch && matchSpecialty && matchDay;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experienceYears - a.experienceYears;
      if (sortBy === "fee") return a.consultationFee - b.consultationFee;
      return 0;
    });

  const handleBook = (vet: Veterinarian) => {
    setSelectedVet(vet);
    setIsBookingOpen(true);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-fade-in text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Medical Faculty Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Find the Ideal Veterinarian for Your Pet
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Search our credentialed veterinarians, view hospital locations, check verified patient reviews, and schedule appointments online.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-scale-up bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, hospital, or keywords..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
              />
            </div>

            {/* Specialty Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700"
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Specialties" : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Availability Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDay}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedDay(val === "All" ? "All" : Number(val));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700"
              >
                {daysOfWeek.map((d) => (
                  <option key={d.label} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "experience" | "fee")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700 font-medium"
              >
                <option value="rating">Sort: Top Rated</option>
                <option value="experience">Sort: Experience</option>
                <option value="fee">Sort: Consultation Fee</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredVets.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-base">No veterinarians match your current search filters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialty("All");
                setSelectedDay("All");
              }}
              className="mt-3 px-4 py-2 bg-brand-50 text-brand-700 font-semibold rounded-xl text-xs hover:bg-brand-100 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVets.map((vet, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <div
                key={vet.uid}
                className={`reveal-scale-up ${delays[idx % delays.length]} bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={vet.photoURL || "/images/vets/dr-sarah-jenkins.jpg"}
                      alt={vet.displayName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/vets/dr-sarah-jenkins.jpg";
                      }}
                      className="w-full h-full object-cover object-[center_15%]"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{vet.rating}</span>
                      <span className="text-slate-400 font-normal">({vet.reviewCount})</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>License: {vet.licenseNumber}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wide">
                        {vet.specialty}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                        {vet.displayName}
                      </h2>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vet.experienceYears} Years Clinical Experience</span>
                      </p>
                    </div>

                    <div className="pt-2 text-xs text-slate-600 space-y-1.5 border-t border-slate-100">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{vet.clinicName} • {vet.clinicAddress}</span>
                      </div>
                    </div>

                    {/* Available Days Badges */}
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Weekly Office Hours:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {vet.availability?.daysOfWeek?.map((dayIdx) => (
                          <span
                            key={dayIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {dayNames[dayIdx]}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 line-clamp-3">
                      {vet.bio}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div className="pt-4">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Consultation Fee
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      Rs. {vet.consultationFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => handleBook(vet)}
                      className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </section>

      {/* Booking Modal */}
      <BookingModal
        initialVet={selectedVet}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
