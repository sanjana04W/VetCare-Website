"use client";

import React, { useState, useEffect } from "react";
import { 
  createNotification, 
  getAllUsers, 
  getAllVeterinarians 
} from "@/lib/firebase/firestore";
import { loadStore } from "@/lib/firebase/mock-fallback";
import { NotificationItem, NotificationType } from "@/lib/types";
import { 
  Bell, 
  Send, 
  Clock, 
  Syringe, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Users 
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isBroadcastModal, setIsBroadcastModal] = useState(false);
  const [targetAudience, setTargetAudience] = useState<"all" | "owners" | "vets">("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notifType, setNotifType] = useState<NotificationType>("system_alert");
  const [link, setLink] = useState("/");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    const store = loadStore();
    setNotifications(store.notifications);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    const [allUsers, allVets] = await Promise.all([
      getAllUsers(),
      getAllVeterinarians()
    ]);

    let targetIds: string[] = [];
    if (targetAudience === "all") {
      targetIds = allUsers.map(u => u.uid);
    } else if (targetAudience === "owners") {
      targetIds = allUsers.filter(u => u.role === "petOwner").map(u => u.uid);
    } else {
      targetIds = allVets.map(v => v.uid);
    }

    for (const uid of targetIds) {
      await createNotification({
        userId: uid,
        title,
        message,
        type: notifType,
        link,
      });
    }

    setTitle("");
    setMessage("");
    setIsBroadcastModal(false);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
    loadData();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment_reminder":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "vaccination_due":
        return <Syringe className="w-4 h-4 text-rose-500" />;
      case "booking_confirmed":
        return <Calendar className="w-4 h-4 text-emerald-500" />;
      case "record_updated":
        return <FileText className="w-4 h-4 text-brand-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">System Notification & Broadcast Center</h2>
          <p className="text-xs text-slate-500">
            Dispatch urgent clinic broadcasts, monitor automated 24h reminders, and review trigger alerts.
          </p>
        </div>

        <button
          onClick={() => setIsBroadcastModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
        >
          <Send className="w-4 h-4" />
          <span>Dispatch System Broadcast</span>
        </button>
      </div>

      {sentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Broadcast dispatched successfully across all target accounts!</span>
        </div>
      )}

      {/* Notifications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Dispatched Notification Log</h3>
          <span className="text-xs text-slate-400 font-medium">
            {notifications.length} Total Alerts In System
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading logs...</div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No notifications recorded.</div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition">
                <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="font-bold text-slate-900 text-xs">{n.title}</p>
                    <span className="text-[10px] text-slate-400">{formatDateTime(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                    <span>Target User UID: <strong className="font-mono text-slate-600">{n.userId}</strong></span>
                    <span>•</span>
                    <span className="capitalize">{n.type.replace("_", " ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dispatch Broadcast Modal */}
      {isBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">
                Dispatch System-Wide Announcement
              </h3>
              <button
                onClick={() => setIsBroadcastModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Target Audience</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "all", label: "All Users" },
                    { id: "owners", label: "Pet Parents Only" },
                    { id: "vets", label: "Veterinarians Only" },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setTargetAudience(aud.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition ${
                        targetAudience === aud.id
                          ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Alert Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Hospital Seasonal Rabies Clinic / Severe Weather Notice"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Message Body</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write announcement details..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Action Link (Optional)</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/portal/records"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
