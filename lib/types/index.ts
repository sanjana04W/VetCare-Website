export type UserRole = 'petOwner' | 'veterinarian' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  photoURL?: string;
  status: 'active' | 'pending' | 'deactivated';
  createdAt: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  altPhone?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Reptile' | 'Other';
  breed: string;
  age: number; // in years or months
  gender: 'Male' | 'Female' | 'Neutered Male' | 'Spayed Female';
  weight: number; // in kg
  allergies?: string[];
  microchipNumber?: string;
  photoURL?: string;
  emergencyContact?: EmergencyContact;
  createdAt: string;
}

export interface VetAvailability {
  daysOfWeek: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  slotDurationMinutes: number; // e.g. 30
  daysOff?: string[]; // ISO date strings e.g. "2026-09-15"
}

export interface Veterinarian extends UserProfile {
  specialty: string;
  licenseNumber: string;
  clinicName: string;
  clinicAddress: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  bio: string;
  isApproved: boolean;
  availability: VetAvailability;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  petSpecies: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  vetId: string;
  vetName: string;
  vetSpecialty: string;
  serviceType: string;
  dateTime: string; // ISO 8601 string
  durationMinutes: number;
  status: AppointmentStatus;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface Prescription {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  petName: string;
  ownerId: string;
  vetId: string;
  vetName: string;
  appointmentId?: string;
  visitDate: string; // ISO string
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescriptions: Prescription[];
  weightAtVisit: number;
  labResults?: string;
  followUpDate?: string;
  notes?: string;
  createdAt: string;
}

export interface VaccinationRecord {
  id: string;
  petId: string;
  petName: string;
  ownerId: string;
  vetId: string;
  vetName: string;
  vaccineName: string;
  batchNumber: string;
  dateAdministered: string;
  nextDueDate: string;
  status: 'valid' | 'due' | 'overdue';
  notes?: string;
  createdAt: string;
}

export interface PetCareTip {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Nutrition' | 'Health & Wellness' | 'Training & Behavior' | 'Vaccinations' | 'Emergency Care';
  coverImage: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  published: boolean;
  tags: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  vetId: string;
  vetName: string;
  ownerId: string;
  ownerName: string;
  appointmentId?: string;
  rating: number; // 1 to 5
  comment: string;
  response?: string;
  createdAt: string;
}

export type NotificationType = 
  | 'appointment_reminder' 
  | 'vaccination_due' 
  | 'booking_confirmed' 
  | 'record_updated' 
  | 'system_alert';

export interface NotificationItem {
  id: string;
  userId: string; // target user
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalPets: number;
  totalUsers: number;
  totalVets: number;
  upcomingAppointmentsCount: number;
  recentRecordsCount: number;
  vaccinationAlertsCount: number;
  averageRating: number;
  pendingApprovalsCount?: number;
}
