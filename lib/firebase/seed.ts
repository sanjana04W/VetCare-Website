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

export const SEED_USERS: UserProfile[] = [
  {
    uid: "admin_01",
    email: "admin@pawpulse.com",
    displayName: "Eleanor Vance (Hospital Director)",
    role: "admin",
    phoneNumber: "+1 (555) 019-2834",
    photoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    status: "active",
    createdAt: "2026-01-10T08:00:00.000Z",
  },
  {
    uid: "vet_01",
    email: "dr.sarah@pawpulse.com",
    displayName: "Dr. Sarah Jenkins, DVM",
    role: "veterinarian",
    phoneNumber: "+94 11 269 4512",
    photoURL: "/images/vets/dr-sarah-jenkins.jpg",
    status: "active",
    createdAt: "2026-01-15T09:30:00.000Z",
  },
  {
    uid: "vet_02",
    email: "dr.marcus@pawpulse.com",
    displayName: "Dr. Marcus Chen, BVSc",
    role: "veterinarian",
    phoneNumber: "+94 77 345 6789",
    photoURL: "/images/vets/dr-marcus-chen.jpg",
    status: "active",
    createdAt: "2026-02-01T10:00:00.000Z",
  },
  {
    uid: "vet_03",
    email: "dr.elena@pawpulse.com",
    displayName: "Dr. Elena Rostova, DVM",
    role: "veterinarian",
    phoneNumber: "+1 (555) 456-7890",
    photoURL: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-02-10T11:15:00.000Z",
  },
  {
    uid: "owner_01",
    email: "michael.scott@example.com",
    displayName: "Michael Scott",
    role: "petOwner",
    phoneNumber: "+1 (555) 890-1234",
    photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    status: "active",
    createdAt: "2026-03-01T14:20:00.000Z",
  },
  {
    uid: "owner_02",
    email: "emily.rose@example.com",
    displayName: "Emily Rose",
    role: "petOwner",
    phoneNumber: "+1 (555) 901-2345",
    photoURL: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    status: "active",
    createdAt: "2026-03-12T16:45:00.000Z",
  }
];

