import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isBefore, isAfter, addDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, formatStr: string = "PPP"): string {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy 'at' h:mm a");
  } catch {
    return dateString;
  }
}

export function formatTime(dateString: string): string {
  try {
    return format(parseISO(dateString), "h:mm a");
  } catch {
    return dateString;
  }
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'confirmed':
    case 'valid':
    case 'active':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'pending':
    case 'due':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'cancelled':
    case 'overdue':
    case 'deactivated':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function calculateVaccineStatus(nextDueDate: string): 'valid' | 'due' | 'overdue' {
  try {
    const due = parseISO(nextDueDate);
    const now = new Date();
    const thirtyDaysFromNow = addDays(now, 30);

    if (isBefore(due, now)) {
      return 'overdue';
    }
    if (isBefore(due, thirtyDaysFromNow)) {
      return 'due';
    }
    return 'valid';
  } catch {
    return 'valid';
  }
}
