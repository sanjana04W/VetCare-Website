"use client";

import React, { useState, useEffect } from "react";
import { Pet, Veterinarian, Appointment } from "@/lib/types";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getPetsByOwner, createAppointment, getAllVeterinarians } from "@/lib/firebase/firestore";
import { X, Calendar, Clock, Heart, CheckCircle, AlertCircle } from "lucide-react";

interface BookingModalProps {
  initialVet?: Veterinarian | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (apt: Appointment) => void;
}

const SERVICES = [
  { name: "Annual Comprehensive Wellness Exam", duration: 30, fee: 75 },
  { name: "Core Vaccination & Booster (Rabies/DHPP/FVRCP)", duration: 30, fee: 55 },
  { name: "Dental Examination & Tartar Prophylaxis", duration: 45, fee: 95 },
  { name: "Orthopedic & Lameness Evaluation", duration: 45, fee: 110 },
  { name: "Dermatology & Skin Allergy Screening", duration: 30, fee: 80 },
  { name: "Senior Pet Geriatric Vitality Panel", duration: 45, fee: 125 },
  { name: "Urgent Care & Triage Consultation", duration: 30, fee: 90 },
];

export function BookingModal({ initialVet, isOpen, onClose, onSuccess }: BookingModalProps) {
  const { user } = useAuth();
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedVetId, setSelectedVetId] = useState<string>(initialVet?.uid || "");
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [guestPetName, setGuestPetName] = useState("");
  const [guestPetSpecies, setGuestPetSpecies] = useState("Dog");
  const [service, setService] = useState(SERVICES[0].name);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successApt, setSuccessApt] = useState<Appointment | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const allVets = await getAllVeterinarians();
      setVets(allVets.filter(v => v.isApproved));
      if (initialVet) {
        setSelectedVetId(initialVet.uid);
      } else if (allVets.length > 0) {
        setSelectedVetId(allVets[0].uid);
      }

      if (user) {
        const userPets = await getPetsByOwner(user.uid);
        setPets(userPets);
        if (userPets.length > 0) {
          setSelectedPetId(userPets[0].id);
        }
      }
    }
    if (isOpen) {
      loadData();
      // default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().split("T")[0]);
      setSuccessApt(null);
      setError("");
    }
  }, [isOpen, initialVet, user]);

  if (!isOpen) return null;

  const currentVet = vets.find(v => v.uid === selectedVetId) || initialVet || vets[0];
  const currentPet = pets.find(p => p.id === selectedPetId);

  const availableSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedVetId) {
      setError("Please select a veterinarian.");
      return;
    }
    if (pets.length > 0 && !selectedPetId) {
      setError("Please select a pet.");
      return;
    }
    if (pets.length === 0 && !guestPetName.trim()) {
      setError("Please provide your pet's name.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate datetime ISO
      const [time, period] = timeSlot.split(" ");
      const [hourStr, minStr] = time.split(":");
      let hour = parseInt(hourStr, 10);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const aptDateTime = new Date(date);
      aptDateTime.setHours(hour, parseInt(minStr, 10), 0, 0);

      const petName = currentPet ? currentPet.name : guestPetName;
      const petSpecies = currentPet ? currentPet.species : guestPetSpecies;
      const petId = currentPet ? currentPet.id : `pet_custom_${Date.now()}`;

      const newApt = await createAppointment({
        petId,
        petName,
        petSpecies,
        ownerId: user?.uid || "guest_owner",
        ownerName: user?.displayName || "Guest Pet Parent",
        ownerEmail: user?.email || "guest@example.com",
        ownerPhone: user?.phoneNumber || "+1 (555) 000-1122",
        vetId: currentVet.uid,
        vetName: currentVet.displayName,
        vetSpecialty: currentVet.specialty,
        serviceType: service,
        dateTime: aptDateTime.toISOString(),
        durationMinutes: 30,
        status: "pending",
        notes,
      });

      setSuccessApt(newApt);
      if (onSuccess) onSuccess(newApt);
    } catch (err) {
      console.error(err);
      setError("Failed to schedule appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 text-white p-6 relative flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-200">
              PawPulse Scheduling
            </span>
            <h2 className="text-xl font-bold mt-0.5">Book a Veterinary Consultation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {successApt ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Appointment Requested!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Your consultation for <strong className="text-slate-900">{successApt.petName}</strong> with{" "}
                <strong className="text-slate-900">{successApt.vetName}</strong> has been scheduled for{" "}
                <span className="font-semibold text-brand-700">
                  {new Date(successApt.dateTime).toLocaleDateString()} at {timeSlot}
                </span>.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs text-left max-w-sm mx-auto space-y-2 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-medium text-slate-800">{successApt.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase text-[10px]">
                    {successApt.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono text-slate-600">{successApt.id}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Vet Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Veterinarian
                </label>
                <select
                  value={selectedVetId}
                  onChange={(e) => setSelectedVetId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none bg-slate-50"
                  required
                >
                  {vets.map((v) => (
                    <option key={v.uid} value={v.uid}>
                      {v.displayName} — {v.specialty} (Rs. {v.consultationFee.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pet Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Patient (Pet)
                </label>
                {pets.length > 0 ? (
                  <select
                    value={selectedPetId}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-slate-50"
                  >
                    {pets.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.species} • {p.breed})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Pet's Name (e.g. Bella)"
                      value={guestPetName}
                      onChange={(e) => setGuestPetName(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                    <select
                      value={guestPetSpecies}
                      onChange={(e) => setGuestPetSpecies(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Rabbit">Rabbit</option>
                      <option value="Bird">Bird</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Clinical Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-slate-50"
                >
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.duration} min • ${s.fee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    Available Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  >
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Symptoms or Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your pet's symptoms, behavioral changes, or relevant history..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {isSubmitting ? "Confirming Booking..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