export const SEED_VETS: Veterinarian[] = [
  {
    uid: "vet_01",
    email: "dr.sarah@pawpulse.com",
    displayName: "Dr. Sarah Jenkins, DVM",
    role: "veterinarian",
    phoneNumber: "+94 11 269 4512",
    photoURL: "/images/vets/dr-sarah-jenkins.jpg",
    status: "active",
    createdAt: "2026-01-15T09:30:00.000Z",
    specialty: "Canine & Feline Internal Medicine",
    licenseNumber: "VET-WP-98421",
    clinicName: "PawPulse Central Animal Hospital",
    clinicAddress: "No. 42, Dharmapala Mawatha, Colombo 03",
    consultationFee: 2500,
    rating: 4.9,
    reviewCount: 128,
    experienceYears: 12,
    bio: "Passionate about preventive geriatric pet wellness, gastrointestinal diagnostics, and gentle fear-free handling techniques.",
    isApproved: true,
    availability: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: "09:00",
      endTime: "17:00",
      slotDurationMinutes: 30,
      daysOff: ["2026-09-20"]
    }
  },
  {
    uid: "vet_02",
    email: "dr.marcus@pawpulse.com",
    displayName: "Dr. Marcus Chen, BVSc",
    role: "veterinarian",
    phoneNumber: "+94 77 345 6789",
    photoURL: "/images/vets/dr-marcus-chen.jpg",
    status: "active",
    createdAt: "2026-02-01T10:00:00.000Z",
    specialty: "Orthopedic & Soft Tissue Surgery",
    licenseNumber: "VET-WP-84192",
    clinicName: "PawPulse Surgical Suites",
    clinicAddress: "No. 18, Hospital Road, Narahenpita, Colombo 05",
    consultationFee: 3500,
    rating: 4.8,
    reviewCount: 94,
    experienceYears: 15,
    bio: "Board-certified surgical specialist with extensive experience in TPLO, fracture fixation, arthroscopy, and minimally invasive procedures.",
    isApproved: true,
    availability: {
      daysOfWeek: [2, 3, 4, 5, 6],
      startTime: "08:30",
      endTime: "16:30",
      slotDurationMinutes: 45,
      daysOff: []
    }
  },
  {
    uid: "vet_03",
    email: "dr.elena@pawpulse.com",
    displayName: "Dr. Elena Rostova, DVM",
    role: "veterinarian",
    phoneNumber: "+94 77 456 7890",
    photoURL: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-02-10T11:15:00.000Z",
    specialty: "Exotic Animals & Avian Specialist",
    licenseNumber: "VET-CP-77123",
    clinicName: "PawPulse Exotic Pet Sanctuary",
    clinicAddress: "No. 7, Rajapihilla Road, Kandy",
    consultationFee: 3000,
    rating: 5.0,
    reviewCount: 76,
    experienceYears: 9,
    bio: "Dedicated to the unique pathology and nutritional needs of parrots, small mammals, reptiles, and amphibians.",
    isApproved: true,
    availability: {
      daysOfWeek: [1, 3, 5],
      startTime: "10:00",
      endTime: "18:00",
      slotDurationMinutes: 30,
      daysOff: []
    }
  },
  {
    uid: "vet_04",
    email: "dr.david@pawpulse.com",
    displayName: "Dr. David Miller, DVM",
    role: "veterinarian",
    phoneNumber: "+94 11 269 8901",
    photoURL: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-02-15T08:00:00.000Z",
    specialty: "Emergency Medicine & Critical Care",
    licenseNumber: "VET-WP-63841",
    clinicName: "PawPulse Emergency & ICU Center",
    clinicAddress: "No. 120, Baseline Road, Colombo 09",
    consultationFee: 4500,
    rating: 4.9,
    reviewCount: 112,
    experienceYears: 14,
    bio: "Director of PawPulse's 24/7 ICU triage and emergency trauma bays. Expert in critical care, advanced life support, and rapid multi-system triage.",
    isApproved: true,
    availability: {
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      startTime: "00:00",
      endTime: "23:59",
      slotDurationMinutes: 30,
      daysOff: []
    }
  },
  {
    uid: "vet_05",
    email: "dr.aris@pawpulse.com",
    displayName: "Dr. Aris Thorne, DVM",
    role: "veterinarian",
    phoneNumber: "+94 77 678 9012",
    photoURL: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-02-20T09:00:00.000Z",
    specialty: "Advanced Radiology & Diagnostic Imaging",
    licenseNumber: "VET-WP-52017",
    clinicName: "PawPulse Imaging & Diagnostics",
    clinicAddress: "No. 55, Deans Road, Colombo 10",
    consultationFee: 5000,
    rating: 4.8,
    reviewCount: 58,
    experienceYears: 11,
    bio: "Board-certified radiologist supervising high-definition CT, digital X-ray, and ultrasound diagnostics for rapid non-invasive internal pathology detection.",
    isApproved: true,
    availability: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: "08:00",
      endTime: "16:00",
      slotDurationMinutes: 45,
      daysOff: []
    }
  },
  {
    uid: "vet_06",
    email: "dr.chloe@pawpulse.com",
    displayName: "Dr. Chloe Adams, DVM",
    role: "veterinarian",
    phoneNumber: "+94 77 789 0123",
    photoURL: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-03-01T10:00:00.000Z",
    specialty: "Dermatology & Allergy Medicine",
    licenseNumber: "VET-SP-40293",
    clinicName: "PawPulse Skin & Allergy Clinic",
    clinicAddress: "No. 23, Galle Road, Dehiwala",
    consultationFee: 3200,
    rating: 4.7,
    reviewCount: 83,
    experienceYears: 8,
    bio: "Specialist in chronic skin allergies, autoimmune dermatological conditions, advanced laser otoscopy, and ear disease management in companion animals.",
    isApproved: true,
    availability: {
      daysOfWeek: [1, 2, 4, 5],
      startTime: "09:30",
      endTime: "17:30",
      slotDurationMinutes: 30,
      daysOff: []
    }
  },
  {
    uid: "vet_07",
    email: "dr.julian@pawpulse.com",
    displayName: "Dr. Julian Patel, BVSc",
    role: "veterinarian",
    phoneNumber: "+94 77 890 1234",
    photoURL: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-03-05T09:00:00.000Z",
    specialty: "Veterinary Dentistry & Oral Surgery",
    licenseNumber: "VET-SP-31759",
    clinicName: "PawPulse Dental & Oral Health",
    clinicAddress: "No. 10, Galle Road, Galle",
    consultationFee: 2800,
    rating: 4.9,
    reviewCount: 67,
    experienceYears: 10,
    bio: "Expert in preventive oral hygiene, restorative endodontics, ultrasonic scaling, and pain-free periodontal surgeries under safe inhalant anesthesia.",
    isApproved: true,
    availability: {
      daysOfWeek: [2, 3, 4, 5],
      startTime: "09:00",
      endTime: "17:00",
      slotDurationMinutes: 30,
      daysOff: []
    }
  },
  {
    uid: "vet_08",
    email: "dr.maya@pawpulse.com",
    displayName: "Dr. Maya Lin, DVM",
    role: "veterinarian",
    phoneNumber: "+94 77 901 2345",
    photoURL: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
    status: "active",
    createdAt: "2026-03-10T10:00:00.000Z",
    specialty: "Cardiology & Vascular Medicine",
    licenseNumber: "VET-WP-28834",
    clinicName: "PawPulse Heart & Vascular Center",
    clinicAddress: "No. 88, Kirimandala Mawatha, Colombo 05",
    consultationFee: 4000,
    rating: 4.8,
    reviewCount: 49,
    experienceYears: 7,
    bio: "Cardiology fellow specializing in Doppler echocardiography, congenital cardiac anomalies, arrhythmia management, and individualized cardiovascular therapy.",
    isApproved: true,
    availability: {
      daysOfWeek: [1, 3, 5],
      startTime: "09:00",
      endTime: "17:00",
      slotDurationMinutes: 45,
      daysOff: []
    }
  }
];

