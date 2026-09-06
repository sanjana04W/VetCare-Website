"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { 
  getAppointmentsByOwner, 
  updateAppointmentStatus, 
  createReview,
  getAllReviews
} from "@/lib/firebase/firestore";
import { Appointment, Review } from "@/lib/types";
import { BookingModal } from "@/website/components/BookingModal";
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  Star, 
  X, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Plus
} from "lucide-react";
import { formatDateTime, getStatusBadgeClass } from "@/lib/utils";

export default function AppointmentsPortalPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Review Modal State
  const [reviewModalApt, setReviewModalApt] = useState<Appointment | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const loadData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [apts, revs] = await Promise.all([
        getAppointmentsByOwner(user.uid),
        getAllReviews(),
      ]);
      setAppointments(apts);
      setReviews(revs.filter(r => r.ownerId === user.uid));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleCancel = async (aptId: string, petName: string) => {
    const reason = prompt(`Please share a brief cancellation reason for ${petName}'s appointment:`);
    if (reason !== null) {
      await updateAppointmentStatus(aptId, "cancelled", reason || "Cancelled by owner");
      loadData();
    }
  };

  const handleOpenReview = (apt: Appointment) => {
    setReviewModalApt(apt);
    setRating(5);
    setComment("");
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModalApt || !user) return;
    setIsSubmittingReview(true);
    try {
      await createReview({
        vetId: reviewModalApt.vetId,
        vetName: reviewModalApt.vetName,
        ownerId: user.uid,
        ownerName: user.displayName,
        appointmentId: reviewModalApt.id,
        rating,
        comment,
      });
      setReviewModalApt(null);
      loadData();
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const filtered = appointments.filter(a => {
    if (filterStatus === "All") return true;
    return a.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Appointment History</h2>
          <p className="text-xs text-slate-500">Track consultation schedules, clinical statuses, and share feedback.</p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Visit</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterStatus === status
                ? "bg-brand-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading appointments...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Appointments Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {filterStatus === "All"
              ? "You haven't booked any veterinary visits yet. Schedule your companion's checkup now."
              : `No appointments with status "${filterStatus}".`}
          </p>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="mt-4 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
          >
            Schedule A Visit
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((apt) => {
            const hasReviewed = reviews.some(r => r.appointmentId === apt.id);
            return (
              <div
                key={apt.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {apt.id}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {apt.serviceType}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-brand-700">
                      <Stethoscope className="w-3.5 h-3.5" />
                      {apt.vetName} ({apt.vetSpecialty})
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-800">
                      Patient: {apt.petName} ({apt.petSpecies})
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDateTime(apt.dateTime)} ({apt.durationMinutes} mins)
                    </span>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                      <strong className="text-slate-700">Owner Notes:</strong> {apt.notes}
                    </p>
                  )}

                  {apt.rejectionReason && (
                    <p className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-100 max-w-xl">
                      <strong className="text-rose-800">Cancellation / Status Note:</strong> {apt.rejectionReason}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {apt.status === "completed" && !hasReviewed && (
                    <button
                      onClick={() => handleOpenReview(apt)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition shadow-xs"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Review Vet</span>
                    </button>
                  )}

                  {hasReviewed && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reviewed
                    </span>
                  )}

                  {(apt.status === "pending" || apt.status === "confirmed") && (
                    <button
                      onClick={() => handleCancel(apt.id, apt.petName)}
                      className="px-4 py-2 border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition"
                    >
                      Cancel Visit
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {reviewModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Review {reviewModalApt.vetName}
              </h3>
              <button
                onClick={() => setReviewModalApt(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? "fill-amber-500" : "stroke-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Review & Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Share how ${reviewModalApt.vetName} treated ${reviewModalApt.petName}...`}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalApt(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={() => loadData()}
      />
    </div>
  );
}
