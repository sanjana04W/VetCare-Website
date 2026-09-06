"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getVeterinarianById, updateVetAvailability } from "@/lib/firebase/firestore";
import { Veterinarian, VetAvailability } from "@/lib/types";
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  AlertCircle,
  Save
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const DAYS = [
  { index: 0, name: "Sunday" },
  { index: 1, name: "Monday" },
  { index: 2, name: "Tuesday" },
  { index: 3, name: "Wednesday" },
  { index: 4, name: "Thursday" },
  { index: 5, name: "Friday" },
  { index: 6, name: "Saturday" },
];

export default function VetAvailabilityPage() {
  const { user } = useAuth();
  const [vet, setVet] = useState<Veterinarian | null>(null);
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1, 2, 3, 4, 5]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [slotDuration, setSlotDuration] = useState(30);
  const [daysOff, setDaysOff] = useState<string[]>([]);
  const [newDayOff, setNewDayOff] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const vetId = user?.uid || "vet_01";
      const data = await getVeterinarianById(vetId);
      if (data) {
        setVet(data);
        if (data.availability) {
          setDaysOfWeek(data.availability.daysOfWeek || [1, 2, 3, 4, 5]);
          setStartTime(data.availability.startTime || "09:00");
          setEndTime(data.availability.endTime || "17:00");
          setSlotDuration(data.availability.slotDurationMinutes || 30);
          setDaysOff(data.availability.daysOff || []);
        }
      }
      setIsLoading(false);
    }
    load();
  }, [user]);

  const toggleDay = (idx: number) => {
    if (daysOfWeek.includes(idx)) {
      setDaysOfWeek(daysOfWeek.filter(d => d !== idx));
    } else {
      setDaysOfWeek([...daysOfWeek, idx].sort());
    }
  };

  const addDayOff = () => {
    if (newDayOff && !daysOff.includes(newDayOff)) {
      setDaysOff([...daysOff, newDayOff].sort());
      setNewDayOff("");
    }
  };

  const removeDayOff = (dateStr: string) => {
    setDaysOff(daysOff.filter(d => d !== dateStr));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const vetId = user?.uid || "vet_01";
    const availability: VetAvailability = {
      daysOfWeek,
      startTime,
      endTime,
      slotDurationMinutes: Number(slotDuration),
      daysOff,
    };
    await updateVetAvailability(vetId, availability);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clinical Office Hours & Booking Slots</h2>
          <p className="text-xs text-slate-500">
            Define recurring weekly shift availability, consultation duration windows, and blackout holidays.
          </p>
        </div>

        {isSaved && (
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Schedule Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Working Days of Week */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-600" />
            <span>Weekly Practicing Days</span>
          </h3>

          <p className="text-xs text-slate-500">
            Select the days your clinic examination room is open for incoming owner bookings.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
            {DAYS.map((day) => {
              const active = daysOfWeek.includes(day.index);
              return (
                <button
                  key={day.index}
                  type="button"
                  onClick={() => toggleDay(day.index)}
                  className={`py-3 px-2 rounded-2xl border text-center transition ${
                    active
                      ? "bg-brand-600 text-white border-brand-600 font-bold shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 font-medium text-xs"
                  }`}
                >
                  <span className="block text-xs">{day.name.slice(0, 3)}</span>
                  <span className="text-[10px] opacity-80">{active ? "Active" : "Off"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours & Slot Duration */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>Daily Consultation Shift Hours</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinic Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinic End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Appointment Slot Duration</label>
              <select
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={15}>15 Minutes (Brief Follow-up)</option>
                <option value={30}>30 Minutes (Standard Wellness Exam)</option>
                <option value={45}>45 Minutes (Surgical / Comprehensive)</option>
                <option value={60}>60 Minutes (Complex Diagnostic / Ultrasound)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Days Off & Vacation Blackouts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-600" />
            <span>Vacation & Blackout Dates (Days Off)</span>
          </h3>

          <p className="text-xs text-slate-500">
            Appointments will automatically be disabled on these specific dates.
          </p>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="date"
              value={newDayOff}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setNewDayOff(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500 flex-1"
            />
            <button
              type="button"
              onClick={addDayOff}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Date</span>
            </button>
          </div>

          {daysOff.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {daysOff.map((d) => (
                <div
                  key={d}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2"
                >
                  <span>{formatDate(d)}</span>
                  <button
                    type="button"
                    onClick={() => removeDayOff(d)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Availability Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
