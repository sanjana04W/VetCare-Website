import { 
  UserProfile, 
  Veterinarian, 
  Pet, 
  Appointment, 
  AppointmentStatus,
  MedicalRecord, 
  VaccinationRecord, 
  PetCareTip, 
  Review, 
  NotificationItem,
  DashboardMetrics,
  UserRole
} from "@/lib/types";
import { generateId, calculateVaccineStatus } from "@/lib/utils";
import { isLiveFirebaseConfigured, db } from "./config";
import { loadStore, saveStore } from "./mock-fallback";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";

const seededCollections = new Set<string>();
let isFirestoreDisabled = false;

function withTimeout<T>(promise: Promise<T>, ms: number = 1000): Promise<T> {
  if (isFirestoreDisabled) {
    return Promise.reject(new Error("Firestore disabled"));
  }
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout")), ms)
    ),
  ]);
}

function handleFirestoreError(e: any, context: string) {
  const msg = e?.message || String(e);
  if (
    msg.includes("PERMISSION_DENIED") ||
    msg.includes("not been used in project") ||
    msg.includes("disabled") ||
    msg.includes("Could not reach Cloud Firestore")
  ) {
    isFirestoreDisabled = true;
  }
  console.warn(`Firestore ${context} fallback:`, msg);
}

async function syncCollectionIfEmpty<T extends { id?: string; uid?: string }>(
  collectionName: string,
  items: T[]
): Promise<void> {
  if (!isLiveFirebaseConfigured || !db || isFirestoreDisabled || seededCollections.has(collectionName)) return;
  seededCollections.add(collectionName);
  try {
    for (const item of items) {
      const id = item.id || item.uid;
      if (id) {
        await withTimeout(setDoc(doc(db, collectionName, id), item, { merge: true }), 1000);
      }
    }
  } catch (e) {
    handleFirestoreError(e, `sync:${collectionName}`);
  }
}

/* =========================================================================
   USERS & VETS
   ========================================================================= */

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) return snap.data() as UserProfile;
    } catch (e) {
      console.warn("Firestore getUserProfile fallback to local store:", e);
    }
  }
  const store = loadStore();
  return store.users.find(u => u.uid === uid) || null;
}

export async function getAllUsers(): Promise<UserProfile[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await withTimeout(getDocs(collection(db, "users")), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as UserProfile);
      }
      syncCollectionIfEmpty("users", loadStore().users);
    } catch (e) {
      handleFirestoreError(e, "getAllUsers");
    }
  }
  return loadStore().users;
}

export async function updateUserStatus(uid: string, status: 'active' | 'deactivated'): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await withTimeout(updateDoc(doc(db, "users", uid), { status }), 1000);
      return;
    } catch (e) {
      handleFirestoreError(e, "updateUserStatus");
    }
  }
  const store = loadStore();
  const user = store.users.find(u => u.uid === uid);
  if (user) {
    user.status = status;
    saveStore(store);
  }
}

export async function getAllVeterinarians(): Promise<Veterinarian[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await withTimeout(getDocs(collection(db, "veterinarians")), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Veterinarian);
      }
      syncCollectionIfEmpty("veterinarians", loadStore().vets);
    } catch (e) {
      handleFirestoreError(e, "getAllVeterinarians");
    }
  }
  return loadStore().vets;
}

export async function getVeterinarianById(uid: string): Promise<Veterinarian | null> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, "veterinarians", uid));
      if (snap.exists()) return snap.data() as Veterinarian;
    } catch (e) {
      console.warn("Firestore getVeterinarianById fallback:", e);
    }
  }
  const store = loadStore();
  return store.vets.find(v => v.uid === uid) || null;
}

export async function updateVeterinarianApproval(uid: string, isApproved: boolean): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "veterinarians", uid), { isApproved });
      return;
    } catch (e) {
      console.warn("Firestore updateVeterinarianApproval fallback:", e);
    }
  }
  const store = loadStore();
  const vet = store.vets.find(v => v.uid === uid);
  if (vet) {
    vet.isApproved = isApproved;
    saveStore(store);
  }
}

export async function updateVetAvailability(uid: string, availability: Veterinarian['availability']): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "veterinarians", uid), { availability });
      return;
    } catch (e) {
      console.warn("Firestore updateVetAvailability fallback:", e);
    }
  }
  const store = loadStore();
  const vet = store.vets.find(v => v.uid === uid);
  if (vet) {
    vet.availability = availability;
    saveStore(store);
  }
}

