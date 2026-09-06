# 🐾 PawPulse VetCare — Production Veterinary Booking & Hospital Management System

> **Compassionate Care, Modern Veterinary Precision.**  
> A production-ready, full-stack pet care and veterinary booking platform built with **Next.js 14**, **Tailwind CSS**, and **Firebase** (Firestore, Authentication, Storage, and Cloud Functions).

---

## 🌟 Platform Overview

**PawPulse VetCare** is an AAHA-accredited digital hospital platform connecting pet parents, veterinary clinicians, and hospital administrators in a unified, role-based ecosystem.

- **Public-Facing Website**: Hero with instant appointment scheduler, clinical services directory, board-certified veterinarian search & filtering, categorized pet care guides, customer reviews, and 24/7 emergency triage hotlines.
- **Pet Owner Self-Service Portal**: Multi-pet digital health passports, microchip & allergy trackers, live appointment booking, digital vaccination records with status badges, doctor clinical exam dossiers, electronic prescriptions, and emergency caretaker management.
- **Veterinarian Clinical Console**: Real-time appointment queue with status lifecycle management (`Pending` ➔ `Confirmed` ➔ `In-Progress` ➔ `Completed` / `Cancelled`), patient directory with medical dossier inspections, clinical consultation logging with prescription dosage builders, vaccination administration with automatic next booster calculations, and custom office hour / blackout date scheduling.
- **Hospital Administration Center**: Executive KPIs (total users, vets, pets, active appointments, vaccination alerts, client satisfaction metrics), user access control, veterinarian credential verification & approval workflows, appointment master ledger with doctor reassignment, pet care tips CMS editor, review moderation with official clinic replies, and system-wide broadcast dispatch.
- **Automated Notification Engine**: Triggers for 24-hour appointment reminders, upcoming & overdue vaccination alerts, real-time booking confirmations, and new clinical record updates via Firebase Cloud Functions and in-app notification centers.

---

## 🏗 Project Architecture & Folder Organization

The codebase is organized into cleanly separated modules matching strict production standards:

```
VetCare-Website/
├── app/                              # Next.js 14 App Router
│   ├── (website)/                    # Public website & pet owner self-service portal
│   │   ├── page.tsx                  # Home page (Hero, Services, Vets, Reviews, Emergency)
│   │   ├── about/page.tsx            # Clinical mission, equipment, values, timeline
│   │   ├── services/page.tsx         # Specialized medical services directory
│   │   ├── find-a-vet/page.tsx       # Search & filter specialists with booking modal
│   │   ├── pet-care-tips/            # Educational articles & guides
│   │   │   ├── page.tsx              # Categorized articles catalog
│   │   │   └── [slug]/page.tsx       # Full article detail with author credentials
│   │   ├── contact/page.tsx          # Contact inquiry form, clinic locations & FAQs
│   │   ├── login/page.tsx            # Unified login with 1-click demo role pre-fill
│   │   ├── register/page.tsx         # Role-based onboarding (Owner vs Doctor)
│   │   └── portal/                   # Pet Owner Portal
│   │       ├── pets/page.tsx         # Pet profile management (add, edit, microchip, weight)
│   │       ├── appointments/page.tsx # Booking history, cancellations & vet reviews
│   │       ├── records/page.tsx      # Vaccination passport & medical exam notes
│   │       └── emergency/page.tsx    # Emergency contacts & first-aid protocols
│   ├── admin-dashboard/              # Hospital Administration Panel
│   │   ├── page.tsx                  # 6 Executive KPIs & live appointment feed
│   │   ├── users/page.tsx            # Pet parent management & status deactivation
│   │   ├── veterinarians/page.tsx    # Doctor credential approvals & status toggles
│   │   ├── appointments/page.tsx     # Master ledger with doctor reassignment
│   │   ├── pet-care-tips/page.tsx    # Knowledge base CMS editor
│   │   ├── reviews/page.tsx          # Review moderation & hospital replies
│   │   └── notifications/page.tsx    # System broadcast & alert dispatcher
│   ├── vet-dashboard/                # Veterinarian Clinical Console
│   │   ├── page.tsx                  # Doctor KPIs, triage queue, vaccine alerts
│   │   ├── appointments/page.tsx     # Full queue with status lifecycle actions
│   │   ├── patients/page.tsx         # Patient directory with dossier inspection
│   │   ├── medical-records/page.tsx  # Record clinical consults with Rx builder
│   │   ├── vaccinations/page.tsx     # Administer vaccines & calculate due dates
│   │   ├── availability/page.tsx     # Shift schedule, slot duration & days off
│   │   └── profile/page.tsx          # Doctor credentials, bio, and rates
│   ├── layout.tsx                    # Root layout with providers & DemoBar
│   └── globals.css                   # Tailwind base styles and custom scrollbars
├── website/                          # Public-facing components
│   └── components/
│       ├── Navbar.tsx                # Responsive navigation with badge counter
│       ├── Footer.tsx                # Hospital hours, AAHA badges, emergency line
│       ├── Logo.tsx                  # Brand SVG veterinary heartbeat cross
│       ├── DemoBar.tsx               # Top floating 1-click role switcher
│       ├── NotificationDropdown.tsx  # In-app notification bell center
│       └── BookingModal.tsx          # Interactive booking modal with time slots
├── lib/                              # Shared Utilities & Business Logic (Root Level)
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Session persistence & quick role switching
│   │   └── NotificationContext.tsx   # Real-time reminder engine & badge counter
│   ├── firebase/
│   │   ├── config.ts                 # Firebase client SDK initialization
│   │   ├── firestore.ts              # Typed Firestore CRUD service
│   │   ├── mock-fallback.ts          # Resilient local storage persistence engine
│   │   └── seed.ts                   # Realistic pre-populated hospital seed data
│   ├── types/
│   │   └── index.ts                  # Comprehensive TypeScript data models
│   └── utils/
│       └── index.ts                  # Date formatting, vaccine status math, badge helpers
├── functions/                        # Firebase Cloud Functions (Node.js/TypeScript)
│   ├── src/
│   │   └── index.ts                  # 24h reminders cron, vaccine alerts, Firestore triggers
│   ├── package.json
│   └── tsconfig.json
├── firestore.rules                   # Role-Based Access Control (RBAC) rules
├── firestore.indexes.json            # Firestore query compound indexes
├── firebase.json                     # Firebase Hosting SSR & Functions configuration
└── .env.example                      # Firebase environment variables template
```

