import { 
  UserProfile, 
  Veterinarian, 
  Pet, 
  Appointment, 
  MedicalRecord, 
  VaccinationRecord, 
  PetCareTip, 
  Review, 
  NotificationItem 
} from "@/lib/types";
import { 
  SEED_USERS, 
  SEED_VETS, 
  SEED_PETS, 
  SEED_APPOINTMENTS, 
  SEED_MEDICAL_RECORDS, 
  SEED_VACCINATIONS, 
  SEED_TIPS, 
  SEED_REVIEWS, 
  SEED_NOTIFICATIONS 
} from "./seed";

interface MockStore {
  users: UserProfile[];
  vets: Veterinarian[];
  pets: Pet[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  vaccinations: VaccinationRecord[];
  tips: PetCareTip[];
  reviews: Review[];
  notifications: NotificationItem[];
}

const STORAGE_KEY = "pawpulse_db_v1";

function getInitialStore(): MockStore {
  return {
    users: [...SEED_USERS],
    vets: [...SEED_VETS],
    pets: [...SEED_PETS],
    appointments: [...SEED_APPOINTMENTS],
    medicalRecords: [...SEED_MEDICAL_RECORDS],
    vaccinations: [...SEED_VACCINATIONS],
    tips: [...SEED_TIPS],
    reviews: [...SEED_REVIEWS],
    notifications: [...SEED_NOTIFICATIONS],
  };
}

export function loadStore(): MockStore {
  if (typeof window === "undefined") {
    return getInitialStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialStore();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialStore();
  }
}

export function saveStore(store: MockStore): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      console.error("Failed to persist mock store to localStorage", e);
    }
  }
}

export function resetToSeedData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    const seed = getInitialStore();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    window.location.reload();
  }
}