export async function updateVetProfile(uid: string, updates: Partial<Veterinarian>): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "veterinarians", uid), updates);
      return;
    } catch (e) {
      console.warn("Firestore updateVetProfile fallback:", e);
    }
  }
  const store = loadStore();
  const vet = store.vets.find(v => v.uid === uid);
  if (vet) {
    Object.assign(vet, updates);
    saveStore(store);
  }
}

/* =========================================================================
   PETS
   ========================================================================= */

export async function getPetsByOwner(ownerId: string): Promise<Pet[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "pets"), where("ownerId", "==", ownerId));
      const snap = await withTimeout(getDocs(q), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Pet);
      }
    } catch (e) {
      handleFirestoreError(e, "getPetsByOwner");
    }
  }
  return loadStore().pets.filter(p => p.ownerId === ownerId);
}

export async function getAllPets(): Promise<Pet[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await withTimeout(getDocs(collection(db, "pets")), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Pet);
      }
      syncCollectionIfEmpty("pets", loadStore().pets);
    } catch (e) {
      handleFirestoreError(e, "getAllPets");
    }
  }
  return loadStore().pets;
}

export async function getPetById(id: string): Promise<Pet | null> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDoc(doc(db, "pets", id));
      if (snap.exists()) return snap.data() as Pet;
    } catch (e) {
      console.warn("Firestore getPetById fallback:", e);
    }
  }
  const store = loadStore();
  return store.pets.find(p => p.id === id) || null;
}

export async function createPet(data: Omit<Pet, "id" | "createdAt">): Promise<Pet> {
  const newPet: Pet = {
    ...data,
    id: generateId("pet"),
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "pets", newPet.id), newPet);
      return newPet;
    } catch (e) {
      console.warn("Firestore createPet fallback:", e);
    }
  }

  const store = loadStore();
  store.pets.unshift(newPet);
  saveStore(store);
  return newPet;
}

export async function updatePet(id: string, updates: Partial<Pet>): Promise<Pet> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "pets", id), updates);
    } catch (e) {
      console.warn("Firestore updatePet fallback:", e);
    }
  }

  const store = loadStore();
  const petIndex = store.pets.findIndex(p => p.id === id);
  if (petIndex >= 0) {
    store.pets[petIndex] = { ...store.pets[petIndex], ...updates };
    saveStore(store);
    return store.pets[petIndex];
  }
  throw new Error("Pet not found");
}

export async function deletePet(id: string): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await deleteDoc(doc(db, "pets", id));
    } catch (e) {
      console.warn("Firestore deletePet fallback:", e);
    }
  }
  const store = loadStore();
  store.pets = store.pets.filter(p => p.id !== id);
  saveStore(store);
}

/* =========================================================================
   APPOINTMENTS
   ========================================================================= */

export async function getAllAppointments(): Promise<Appointment[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await withTimeout(getDocs(collection(db, "appointments")), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Appointment);
      }
      syncCollectionIfEmpty("appointments", loadStore().appointments);
    } catch (e) {
      handleFirestoreError(e, "getAllAppointments");
    }
  }
  return loadStore().appointments;
}

export async function getAppointmentsByOwner(ownerId: string): Promise<Appointment[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "appointments"), where("ownerId", "==", ownerId));
      const snap = await withTimeout(getDocs(q), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Appointment);
      }
    } catch (e) {
      handleFirestoreError(e, "getAppointmentsByOwner");
    }
  }
  return loadStore().appointments.filter(a => a.ownerId === ownerId);
}

export async function getAppointmentsByVet(vetId: string): Promise<Appointment[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "appointments"), where("vetId", "==", vetId));
      const snap = await withTimeout(getDocs(q), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Appointment);
      }
    } catch (e) {
      handleFirestoreError(e, "getAppointmentsByVet");
    }
  }
  return loadStore().appointments.filter(a => a.vetId === vetId);
}

export async function createAppointment(data: Omit<Appointment, "id" | "createdAt">): Promise<Appointment> {
  const newAppointment: Appointment = {
    ...data,
    id: generateId("apt"),
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "appointments", newAppointment.id), newAppointment);
    } catch (e) {
      console.warn("Firestore createAppointment fallback:", e);
    }
  }

  const store = loadStore();
  store.appointments.unshift(newAppointment);

  // Trigger automated notification to veterinarian
  store.notifications.unshift({
    id: generateId("notif"),
    userId: newAppointment.vetId,
    title: "New Appointment Request",
    message: `${newAppointment.ownerName} requested an appointment for ${newAppointment.petName} on ${new Date(newAppointment.dateTime).toLocaleDateString()}.`,
    type: "booking_confirmed",
    isRead: false,
    link: "/vet-dashboard/appointments",
    createdAt: new Date().toISOString()
  });

  // Trigger confirmation to pet owner
  store.notifications.unshift({
    id: generateId("notif"),
    userId: newAppointment.ownerId,
    title: "Appointment Request Submitted",
    message: `Your booking for ${newAppointment.petName} with ${newAppointment.vetName} has been received and is pending confirmation.`,
    type: "booking_confirmed",
    isRead: false,
    link: "/portal/appointments",
    createdAt: new Date().toISOString()
  });

  saveStore(store);
  return newAppointment;
}