export const SEED_PETS: Pet[] = [
  {
    id: "pet_01",
    ownerId: "owner_01",
    ownerName: "Michael Scott",
    name: "Barnaby",
    species: "Dog",
    breed: "Golden Retriever",
    age: 4,
    gender: "Neutered Male",
    weight: 31.5,
    allergies: ["Chicken byproduct", "Flea bite hypersensitivity"],
    microchipNumber: "985-141-002-394-110",
    photoURL: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500",
    emergencyContact: {
      name: "Pam Beesly",
      relationship: "Co-owner / Friend",
      phone: "+1 (555) 998-1122"
    },
    createdAt: "2026-03-02T10:00:00.000Z"
  },
  {
    id: "pet_02",
    ownerId: "owner_01",
    ownerName: "Michael Scott",
    name: "Luna",
    species: "Cat",
    breed: "Russian Blue",
    age: 2,
    gender: "Spayed Female",
    weight: 4.2,
    allergies: ["None known"],
    microchipNumber: "985-141-002-394-889",
    photoURL: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500",
    emergencyContact: {
      name: "Jim Halpert",
      relationship: "Emergency Caretaker",
      phone: "+1 (555) 998-3344"
    },
    createdAt: "2026-03-05T14:30:00.000Z"
  },
  {
    id: "pet_03",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    name: "Mochi",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 1,
    gender: "Male",
    weight: 1.8,
    allergies: ["Alfalfa excess"],
    microchipNumber: "985-220-449-112-601",
    photoURL: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=500",
    emergencyContact: {
      name: "David Rose",
      relationship: "Brother",
      phone: "+1 (555) 777-8899"
    },
    createdAt: "2026-03-15T11:00:00.000Z"
  },
  {
    id: "pet_04",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    name: "Thor",
    species: "Dog",
    breed: "German Shepherd",
    age: 5,
    gender: "Neutered Male",
    weight: 38.0,
    allergies: ["Beef protein"],
    microchipNumber: "985-998-120-445-332",
    photoURL: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600",
    emergencyContact: {
      name: "David Rose",
      relationship: "Brother",
      phone: "+1 (555) 777-8899"
    },
    createdAt: "2026-03-16T12:00:00.000Z"
  }
];

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt_01",
    petId: "pet_01",
    petName: "Barnaby",
    petSpecies: "Dog",
    ownerId: "owner_01",
    ownerName: "Michael Scott",
    ownerEmail: "michael.scott@example.com",
    ownerPhone: "+1 (555) 890-1234",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    vetSpecialty: "Canine & Feline Internal Medicine",
    serviceType: "Annual Comprehensive Wellness Exam",
    dateTime: "2026-09-08T10:00:00.000Z",
    durationMinutes: 30,
    status: "confirmed",
    notes: "Barnaby has been scratching his left ear occasionally after swimming.",
    createdAt: "2026-09-01T09:00:00.000Z"
  },
  {
    id: "apt_02",
    petId: "pet_02",
    petName: "Luna",
    petSpecies: "Cat",
    ownerId: "owner_01",
    ownerName: "Michael Scott",
    ownerEmail: "michael.scott@example.com",
    ownerPhone: "+1 (555) 890-1234",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    vetSpecialty: "Canine & Feline Internal Medicine",
    serviceType: "Core Vaccination Booster (FVRCP)",
    dateTime: "2026-09-09T14:30:00.000Z",
    durationMinutes: 30,
    status: "pending",
    notes: "Due for routine booster shots. Please check dental tartar as well.",
    createdAt: "2026-09-04T12:15:00.000Z"
  },
  {
    id: "apt_03",
    petId: "pet_04",
    petName: "Thor",
    petSpecies: "Dog",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    ownerEmail: "emily.rose@example.com",
    ownerPhone: "+1 (555) 901-2345",
    vetId: "vet_02",
    vetName: "Dr. Marcus Chen, BVSc",
    vetSpecialty: "Orthopedic & Soft Tissue Surgery",
    serviceType: "Post-Operative Gait & Cruciate Evaluation",
    dateTime: "2026-09-10T11:00:00.000Z",
    durationMinutes: 45,
    status: "confirmed",
    notes: "6-week follow up check after minor ligament strain rehab.",
    createdAt: "2026-09-02T15:40:00.000Z"
  },
  {
    id: "apt_04",
    petId: "pet_03",
    petName: "Mochi",
    petSpecies: "Rabbit",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    ownerEmail: "emily.rose@example.com",
    ownerPhone: "+1 (555) 901-2345",
    vetId: "vet_03",
    vetName: "Dr. Elena Rostova, DVM",
    vetSpecialty: "Exotic Animals & Avian Specialist",
    serviceType: "Incisor Check & Digestive Wellness",
    dateTime: "2026-08-28T15:00:00.000Z",
    durationMinutes: 30,
    status: "completed",
    notes: "Regular dental wear review and GI motility checkup.",
    createdAt: "2026-08-20T10:10:00.000Z"
  }
];