---

## 🛠 Technology Stack

- **Frontend**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS (with custom teal & coral medical palette)
- **Icons**: Lucide React
- **Date Engine**: `date-fns` (time calculations, 24h reminder math, vaccine validity)
- **Database & Auth**: Firebase Firestore + Firebase Authentication (RBAC)
- **Serverless Backend**: Firebase Cloud Functions (v2, Node.js, Pub/Sub cron triggers)
- **Image Optimization**: `next/image` with WebP auto-conversion and responsive sizes
- **Hosting**: Firebase Hosting with SSR support

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- **Node.js**: v18.0 or newer (`node -v`)
- **npm**: v9.0 or newer

### 2. Installation
```bash
# Clone or navigate to the project directory
cd VetCare-Website

# Install dependencies
npm install
```

### 3. Running the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!TIP]
> **Zero-Config Interactive Demo Mode**:  
> The project includes a built-in resilient mock engine and seed dataset (`lib/firebase/seed.ts`). You can immediately test all 3 portals (Pet Owner, Veterinarian, and Admin) and test bookings, clinical records, and notifications out-of-the-box without configuring live Firebase credentials!

---

## 🎭 Role-Based Demo Switcher

The top **Interactive Demo Bar** allows you to switch between roles with a single click:

| Role | Default Demo User | Capabilities |
| :--- | :--- | :--- |
| **Pet Owner** | `michael.scott@example.com` | View pets (Barnaby, Luna), book visits, view vaccine passports & clinical records, manage emergency contacts |
| **Veterinarian** | `dr.sarah@pawpulse.com` | View appointment triage queue, log clinical diagnoses & prescriptions, administer vaccines, set hours |
| **Admin** | `admin@pawpulse.com` | Executive KPI dashboard, verify doctors, manage pet parents, reassign appointments, publish articles, moderate reviews |

You can also click the **Reset Database** button in the top bar anytime to restore fresh seed records.

---

## 🔒 Firebase Configuration & Deployment

### 1. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/):
```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789012"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789012:web:abcdef"
```

### 2. Deploying Firestore Security Rules & Indexes
```bash
firebase deploy --only firestore:rules,firestore:indexes
```

### 3. Deploying Cloud Functions
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

### 4. Deploying to Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

---

## 🧪 Verification & Build

To test production build compilation:
```bash
npm run build
```
This validates all TypeScript types, route trees, and CSS output.

---

## 📄 License
Created for professional veterinary clinic demonstration. All rights reserved.