export async function updateAppointmentStatus(
  id: string, 
  status: AppointmentStatus, 
  rejectionReason?: string
): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "appointments", id), { status, rejectionReason });
    } catch (e) {
      console.warn("Firestore updateAppointmentStatus fallback:", e);
    }
  }

  const store = loadStore();
  const apt = store.appointments.find(a => a.id === id);
  if (apt) {
    apt.status = status;
    if (rejectionReason) apt.rejectionReason = rejectionReason;

    // Send status update notification to pet owner
    const statusText = status === 'confirmed' ? 'confirmed' : status === 'completed' ? 'marked as completed' : status === 'cancelled' ? 'cancelled' : status;
    store.notifications.unshift({
      id: generateId("notif"),
      userId: apt.ownerId,
      title: `Appointment ${status === 'confirmed' ? 'Confirmed!' : 'Updated'}`,
      message: `Your appointment for ${apt.petName} with ${apt.vetName} has been ${statusText}.${rejectionReason ? ` Note: ${rejectionReason}` : ''}`,
      type: "booking_confirmed",
      isRead: false,
      link: "/portal/appointments",
      createdAt: new Date().toISOString()
    });

    saveStore(store);
  }
}

export async function reassignAppointment(id: string, newVetId: string, newVetName: string): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "appointments", id), { vetId: newVetId, vetName: newVetName });
    } catch (e) {
      console.warn("Firestore reassignAppointment fallback:", e);
    }
  }
  const store = loadStore();
  const apt = store.appointments.find(a => a.id === id);
  if (apt) {
    apt.vetId = newVetId;
    apt.vetName = newVetName;
    saveStore(store);
  }
}

/* =========================================================================
   MEDICAL RECORDS
   ========================================================================= */

export async function getMedicalRecordsByPet(petId: string): Promise<MedicalRecord[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "medical_records"), where("petId", "==", petId));
      const snap = await withTimeout(getDocs(q), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as MedicalRecord);
      }
    } catch (e) {
      handleFirestoreError(e, "getMedicalRecordsByPet");
    }
  }
  return loadStore().medicalRecords.filter(m => m.petId === petId);
}

export async function getMedicalRecordsByVet(vetId: string): Promise<MedicalRecord[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "medical_records"), where("vetId", "==", vetId));
      const snap = await withTimeout(getDocs(q), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as MedicalRecord);
      }
    } catch (e) {
      handleFirestoreError(e, "getMedicalRecordsByVet");
    }
  }
  return loadStore().medicalRecords.filter(m => m.vetId === vetId);
}

export async function getAllMedicalRecords(): Promise<MedicalRecord[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await withTimeout(getDocs(collection(db, "medical_records")), 1000);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as MedicalRecord);
      }
      syncCollectionIfEmpty("medical_records", loadStore().medicalRecords);
    } catch (e) {
      handleFirestoreError(e, "getAllMedicalRecords");
    }
  }
  return loadStore().medicalRecords;
}

export async function createMedicalRecord(data: Omit<MedicalRecord, "id" | "createdAt">): Promise<MedicalRecord> {
  const newRecord: MedicalRecord = {
    ...data,
    id: generateId("rec"),
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "medical_records", newRecord.id), newRecord);
    } catch (e) {
      console.warn("Firestore createMedicalRecord fallback:", e);
    }
  }

  const store = loadStore();
  store.medicalRecords.unshift(newRecord);

  // Notify pet owner of new record
  store.notifications.unshift({
    id: generateId("notif"),
    userId: newRecord.ownerId,
    title: "New Medical Record Added",
    message: `${newRecord.vetName} has added a new clinical consultation record for ${newRecord.petName}.`,
    type: "record_updated",
    isRead: false,
    link: "/portal/records",
    createdAt: new Date().toISOString()
  });

  saveStore(store);
  return newRecord;
}

/* =========================================================================
   VACCINATIONS
   ========================================================================= */