export const SEED_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: "rec_01",
    petId: "pet_01",
    petName: "Barnaby",
    ownerId: "owner_01",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    visitDate: "2026-08-14T10:30:00.000Z",
    symptoms: "Mild erythema in left auditory canal, slight head shaking.",
    diagnosis: "Mild Otitis Externa (Bacterial/Yeast overgrowth)",
    treatment: "Deep canal antiseptic flush performed; topical suspension administered.",
    prescriptions: [
      {
        medicationName: "Otomax Otic Ointment",
        dosage: "4 drops into left ear",
        frequency: "Twice daily (BID)",
        duration: "7 days",
        instructions: "Gently massage base of ear after applying drops. Keep ear dry."
      }
    ],
    weightAtVisit: 31.4,
    labResults: "Cytology confirmed moderate Malassezia yeast organisms; no perforation.",
    followUpDate: "2026-08-28",
    notes: "Ear canal cleared exceptionally well. Owner advised to apply drying solution after swimming.",
    createdAt: "2026-08-14T11:15:00.000Z"
  },
  {
    id: "rec_02",
    petId: "pet_04",
    petName: "Thor",
    ownerId: "owner_02",
    vetId: "vet_02",
    vetName: "Dr. Marcus Chen, BVSc",
    visitDate: "2026-08-01T14:00:00.000Z",
    symptoms: "Right hind leg lameness grade 2/5 following sprint play.",
    diagnosis: "Mild Cranial Cruciate Ligament Partial Sprain (Grade 1)",
    treatment: "Conservative medical management: strict crate rest, cold compress, NSAID therapy.",
    prescriptions: [
      {
        medicationName: "Carprofen (Rimadyl)",
        dosage: "75 mg tablet",
        frequency: "Once daily with meal",
        duration: "14 days",
        instructions: "Administer with food. Monitor for GI sensitivity or decreased appetite."
      },
      {
        medicationName: "Dasuquin with MSM",
        dosage: "1 chewable tablet",
        frequency: "Once daily",
        duration: "60 days",
        instructions: "Joint chondroprotective supplement for cartilage maintenance."
      }
    ],
    weightAtVisit: 38.0,
    labResults: "Digital radiographs revealed mild joint effusion in right stifle; no avulsion fractures.",
    followUpDate: "2026-09-10",
    notes: "Patient is making steady recovery. 6-week gait evaluation scheduled.",
    createdAt: "2026-08-01T15:30:00.000Z"
  }
];

export const SEED_VACCINATIONS: VaccinationRecord[] = [
  {
    id: "vac_01",
    petId: "pet_01",
    petName: "Barnaby",
    ownerId: "owner_01",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    vaccineName: "Rabies 3-Year Core Vaccine",
    batchNumber: "DEF-RAB-9921",
    dateAdministered: "2025-09-15",
    nextDueDate: "2028-09-15",
    status: "valid",
    notes: "Administered right rear limb subcutaneous. Patient tolerated well.",
    createdAt: "2025-09-15T10:00:00.000Z"
  },
  {
    id: "vac_02",
    petId: "pet_01",
    petName: "Barnaby",
    ownerId: "owner_01",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    vaccineName: "DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)",
    batchNumber: "DHP-8812-B",
    dateAdministered: "2025-09-15",
    nextDueDate: "2026-09-15",
    status: "due",
    notes: "Annual booster due within 30 days.",
    createdAt: "2025-09-15T10:05:00.000Z"
  },
  {
    id: "vac_03",
    petId: "pet_02",
    petName: "Luna",
    ownerId: "owner_01",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    vaccineName: "FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)",
    batchNumber: "FEL-5541-A",
    dateAdministered: "2025-08-10",
    nextDueDate: "2026-08-10",
    status: "overdue",
    notes: "Overdue booster. Owner contacted to schedule appointment.",
    createdAt: "2025-08-10T11:00:00.000Z"
  },
  {
    id: "vac_04",
    petId: "pet_04",
    petName: "Thor",
    ownerId: "owner_02",
    vetId: "vet_02",
    vetName: "Dr. Marcus Chen, BVSc",
    vaccineName: "Bordetella Bronchiseptica (Kennel Cough)",
    batchNumber: "BOR-1029-C",
    dateAdministered: "2026-03-20",
    nextDueDate: "2027-03-20",
    status: "valid",
    notes: "Intranasal formulation administered.",
    createdAt: "2026-03-20T14:10:00.000Z"
  }
];

