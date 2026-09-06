"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/lib/contexts/NotificationContext";
import { Bell, CheckCheck, Clock, AlertTriangle, Syringe, Calendar, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-brand-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] text-[11px] font-bold text-white bg-rose-500 rounded-full px-1 shadow-sm animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[11px] font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-xs font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="text-center py-8 px-4 text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">No notifications yet. You are all caught up!</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && markAsRead(n.id)}
                  className={`p-3.5 transition-colors cursor-pointer flex gap-3 items-start ${
                    n.isRead ? "bg-white hover:bg-slate-50" : "bg-teal-50/40 hover:bg-teal-50/70"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className={`text-xs font-semibold ${n.isRead ? "text-slate-800" : "text-brand-900"}`}>
                        {n.title}
                      </p>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-slate-400">
                      <span>{formatDateTime(n.createdAt)}</span>
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={() => setIsOpen(false)}
                          className="text-brand-600 hover:underline font-medium"
                        >
                          View details &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