export async function getVaccinationsByPet(petId: string): Promise<VaccinationRecord[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "vaccinations"), where("petId", "==", petId));
      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => {
          const v = d.data() as VaccinationRecord;
          v.status = calculateVaccineStatus(v.nextDueDate);
          return v;
        });
      }
    } catch (e) {
      console.warn("Firestore getVaccinationsByPet fallback:", e);
    }
  }
  return loadStore().vaccinations
    .filter(v => v.petId === petId)
    .map(v => ({ ...v, status: calculateVaccineStatus(v.nextDueDate) }));
}

export async function getAllVaccinations(): Promise<VaccinationRecord[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDocs(collection(db, "vaccinations"));
      if (snap.docs.length > 0) {
        return snap.docs.map(d => {
          const v = d.data() as VaccinationRecord;
          v.status = calculateVaccineStatus(v.nextDueDate);
          return v;
        });
      }
      syncCollectionIfEmpty("vaccinations", loadStore().vaccinations);
    } catch (e) {
      console.warn("Firestore getAllVaccinations fallback:", e);
    }
  }
  return loadStore().vaccinations.map(v => ({ ...v, status: calculateVaccineStatus(v.nextDueDate) }));
}

export async function createVaccinationRecord(data: Omit<VaccinationRecord, "id" | "createdAt" | "status">): Promise<VaccinationRecord> {
  const status = calculateVaccineStatus(data.nextDueDate);
  const newVac: VaccinationRecord = {
    ...data,
    id: generateId("vac"),
    status,
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "vaccinations", newVac.id), newVac);
    } catch (e) {
      console.warn("Firestore createVaccinationRecord fallback:", e);
    }
  }

  const store = loadStore();
  store.vaccinations.unshift(newVac);

  // Notify owner
  store.notifications.unshift({
    id: generateId("notif"),
    userId: newVac.ownerId,
    title: `Vaccination Logged: ${newVac.vaccineName}`,
    message: `${newVac.vaccineName} was administered to ${newVac.petName}. Next booster due: ${newVac.nextDueDate}.`,
    type: "record_updated",
    isRead: false,
    link: "/portal/records",
    createdAt: new Date().toISOString()
  });

  saveStore(store);
  return newVac;
}

/* =========================================================================
   PET CARE TIPS
   ========================================================================= */

export async function getAllTips(onlyPublished: boolean = true): Promise<PetCareTip[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDocs(collection(db, "tips"));
      if (snap.docs.length > 0) {
        const list = snap.docs.map(d => d.data() as PetCareTip);
        return onlyPublished ? list.filter(t => t.published) : list;
      }
      syncCollectionIfEmpty("tips", loadStore().tips);
    } catch (e) {
      console.warn("Firestore getAllTips fallback:", e);
    }
  }
  const tips = loadStore().tips;
  return onlyPublished ? tips.filter(t => t.published) : tips;
}

export async function getTipBySlug(slug: string): Promise<PetCareTip | null> {
  const tips = await getAllTips(false);
  return tips.find(t => t.slug === slug) || null;
}

export async function createTip(data: Omit<PetCareTip, "id" | "createdAt">): Promise<PetCareTip> {
  const newTip: PetCareTip = {
    ...data,
    id: generateId("tip"),
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "tips", newTip.id), newTip);
    } catch (e) {
      console.warn("Firestore createTip fallback:", e);
    }
  }

  const store = loadStore();
  store.tips.unshift(newTip);
  saveStore(store);
  return newTip;
}

export async function updateTip(id: string, updates: Partial<PetCareTip>): Promise<PetCareTip> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "tips", id), updates);
    } catch (e) {
      console.warn("Firestore updateTip fallback:", e);
    }
  }
  const store = loadStore();
  const idx = store.tips.findIndex(t => t.id === id);
  if (idx >= 0) {
    store.tips[idx] = { ...store.tips[idx], ...updates };
    saveStore(store);
    return store.tips[idx];
  }
  throw new Error("Tip not found");
}

export async function deleteTip(id: string): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await deleteDoc(doc(db, "tips", id));
    } catch (e) {
      console.warn("Firestore deleteTip fallback:", e);
    }
  }
  const store = loadStore();
  store.tips = store.tips.filter(t => t.id !== id);
  saveStore(store);
}

/* =========================================================================
   REVIEWS
   ========================================================================= */

export async function getAllReviews(): Promise<Review[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const snap = await getDocs(collection(db, "reviews"));
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as Review);
      }
      syncCollectionIfEmpty("reviews", loadStore().reviews);
    } catch (e) {
      console.warn("Firestore getAllReviews fallback:", e);
    }
  }
  return loadStore().reviews;
}