export const SEED_TIPS: PetCareTip[] = [
  {
    id: "tip_01",
    title: "10 Warning Signs Your Dog Needs an Emergency Vet Visit",
    slug: "warning-signs-emergency-vet-visit",
    excerpt: "Recognizing early symptoms like gastric dilatation-volvulus (bloat), laboured breathing, and pale gums can save your furry companion's life.",
    content: `When our pets fall ill, they cannot tell us where it hurts. Dogs in particular are instinctively conditioned to mask pain and weakness. Recognizing acute clinical distress early can make all the difference between a routine intervention and a life-threatening crisis.

### 1. Distended or Hard Abdomen with Retching (Bloat / GDV)
If your dog's abdomen feels tight like a drum and they attempt to vomit without producing anything besides white foam, seek emergency veterinary care immediately. Gastric Dilatation-Volvulus (GDV) is a hyper-acute condition requiring emergency decompression and surgery.

### 2. Respiratory Distress and Cyanotic Gums
Check your dog's oral mucous membranes. Healthy gums are bubblegum pink. White, grey, or blueish (cyanotic) gums indicate inadequate oxygen saturation or internal circulatory collapse.

### 3. Inability to Urinate or Straining
Particularly in male dogs and male felines, urethral blockage is a critical medical emergency. Inability to produce urine can lead to hyperkalemia and cardiac arrest within 24–48 hours.

### 4. Sudden Collapse, Stumbling, or Neurological Deficits
Sudden loss of motor control, head tilt, nystagmus (rapid flickering eye movements), or seizures lasting more than 2 minutes demand immediate triage.

Always keep your local 24/7 veterinary emergency hospital phone number and address saved in your phone or in your PawPulse emergency profile.`,
    category: "Emergency Care",
    coverImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Marcus Chen, BVSc",
    authorRole: "Chief Veterinary Surgeon",
    readTime: "5 min read",
    published: true,
    tags: ["Emergency", "Canine Health", "First Aid", "Triage"],
    createdAt: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "tip_02",
    title: "Canine Toxin Ingestion Guide: Chocolate, Xylitol, Lilies & First-Hour Protocols",
    slug: "canine-toxin-ingestion-emergency-protocol",
    excerpt: "Every second counts during accidental poisonings. Learn lethal dose thresholds for bakers chocolate, birch sugar (xylitol), grape nephrotoxins, and Easter lilies.",
    content: `Household toxins represent over 30% of emergency veterinary hospital admissions. Knowing what is toxic and what immediate steps to take can prevent permanent liver necrosis or renal shutdown.

### 1. Xylitol / Birch Sugar (Chewing Gum & Peanut Butter)
Xylitol triggers an immense, rapid release of insulin in canines, leading to profound hypoglycemia within 30 minutes, followed by acute hepatic failure. Always check peanut butter ingredient labels before filling treat toys.

### 2. Theobromine & Caffeine (Chocolate)
Dark baking chocolate and cocoa powder contain dangerous concentrations of theobromine. Signs include severe tachycardia, cardiac arrhythmias, muscle tremors, and hyperthermia.

### 3. True Lilies (Feline Renal Emergency)
All parts of Easter lilies, tiger lilies, and daylilies are exquisitely nephrotoxic to cats. Even grooming pollen grains off their fur can cause irreversible acute tubular necrosis within 48 hours.

### First-Hour Golden Protocol:
- Never induce vomiting with hydrogen peroxide without veterinary direction - this can cause severe hemorrhagic gastritis.
- Transport the animal with packaging or photos of the suspected toxin.
- Call your PawPulse emergency line immediately so antidotes and activated charcoal can be prepared prior to your arrival.`,
    category: "Emergency Care",
    coverImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Sarah Jenkins, DVM",
    authorRole: "Critical Care Lead",
    readTime: "6 min read",
    published: true,
    tags: ["Toxins", "Poisoning", "Emergency", "First Aid"],
    createdAt: "2026-08-05T11:20:00.000Z"
  },
  {
    id: "tip_03",
    title: "Comprehensive Feline Nutrition: Why Wet Food Matters for Kidney Longevity",
    slug: "feline-nutrition-kidney-longevity",
    excerpt: "Cats are obligate carnivores with a naturally low thirst drive. Discover how dietary moisture prevents chronic feline renal disease and lower urinary tract stones.",
    content: `Felines evolved from desert-dwelling wildcats (*Felis lybica*), acquiring virtually all of their daily metabolic hydration directly through the tissue of their prey. Domestic house cats retain this physiological trait: they possess a notoriously sluggish thirst trigger.

### The Problem with Exclusive Dry Kibble
Traditional commercial dry kibble contains merely 8% to 10% moisture content. Even cats who seem to drink frequently from fountains rarely compensate for the moisture deficit created by an exclusively dry diet. Over years, this chronic mild sub-clinical dehydration places cumulative stress on the nephrons of the kidneys.

### The Benefits of Moisture-Dense Feeding
- **Higher Glomerular Filtration:** Diluted urine minimizes the crystallization of struvite and calcium oxalate stones.
- **Lower Calorie Density:** Helps combat feline obesity, a primary risk factor for feline diabetes mellitus.
- **Improved Coat & Digestion:** Essential fatty acids in balanced wet recipes promote a lustrous coat and reduce hairball formation.

Transitioning your cat should always be gradual over 10 to 14 days to prevent digestive upset. Consult your veterinarian for tailored caloric requirements.`,
    category: "Nutrition",
    coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Sarah Jenkins, DVM",
    authorRole: "Feline Medicine Lead",
    readTime: "4 min read",
    published: true,
    tags: ["Feline", "Nutrition", "Renal Health", "Hydration"],
    createdAt: "2026-08-12T14:30:00.000Z"
  },
  {
    id: "tip_04",
    title: "Grain-Free vs. Grain-Inclusive Diets: The Science of DCM & Canine Heart Health",
    slug: "grain-free-dcm-heart-health-dogs",
    excerpt: "Examine the veterinary cardiology evidence linking high pulse legume formulations (peas, lentils, chickpeas) with non-hereditary dilated cardiomyopathy in canines.",
    content: `Over the past decade, grain-free pet food marketing exploded, presenting grains as unnatural fillers. However, peer-reviewed veterinary investigations spearheaded by the FDA and veterinary cardiologists revealed an unexpected trend: an increase in Dilated Cardiomyopathy (DCM) in breeds not genetically predisposed.

### What is Diet-Associated DCM?
DCM causes ventricular thinning and heart muscle dilation, severely compromising cardiac output and often culminating in congestive heart failure. Researchers identified a strong correlation with boutique, exotic-ingredient, and grain-free (BEG) diets containing heavy concentrations of legumes, peas, and potatoes.

### What Whole Grains Actually Provide
Wholesome grains like oats, brown rice, barley, and quinoa supply valuable complex carbohydrates, B-vitamins, and prebiotic fibers that nourish beneficial gut microbiomes.

### Veterinary Recommendations:
- Look for recipes formulated to meet **AAFCO feeding trials** rather than mere nutrient formulation.
- Avoid boutique formulas where legumes or peas appear in the first 5 ingredients.
- Schedule annual cardiac auscultation so your clinician can detect early murmurs or gallop rhythms.`,
    category: "Nutrition",
    coverImage: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Marcus Chen, BVSc",
    authorRole: "Internal Medicine Specialist",
    readTime: "5 min read",
    published: true,
    tags: ["Canine", "Nutrition", "Cardiology", "Diet"],
    createdAt: "2026-08-15T09:00:00.000Z"
  },
  {
    id: "tip_05",
    title: "Understanding Puppy & Kitten Vaccination Schedules in 2026",
    slug: "puppy-kitten-vaccination-schedule-guide",
    excerpt: "A complete guide to maternal antibody clearance, core vs. lifestyle vaccines, and why strict timing between boosters is critical for lifelong immunity.",
    content: `Vaccinating young puppies and kittens is one of the most cost-effective, life-saving measures available in modern veterinary medicine. However, many pet parents wonder why multiple booster doses are required every 3 to 4 weeks.

### Maternal Antibodies and the Immunity Gap
Newborn pets receive protective maternal antibodies through their mother's colostrum during the first 24 hours of nursing. While these maternal antibodies shield the neonate from infections, they also neutralize vaccine antigens before the young pet's immune system can build its own memory cells.

As maternal antibodies naturally decay between 6 and 16 weeks of age, a vulnerable window opens where the pet is susceptible to infection. Staggered boosters ensure immunity takes hold as soon as maternal antibodies drop.

### Core Canine Vaccinations
1. Rabies: Required by law in almost all jurisdictions.
2. DAPP / DHPP: Shields against Distemper, Adenovirus (Hepatitis), Parvovirus, and Parainfluenza.
3. Leptospirosis: Essential for dogs exposed to wildlife, puddles, or urban rodents.

Stay on schedule by checking your PawPulse pet dashboard for automated vaccination status updates.`,
    category: "Vaccinations",
    coverImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Sarah Jenkins, DVM",
    authorRole: "Preventive Care Specialist",
    readTime: "6 min read",
    published: true,
    tags: ["Vaccines", "Puppies", "Kittens", "Immunity"],
    createdAt: "2026-08-20T09:15:00.000Z"
  },
  {
    id: "tip_06",
    title: "Lifestyle & Non-Core Vaccines: Bordetella, Lyme Disease & Canine Influenza Explained",
    slug: "lifestyle-vaccines-lyme-bordetella-influenza",
    excerpt: "Determine whether your dog requires lifestyle immunizations based on boarding habits, regional tick density, dog parks, and grooming facility policies.",
    content: `While core vaccines (Rabies, Distemper, Parvovirus) are medically essential for every dog regardless of environment, non-core lifestyle vaccines should be customized to your pet's geographic exposure and social habits.

### 1. Bordetella Bronchiseptica (Kennel Cough)
Bordetella is a highly contagious bacterial pathogen causing tracheobronchitis, manifesting as a dry honking cough. Recommended every 6–12 months for dogs who frequent boarding kennels, daycares, agility trials, or grooming salons.

### 2. Borrelia Burgdorferi (Lyme Disease)
Transmitted by black-legged deer ticks (*Ixodes scapularis*). In tick-endemic regions, combining tick preventatives with the Lyme vaccine offers dual-barrier defense against polyarthritis, lameness, and Lyme nephritis.

### 3. Canine Influenza (H3N8 / H3N2)
Canine influenza causes severe respiratory symptoms and secondary bacterial pneumonia. Bivalent canine flu vaccines protect against both prevalent epidemic strains.

Consult your PawPulse veterinarian during annual wellness visits to configure your companion's personalized immunization matrix.`,
    category: "Vaccinations",
    coverImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Elena Rostova, DVM",
    authorRole: "Clinical Immunologist",
    readTime: "5 min read",
    published: true,
    tags: ["Vaccines", "Lyme Disease", "Kennel Cough", "Prevention"],
    createdAt: "2026-08-22T13:40:00.000Z"
  },
  {
    id: "tip_07",
    title: "Dental Disease in Pets: Silent Pain, Plaque Bacteria & Organ Damage Risks",
    slug: "pet-dental-disease-heart-health",
    excerpt: "Over 80% of dogs and cats over age three suffer from active periodontal disease. Uncover why bad breath is never normal and how oral bacteria impact heart valves and kidneys.",
    content: `Dental disease is the most under-diagnosed chronic medical condition in companion animals. Because pets continue to eat despite mouth pain, owners often overlook progressive gingivitis and subgingival root decay.

### The Hidden Iceberg: Subgingival Pathology
Over 60% of a tooth's structure lies submerged below the gumline. While teeth may appear superficially white, subgingival bacterial biofilms destroy periodontal ligaments and alveolar bone.

### Systemic Health Consequences:
- **Bacteremia:** Chewing on inflamed gums pushes oral bacteria into the bloodstream.
- **Valvular Endocarditis:** Bacteria colonize mitral heart valves, contributing to murmur progression.
- **Renal & Hepatic Stress:** Continuous bacterial filtration burdens the glomeruli and liver parenchyma.

### Best Practice Dental Protocol:
1. **Daily Enzymatic Brushing:** Use poultry- or malt-flavored enzymatic veterinary toothpaste (never human toothpaste containing fluoride).
2. **Annual Professional Prophylaxis:** Ultrasonic scaling, subgingival curettage, and computerized dental X-rays under safe inhalant anesthesia.`,
    category: "Health & Wellness",
    coverImage: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Marcus Chen, BVSc",
    authorRole: "Veterinary Dental Surgeon",
    readTime: "5 min read",
    published: true,
    tags: ["Dental", "Oral Health", "Wellness", "Preventative"],
    createdAt: "2026-08-24T10:30:00.000Z"
  },
  {
    id: "tip_08",
    title: "Senior Pet Mobility Guide: Arthritis Management, Joint Injections & Home Adaptations",
    slug: "senior-pet-arthritis-vitality-guide",
    excerpt: "Help your aging dog or cat thrive comfortably through multimodal osteoarthritis management, revolutionary monoclonal antibodies, and orthopedic environmental modifications.",
    content: `Watching our loyal companions grow old is a privilege, but osteoarthritis (degenerative joint disease) can silently erode their quality of life. Modern veterinary medicine offers unprecedented treatments to restore mobility and comfort.

### Subtle Signs of Joint Discomfort
- Reluctance to jump on furniture or ascend car stairs.
- Hesitation or stiffness upon waking from naps that 'warms out' during the day.
- Cat litter box accidents (rim too high to step over).
- Excessive licking over carpal or stifle joints.

### Multimodal Treatment Pyramid:
1. **Targeted Monoclonal Antibodies:** Next-generation bedinvetmab (Librela for dogs) and frunevetmab (Solensia for cats) neutralize Nerve Growth Factor (NGF), providing continuous monthly pain alleviation without organ strain.
2. **Nutraceutical Support:** High-potency Omega-3 fatty acids (EPA/DHA) and green-lipped mussel extract suppress inflammatory joint cytokines.
3. **Environmental Modifications:** Place non-slip rugs across hardwood floors, provide orthopedic memory foam bedding, and install gradual bedside ramps.`,
    category: "Health & Wellness",
    coverImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Sarah Jenkins, DVM",
    authorRole: "Geriatric Medicine Specialist",
    readTime: "6 min read",
    published: true,
    tags: ["Senior Pets", "Arthritis", "Joint Health", "Pain Management"],
    createdAt: "2026-08-26T15:10:00.000Z"
  },
  {
    id: "tip_09",
    title: "Fear-Free Handling: How to Reduce Vet Visit Anxiety for Dogs & Cats",
    slug: "fear-free-handling-vet-anxiety",
    excerpt: "Learn science-backed techniques using positive reinforcement, high-value rewards, and calm clinic environments to transform veterinary visits into stress-free experiences.",
    content: `Visiting the veterinary hospital should not feel like an ordeal. Fear-Free handling principles focus on managing emotional wellbeing alongside physical health.

### Preparation Starts at Home
1. **The Carrier is Not a Trap:** Leave your cat's carrier open in the living room with soft bedding and treats weeks before the visit.
2. **Desensitize Paw & Ear Touching:** Spend 2 minutes daily gently touching your pet's paws, ears, and belly paired with praise and high-value treats.
3. **Calming Pheromones:** Use synthetic pheromone sprays (like Feliway for cats or Adaptil for dogs) on a towel inside the carrier 15 minutes before travel.

At PawPulse, our certified fear-free veterinary staff uses non-slip table pads, warm towels, and soothing acoustic melodies to keep your pet serene.`,
    category: "Training & Behavior",
    coverImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
    authorName: "Dr. Elena Rostova, DVM",
    authorRole: "Behavioral & Exotic Specialist",
    readTime: "4 min read",
    published: true,
    tags: ["Behavior", "Fear Free", "Anxiety", "Training"],
    createdAt: "2026-08-28T16:00:00.000Z"
  },
  {
    id: "tip_10",
    title: "Separation Anxiety in Dogs: Systematic Desensitization, Enrichment & Calming Protocols",
    slug: "separation-anxiety-dogs-desensitization-guide",
    excerpt: "Distinguish true separation distress from canine boredom. Implement departure cue desensitization, puzzle enrichment protocols, and safe alone-time milestones.",
    content: `Canine separation anxiety is a panic disorder triggered by being left alone or separated from specific attachment figures. Dogs experiencing separation distress are in a state of neurochemical panic, not acting out of malice or spite.

### Recognizing True Separation Anxiety
- Persistent vocalization (howling, barking) commencing within 10–15 minutes of departure.
- Destructive chewing concentrated specifically around exit points (door frames, window sills).
- Excessive hypersalivation, lip-licking, pacing, or indoor elimination despite house-training.

### The 4-Pillar Behavioral Solution:
1. Desensitize Departure Cues: Pick up car keys, put on your shoes, or touch the front doorknob, then sit back on the couch without leaving. This uncouples cues from panic.
2. High-Value Licking Enrichment: Offer frozen Kong toys filled with wet food, plain pumpkin, or xylitol-free peanut butter upon stepping out. Licking releases endorphins and reduces cortisol.
3. Gradual Alone-Time Sub-Threshold Increments: Start with 30-second absences, returning before anxiety spikes. Build duration progressively.
4. Veterinary Behavioral Consult: For moderate to severe cases, your PawPulse clinician can evaluate situational medication to facilitate learning during training.`,
    category: "Training & Behavior",
    coverImage: "https://i.pinimg.com/736x/4d/a4/ca/4da4cab4e1daa78413d5d4df135b69e8.jpg",
    authorName: "Dr. Elena Rostova, DVM",
    authorRole: "Animal Behaviorist",
    readTime: "5 min read",
    published: true,
    tags: ["Behavior", "Separation Anxiety", "Training", "Canine Psychology"],
    createdAt: "2026-08-30T12:00:00.000Z"
  }
];

