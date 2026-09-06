"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { NotificationItem } from "@/lib/types";
import { useAuth } from "./AuthContext";
import { 
  getNotificationsByUser, 
  markNotificationAsRead as apiMarkAsRead,
  getAllAppointments,
  getAllVaccinations,
  createNotification
} from "@/lib/firebase/firestore";
import { parseISO, differenceInHours, differenceInDays } from "date-fns";

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const items = await getNotificationsByUser(user.uid);
    setNotifications(items);
  }, [user]);

  // Automated automated reminder checks (24h appointment reminders + due vaccine alerts)
  const runAutomatedChecks = useCallback(async () => {
    if (!user || user.role !== 'petOwner') return;

    try {
      const appointments = await getAllAppointments();
      const userAppointments = appointments.filter(a => a.ownerId === user.uid && a.status === 'confirmed');
      const now = new Date();

      for (const apt of userAppointments) {
        const aptDate = parseISO(apt.dateTime);
        const hoursRemaining = differenceInHours(aptDate, now);

        // If appointment is between 0 and 24 hours away
        if (hoursRemaining >= 0 && hoursRemaining <= 24) {
          // Check if reminder notification already exists
          const existing = notifications.find(n => 
            n.type === 'appointment_reminder' && 
            n.message.includes(apt.petName) &&
            differenceInHours(now, parseISO(n.createdAt)) < 24
          );

          if (!existing) {
            await createNotification({
              userId: user.uid,
              title: `Upcoming Appointment in ${hoursRemaining} hours`,
              message: `Reminder: ${apt.petName}'s appointment with ${apt.vetName} is coming up soon (${new Date(apt.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}).`,
              type: "appointment_reminder",
              link: "/portal/appointments",
            });
          }
        }
      }

      // Check vaccination records
      const vaccines = await getAllVaccinations();
      const userVaccines = vaccines.filter(v => v.ownerId === user.uid);
      for (const vac of userVaccines) {
        const dueDate = parseISO(vac.nextDueDate);
        const daysUntilDue = differenceInDays(dueDate, now);

        if (daysUntilDue <= 14 && daysUntilDue >= 0) {
          const existing = notifications.find(n => 
            n.type === 'vaccination_due' && 
            n.message.includes(vac.vaccineName) &&
            n.message.includes(vac.petName)
          );
          if (!existing) {
            await createNotification({
              userId: user.uid,
              title: `Vaccine Due Soon: ${vac.vaccineName}`,
              message: `${vac.petName}'s ${vac.vaccineName} booster is due in ${daysUntilDue} days (${vac.nextDueDate}).`,
              type: "vaccination_due",
              link: "/portal/records",
            });
          }
        }
      }
    } catch (err) {
      console.warn("Automated reminder check error:", err);
    }
  }, [user, notifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    runAutomatedChecks();
    const interval = setInterval(() => {
      runAutomatedChecks();
      fetchNotifications();
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [runAutomatedChecks, fetchNotifications]);

  const markAsRead = async (id: string) => {
    await apiMarkAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = async () => {
    for (const notif of notifications.filter(n => !n.isRead)) {
      await apiMarkAsRead(notif.id);
    }
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      refreshNotifications: fetchNotifications 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