export async function getReviewsByVet(vetId: string): Promise<Review[]> {
  const list = await getAllReviews();
  return list.filter(r => r.vetId === vetId);
}

export async function createReview(data: Omit<Review, "id" | "createdAt">): Promise<Review> {
  const newReview: Review = {
    ...data,
    id: generateId("rev"),
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "reviews", newReview.id), newReview);
    } catch (e) {
      console.warn("Firestore createReview fallback:", e);
    }
  }

  const store = loadStore();
  store.reviews.unshift(newReview);

  // Recalculate vet rating
  const vet = store.vets.find(v => v.uid === newReview.vetId);
  if (vet) {
    const vetReviews = store.reviews.filter(r => r.vetId === newReview.vetId);
    const avg = vetReviews.reduce((sum, r) => sum + r.rating, 0) / vetReviews.length;
    vet.rating = Number(avg.toFixed(1));
    vet.reviewCount = vetReviews.length;
  }

  saveStore(store);
  return newReview;
}

export async function respondToReview(id: string, response: string): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "reviews", id), { response });
    } catch (e) {
      console.warn("Firestore respondToReview fallback:", e);
    }
  }
  const store = loadStore();
  const rev = store.reviews.find(r => r.id === id);
  if (rev) {
    rev.response = response;
    saveStore(store);
  }
}

/* =========================================================================
   NOTIFICATIONS
   ========================================================================= */

export async function getNotificationsByUser(userId: string): Promise<NotificationItem[]> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      const q = query(collection(db, "notifications"), where("userId", "==", userId));
      const snap = await getDocs(q);
      if (snap.docs.length > 0) {
        return snap.docs.map(d => d.data() as NotificationItem);
      }
    } catch (e) {
      console.warn("Firestore getNotificationsByUser fallback:", e);
    }
  }
  return loadStore().notifications.filter(n => n.userId === userId);
}

export async function markNotificationAsRead(id: string): Promise<void> {
  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await updateDoc(doc(db, "notifications", id), { isRead: true });
    } catch (e) {
      console.warn("Firestore markNotificationAsRead fallback:", e);
    }
  }
  const store = loadStore();
  const notif = store.notifications.find(n => n.id === id);
  if (notif) {
    notif.isRead = true;
    saveStore(store);
  }
}

export async function createNotification(data: Omit<NotificationItem, "id" | "createdAt" | "isRead">): Promise<NotificationItem> {
  const notif: NotificationItem = {
    ...data,
    id: generateId("notif"),
    isRead: false,
    createdAt: new Date().toISOString()
  };

  if (isLiveFirebaseConfigured && db && !isFirestoreDisabled) {
    try {
      await setDoc(doc(db, "notifications", notif.id), notif);
    } catch (e) {
      console.warn("Firestore createNotification fallback:", e);
    }
  }

  const store = loadStore();
  store.notifications.unshift(notif);
  saveStore(store);
  return notif;
}

/* =========================================================================
   DASHBOARD METRICS CALCULATION
   ========================================================================= */

export async function getDashboardMetrics(role: UserRole, uid?: string): Promise<DashboardMetrics> {
  const store = loadStore();
  const pets = store.pets;
  const users = store.users;
  const vets = store.vets;
  const appointments = store.appointments;
  const records = store.medicalRecords;
  const vaccinations = store.vaccinations;
  const reviews = store.reviews;

  const upcomingApts = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending');
  const overdueOrDueVaccines = vaccinations.filter(v => {
    const st = calculateVaccineStatus(v.nextDueDate);
    return st === 'due' || st === 'overdue';
  });

  const avgRating = reviews.length > 0 
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1))
    : 5.0;

  if (role === 'veterinarian' && uid) {
    const vetApts = upcomingApts.filter(a => a.vetId === uid);
    const vetRecords = records.filter(r => r.vetId === uid);
    return {
      totalPets: pets.length,
      totalUsers: users.length,
      totalVets: vets.length,
      upcomingAppointmentsCount: vetApts.length,
      recentRecordsCount: vetRecords.length,
      vaccinationAlertsCount: overdueOrDueVaccines.length,
      averageRating: avgRating,
    };
  }

  return {
    totalPets: pets.length,
    totalUsers: users.length,
    totalVets: vets.length,
    upcomingAppointmentsCount: upcomingApts.length,
    recentRecordsCount: records.length,
    vaccinationAlertsCount: overdueOrDueVaccines.length,
    averageRating: avgRating,
    pendingApprovalsCount: vets.filter(v => !v.isApproved).length,
  };
}