export const SEED_REVIEWS: Review[] = [
  {
    id: "rev_01",
    vetId: "vet_01",
    vetName: "Dr. Sarah Jenkins, DVM",
    ownerId: "owner_01",
    ownerName: "Michael Scott",
    appointmentId: "apt_01",
    rating: 5,
    comment: "Dr. Jenkins was incredible with Barnaby! She was so gentle when cleaning his irritated ear and explained everything clearly. Barnaby was calm and didn't even flinch.",
    response: "Thank you so much, Michael! Barnaby was an absolute delight to examine. Glad his ear is feeling brand new!",
    createdAt: "2026-08-16T14:22:00.000Z"
  },
  {
    id: "rev_02",
    vetId: "vet_02",
    vetName: "Dr. Marcus Chen, BVSc",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    appointmentId: "apt_03",
    rating: 5,
    comment: "Dr. Chen's surgical and orthopedic expertise is unmatched. He saved Thor from unnecessary surgery with his conservative rehab protocol. Thor is almost back to full sprint!",
    response: "Emily, thank you for being so diligent with Thor's rest regimen. Looking forward to our final 6-week follow up check!",
    createdAt: "2026-08-10T18:05:00.000Z"
  },
  {
    id: "rev_03",
    vetId: "vet_03",
    vetName: "Dr. Elena Rostova, DVM",
    ownerId: "owner_02",
    ownerName: "Emily Rose",
    appointmentId: "apt_04",
    rating: 5,
    comment: "Finding a true rabbit specialist in the city is rare. Dr. Rostova examined Mochi with such precision and gave great digestive hay recommendations.",
    response: "Thank you Emily! Mochi's incisors and gut motility look great. Give that sweet lop a gentle head scratch for me!",
    createdAt: "2026-08-30T11:45:00.000Z"
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_01",
    userId: "owner_01",
    title: "Appointment Reminder: Tomorrow at 10:00 AM",
    message: "Reminder: Barnaby's Annual Wellness Exam with Dr. Sarah Jenkins is scheduled for tomorrow at 10:00 AM.",
    type: "appointment_reminder",
    isRead: false,
    link: "/portal/appointments",
    createdAt: "2026-09-07T08:00:00.000Z"
  },
  {
    id: "notif_02",
    userId: "owner_01",
    title: "Vaccination Due Soon: Barnaby (DHPP)",
    message: "Barnaby's DHPP core vaccination booster is due on Sept 15, 2026. Schedule a booster appointment today.",
    type: "vaccination_due",
    isRead: false,
    link: "/portal/records",
    createdAt: "2026-09-05T09:30:00.000Z"
  },
  {
    id: "notif_03",
    userId: "owner_01",
    title: "Vaccination Overdue: Luna (FVRCP)",
    message: "Luna's FVRCP booster was due on Aug 10, 2026 and is now overdue. Please protect your feline friend by scheduling an update.",
    type: "vaccination_due",
    isRead: true,
    link: "/portal/records",
    createdAt: "2026-08-11T10:00:00.000Z"
  },
  {
    id: "notif_04",
    userId: "vet_01",
    title: "New Appointment Request",
    message: "Michael Scott requested a booking for Luna (FVRCP Booster) on Sept 9, 2026 at 2:30 PM.",
    type: "booking_confirmed",
    isRead: false,
    link: "/vet-dashboard/appointments",
    createdAt: "2026-09-04T12:16:00.000Z"
  },
  {
    id: "notif_05",
    userId: "admin_01",
    title: "System Alert: Monthly Metrics Updated",
    message: "Clinic bookings up 18% month-over-month with 99.4% positive patient review ratings.",
    type: "system_alert",
    isRead: true,
    link: "/admin-dashboard",
    createdAt: "2026-09-01T08:00:00.000Z"
  }
];
