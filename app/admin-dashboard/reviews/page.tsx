"use client";

import React, { useState, useEffect } from "react";
import { getAllReviews, respondToReview } from "@/lib/firebase/firestore";
import { Review } from "@/lib/types";
import { 
  MessageSquare, 
  Star, 
  Search, 
  CornerDownRight, 
  X, 
  CheckCircle2, 
  User, 
  Stethoscope 
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [filterRating, setFilterRating] = useState<number | "All">("All");
  const [activeReplyReview, setActiveReplyReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllReviews();
      setReviews(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenReply = (rev: Review) => {
    setActiveReplyReview(rev);
    setResponseText(rev.response || "");
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReplyReview) return;
    await respondToReview(activeReplyReview.id, responseText);
    setActiveReplyReview(null);
    loadData();
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch =
      r.ownerName.toLowerCase().includes(q) ||
      r.vetName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q);

    const matchRating = filterRating === "All" || r.rating === filterRating;
    return matchSearch && matchRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Client Reviews & Doctor Ratings</h2>
          <p className="text-xs text-slate-500">
            Moderate verified pet parent feedback, review satisfaction metrics, and publish hospital replies.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-5 h-5 fill-amber-500" />
            <span className="text-lg font-extrabold text-slate-900">{avgRating}</span>
          </div>
          <span className="text-xs text-slate-400">({reviews.length} Verified Reviews)</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, doctor, or keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-1">
          {(["All", 5, 4, 3, 2, 1] as const).map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterRating === star
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {star === "All" ? "All" : `★ ${star}`}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading feedback...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Reviews Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-brand-50 text-brand-700 font-bold flex items-center justify-center text-xs border border-brand-200">
                      {rev.ownerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{rev.ownerName}</p>
                      <p className="text-[10px] text-slate-400">{formatDate(rev.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Consulted: <strong>{rev.vetName}</strong></span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {rev.response && (
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs space-y-1">
                    <span className="font-bold text-purple-900 text-[11px] flex items-center gap-1">
                      <CornerDownRight className="w-3.5 h-3.5" /> Official Clinic Response:
                    </span>
                    <p className="text-purple-800">{rev.response}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => handleOpenReply(rev)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{rev.response ? "Edit Response" : "Respond to Review"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      {activeReplyReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Reply to {activeReplyReview.ownerName}
              </h3>
              <button
                onClick={() => setActiveReplyReview(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              &ldquo;{activeReplyReview.comment}&rdquo;
            </p>

            <form onSubmit={handleSendResponse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Official Public Hospital Response
                </label>
                <textarea
                  rows={4}
                  required
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Thank the client, acknowledge the pet by name, and reaffirm hospital clinical care..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveReplyReview(null)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
                >
                  Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
