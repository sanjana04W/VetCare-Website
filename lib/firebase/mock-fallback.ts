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

const STORAGE_KEY = "pawpulse_db_v5";

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
      // Migrate legacy stores to preserve user appointments, records, and reviews
      for (const legacyKey of ["pawpulse_db_v4", "pawpulse_db_v3", "pawpulse_db_v2", "pawpulse_db_v1"]) {
        const legacy = localStorage.getItem(legacyKey);
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed.appointments) initial.appointments = parsed.appointments;
            if (parsed.medicalRecords) initial.medicalRecords = parsed.medicalRecords;
            if (parsed.reviews) initial.reviews = parsed.reviews;
          } catch {
            // ignore
          }
          break;
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const store = JSON.parse(raw) as MockStore;
    // Always sync latest vets list (adds new doctors), tips, and photos
    store.vets = [...SEED_VETS];
    store.tips = [...SEED_TIPS];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return store;
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
