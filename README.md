# 🐾 PawPulse VetCare

> **Compassionate Care, Modern Veterinary Precision.**

A modern, production-ready **veterinary booking and hospital management platform** designed to connect pet owners, veterinarians, and hospital administrators through a unified digital ecosystem.

PawPulse VetCare provides online appointment booking, pet health records, vaccination management, veterinarian scheduling, clinical consultation management, emergency support, educational pet-care content, reviews, notifications, and a comprehensive administration system.

Built with **Next.js 14, React, TypeScript, Tailwind CSS, and Firebase**.

---

# 🌟 Platform Overview

**PawPulse VetCare** is a full-stack digital veterinary platform designed to simplify pet healthcare management and improve communication between pet parents, veterinary professionals, and hospital administrators.

The platform consists of four major areas:

### 🌐 Public Website

The public-facing website provides:

* Modern veterinary clinic landing page
* Hero section with appointment scheduler
* Veterinary services directory
* Veterinarian search and filtering
* Pet-care educational guides
* Customer reviews
* Emergency information
* 24/7 emergency triage hotline
* Clinic information
* Contact forms
* Frequently Asked Questions

### 🐶 Pet Owner Portal

Pet owners can:

* Create and manage multiple pet profiles
* Store pet health information
* Manage microchip information
* Track allergies
* Record pet weight
* Book veterinary appointments
* View appointment history
* Cancel appointments
* Review veterinarians
* View vaccination records
* View medical records
* View clinical examination notes
* View electronic prescriptions
* Manage emergency caretaker information

### 👨‍⚕️ Veterinarian Clinical Console

Veterinarians can:

* View appointment queues
* Manage appointment statuses
* View patient directories
* Inspect patient medical dossiers
* Record clinical consultations
* Create prescriptions
* Record diagnoses
* Administer vaccinations
* Automatically calculate future booster dates
* Configure working hours
* Configure blackout dates
* Manage availability
* Update professional profiles

### 🏥 Hospital Administration Center

Administrators can:

* View executive KPIs
* Manage users
* Verify veterinarian credentials
* Approve veterinarians
* Manage appointments
* Reassign appointments
* Manage pet-care articles
* Moderate customer reviews
* Reply to reviews
* Send system-wide notifications
* Manage hospital operations

The platform also includes automated notifications for appointment reminders, vaccination alerts, booking confirmations, and clinical record updates.

---

# ✨ Key Features

## 🐾 Pet Owner Features

* Multi-pet management
* Digital pet health passports
* Pet profile management
* Microchip tracking
* Allergy tracking
* Weight tracking
* Online appointment booking
* Appointment history
* Appointment cancellation
* Veterinarian reviews
* Digital vaccination records
* Vaccination status badges
* Medical examination records
* Clinical notes
* Electronic prescriptions
* Emergency caretaker management
* Emergency first-aid information
* In-app notifications

---

## 📅 Appointment Management

PawPulse provides a complete appointment lifecycle:

```text
Pending
   ↓
Confirmed
   ↓
In-Progress
   ↓
Completed
```

Appointments can also be cancelled:

```text
Pending / Confirmed
        ↓
    Cancelled
```

Veterinarians can manage their appointment queue while administrators can access the master appointment ledger and reassign appointments when required.

---

# 👨‍⚕️ Veterinarian Features

Veterinarians have access to a dedicated clinical console containing:

* Dashboard KPIs
* Appointment triage queue
* Patient directory
* Medical dossiers
* Clinical consultation records
* Diagnosis recording
* Prescription builder
* Vaccination administration
* Automatic booster-date calculation
* Office-hour management
* Shift scheduling
* Blackout dates
* Days-off management
* Professional profile management
* Biography
* Consultation rates

---

# 💉 Vaccination Management

The vaccination module allows veterinarians to:

* Record administered vaccines
* View vaccination history
* Track vaccine validity
* Calculate next booster dates automatically
* Identify upcoming vaccinations
* Identify overdue vaccinations
* Display vaccination alerts

Example workflow:

```text
Veterinarian
     ↓
Select Patient
     ↓
Administer Vaccine
     ↓
Record Vaccination
     ↓
Calculate Next Booster
     ↓
Store Vaccination Record
     ↓
Generate Reminder
```

---

# 🏥 Admin Dashboard

The Hospital Administration Center provides a centralized management dashboard.

### Executive KPIs

The dashboard can display:

* Total Users
* Total Veterinarians
* Total Pets
* Active Appointments
* Vaccination Alerts
* Client Satisfaction Metrics

### Administrative Functions

* User Management
* Veterinarian Management
* Credential Verification
* Appointment Management
* Doctor Reassignment
* Pet-Care Tips CMS
* Review Moderation
* Hospital Replies
* System Notifications
* Access Control

---

# ⭐ Reviews & Ratings

Pet owners can submit reviews for veterinarians and hospital services.

Administrators can:

* Review submitted feedback
* Moderate reviews
* Publish or manage reviews
* Respond officially on behalf of the hospital

This helps improve transparency and build trust with pet owners.

---

# 📚 Pet Care Tips

The website includes an educational knowledge base where pet owners can access categorized articles and guides.

The system supports:

* Article categories
* Pet-care guides
* Article detail pages
* Article authors
* Author credentials
* Content management
* Admin publishing

Administrators can manage educational content through the built-in CMS interface.

---

# 🚨 Emergency Support

PawPulse provides dedicated emergency support information including:

* Emergency triage hotline
* Emergency contact management
* First-aid protocols
* Emergency caretaker information
* Emergency guidance

> **Important:** Emergency information provided through the website is intended to support communication and triage. It should not replace professional veterinary diagnosis or treatment.

---

# 🔔 Automated Notification System

PawPulse includes an automated notification engine powered by Firebase Cloud Functions.

The notification system supports:

### Appointment Notifications

* Booking confirmations
* 24-hour appointment reminders
* Appointment status updates

### Vaccination Notifications

* Upcoming vaccination alerts
* Overdue vaccination alerts
* Booster reminders

### Clinical Notifications

* New clinical record updates
* Medical record notifications

### System Notifications

* Hospital-wide broadcasts
* Administrative alerts

The backend uses Cloud Functions and in-app notification centers to automate these workflows.

---

# 👥 User Roles

PawPulse supports three primary user roles.

## 🐶 Pet Owner

Pet owners can:

* Manage pets
* Book appointments
* View appointments
* View medical records
* View vaccinations
* Manage emergency contacts
* Review veterinarians
* Receive notifications

---

## 👨‍⚕️ Veterinarian

Veterinarians can:

* Manage appointments
* View patients
* Access medical dossiers
* Record consultations
* Create prescriptions
* Administer vaccinations
* Manage availability
* Update their profiles

---

## 👨‍💼 Administrator

Administrators can:

* Manage users
* Manage veterinarians
* Verify credentials
* Approve veterinarians
* Manage appointments
* Reassign doctors
* Manage educational content
* Moderate reviews
* Send system notifications
* Monitor hospital KPIs

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     Pet Owners      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Website   │
                    │   App Router / UI   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Pet Owner Portal   Vet Dashboard    Admin Dashboard
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Firebase      │
                    ├─────────────────────┤
                    │ Firestore           │
                    │ Authentication      │
                    │ Storage             │
                    │ Cloud Functions     │
                    └─────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Automated Services  │
                    │ Notifications       │
                    │ Reminders           │
                    │ Vaccine Alerts      │
                    └─────────────────────┘
```

---

# 📂 Project Structure

```text
VetCare-Website/
│
├── app/
│   ├── (website)/
│   │   ├── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── find-a-vet/
│   │   │   └── page.tsx
│   │   ├── pet-care-tips/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   │
│   │   └── portal/
│   │       ├── pets/
│   │       │   └── page.tsx
│   │       ├── appointments/
│   │       │   └── page.tsx
│   │       ├── records/
│   │       │   └── page.tsx
│   │       └── emergency/
│   │           └── page.tsx
│   │
│   ├── admin-dashboard/
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── veterinarians/
│   │   ├── appointments/
│   │   ├── pet-care-tips/
│   │   ├── reviews/
│   │   └── notifications/
│   │
│   ├── vet-dashboard/
│   │   ├── page.tsx
│   │   ├── appointments/
│   │   ├── patients/
│   │   ├── medical-records/
│   │   ├── vaccinations/
│   │   ├── availability/
│   │   └── profile/
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── website/
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Logo.tsx
│       ├── DemoBar.tsx
│       ├── NotificationDropdown.tsx
│       └── BookingModal.tsx
│
├── lib/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── NotificationContext.tsx
│   │
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── firestore.ts
│   │   ├── mock-fallback.ts
│   │   └── seed.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       └── index.ts
│
├── functions/
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── firestore.rules
├── firestore.indexes.json
├── firebase.json
├── .env.example
├── package.json
└── README.md
```

The project structure separates public pages, owner functionality, veterinary clinical functionality, administrative functionality, shared utilities, Firebase services, and Cloud Functions.

---

# 🛠️ Technology Stack

| Technology                   | Purpose                       |
| ---------------------------- | ----------------------------- |
| **Next.js 14**               | Full-stack React framework    |
| **React 18**                 | User interface                |
| **TypeScript**               | Type-safe development         |
| **Tailwind CSS**             | Responsive styling            |
| **Lucide React**             | UI icons                      |
| **date-fns**                 | Date and time calculations    |
| **Firebase Firestore**       | Cloud database                |
| **Firebase Authentication**  | Authentication & RBAC         |
| **Firebase Storage**         | File and image storage        |
| **Firebase Cloud Functions** | Serverless backend automation |
| **Node.js**                  | Cloud Functions runtime       |
| **Pub/Sub Cron**             | Scheduled notification jobs   |
| **Firebase Hosting**         | Application hosting           |
| **next/image**               | Image optimization            |

---

# 🔐 Authentication & Security

PawPulse uses Firebase Authentication and role-based access control.

Security features include:

* Firebase Authentication
* Role-based authorization
* Firestore Security Rules
* Protected dashboards
* User status management
* Veterinarian verification
* Admin-only functionality
* Secure clinical data access

The Firestore rules provide role-based access control while compound indexes support efficient database queries.

---

# 🔥 Firebase Architecture

The system uses Firebase as its backend infrastructure.

### Firebase Services

```text
Firebase
│
├── Authentication
│   └── User Login / Registration
│
├── Firestore
│   └── Application Database
│
├── Storage
│   └── Images & Files
│
├── Cloud Functions
│   ├── Appointment Reminders
│   ├── Vaccination Alerts
│   ├── Firestore Triggers
│   └── Automated Notifications
│
└── Hosting
    └── Application Deployment
```

---

# ⚡ Mock / Demo Mode

The application includes a resilient local mock engine and seeded demo data.

This allows developers to test the application without immediately configuring live Firebase credentials.

The demo environment supports:

* Pet Owner Portal
* Veterinarian Portal
* Admin Dashboard
* Appointment booking
* Medical records
* Vaccination records
* Notifications

A reset option is also available to restore the initial seeded dataset.

---

# 🎭 Demo Accounts

The interactive demo switcher supports three predefined roles.

| Role               | Demo User                   | Main Capabilities                                                                  |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| 🐶 Pet Owner       | `michael.scott@example.com` | Manage pets, appointments, vaccinations and clinical records                       |
| 👨‍⚕️ Veterinarian | `dr.sarah@pawpulse.com`     | Manage appointments, diagnoses, prescriptions, vaccinations and availability       |
| 👨‍💼 Admin        | `admin@pawpulse.com`        | Manage users, veterinarians, appointments, articles, reviews and system operations |

The top Demo Bar allows quick switching between these roles.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm 9+
* Git
* Firebase CLI for deployment

Check your installed versions:

```bash
node -v
npm -v
```

The project requires Node.js 18 or newer and npm 9 or newer.

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/pawpulse-vetcare.git
```

Navigate to the project:

```bash
cd pawpulse-vetcare
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

---

# ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
```

You can obtain these values from the Firebase Console.

The project includes `.env.example` as the environment-variable template.

---

# 🔥 Firebase Setup

## 1. Create Firebase Project

Create a new Firebase project and configure:

* Authentication
* Firestore
* Storage
* Cloud Functions
* Hosting

---

## 2. Configure Firestore

Deploy Firestore security rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

---

## 3. Configure Cloud Functions

Navigate to the functions directory:

```bash
cd functions
```

Install dependencies:

```bash
npm install
```

Build the functions:

```bash
npm run build
```

Return to the root directory:

```bash
cd ..
```

Deploy:

```bash
firebase deploy --only functions
```

---

# 🌍 Deployment

Build the application:

```bash
npm run build
```

Deploy to Firebase Hosting:

```bash
firebase deploy --only hosting
```

---

# 🧪 Testing & Verification

Before production deployment, test:

### Public Website

* Homepage
* Navigation
* Services
* Find-a-Vet
* Pet-care articles
* Contact forms
* Emergency information

### Pet Owner Portal

* Registration
* Login
* Pet creation
* Pet editing
* Appointment booking
* Appointment cancellation
* Medical records
* Vaccination records
* Emergency contacts

### Veterinarian Console

* Login
* Appointment queue
* Appointment status updates
* Patient records
* Clinical consultation
* Prescription creation
* Vaccination administration
* Booster calculation
* Availability management

### Admin Dashboard

* User management
* Veterinarian verification
* Appointment management
* Doctor reassignment
* Article management
* Review moderation
* Notification broadcasting

### Build Verification

Run:

```bash
npm run build
```

This verifies TypeScript compilation, route trees, and CSS output.

---

# 📊 Application Workflow

## Pet Owner Workflow

```text
Visit Website
     ↓
Find a Veterinarian
     ↓
Select Service / Doctor
     ↓
Select Date & Time
     ↓
Book Appointment
     ↓
Booking Confirmation
     ↓
Appointment Reminder
     ↓
Veterinary Consultation
     ↓
Medical Record Updated
     ↓
Prescription / Vaccination
     ↓
Future Reminder
```

---

# 👨‍⚕️ Clinical Workflow

```text
Appointment Pending
        ↓
Appointment Confirmed
        ↓
Patient Arrives
        ↓
Consultation In-Progress
        ↓
Clinical Examination
        ↓
Diagnosis
        ↓
Prescription
        ↓
Vaccination if Required
        ↓
Medical Record Updated
        ↓
Appointment Completed
```

---

# 💉 Vaccination Workflow

```text
Select Pet
    ↓
View Vaccination History
    ↓
Administer Vaccine
    ↓
Save Vaccination Record
    ↓
Calculate Next Booster Date
    ↓
Schedule Reminder
    ↓
Notify Pet Owner
```

---

# 🔔 Notification Workflow

```text
Database Event
      ↓
Firebase Cloud Function
      ↓
Process Notification
      ↓
Create Notification
      ↓
In-App Notification Center
      ↓
Pet Owner / Veterinarian / Admin
```

---

# 📱 Responsive Design

PawPulse is designed as a responsive veterinary platform with support for:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface uses Tailwind CSS and responsive layouts to provide consistent experiences across screen sizes.

---

# 🖼️ Image Optimization

The platform uses Next.js `next/image` for optimized image delivery.

Benefits include:

* Responsive images
* Optimized image loading
* Reduced bandwidth usage
* Better page performance
* Modern image formats

The documented stack specifically uses `next/image` with responsive sizing and WebP optimization.

---

# 📈 Performance

Performance is supported through:

* Next.js App Router
* Optimized images
* Responsive image sizing
* Code organization
* Firebase infrastructure
* Efficient Firestore queries
* Compound indexes
* Serverless Cloud Functions

---

# 🩺 Core Modules

| Module              | Description                               |
| ------------------- | ----------------------------------------- |
| 🏠 Website          | Public veterinary clinic website          |
| 🐶 Pet Management   | Multi-pet profile management              |
| 📅 Appointments     | Online veterinary booking                 |
| 👨‍⚕️ Veterinarians | Doctor discovery and management           |
| 📋 Medical Records  | Digital clinical records                  |
| 💉 Vaccinations     | Vaccine tracking and reminders            |
| 🚨 Emergency        | Emergency contacts and first-aid guidance |
| 📚 Pet Care Tips    | Educational knowledge base                |
| ⭐ Reviews           | Customer reviews and moderation           |
| 🔔 Notifications    | Automated alerts and reminders            |
| 👨‍💼 Admin         | Hospital administration                   |
| ⚕️ Vet Console      | Clinical workflow management              |

---

# 🔮 Future Enhancements

Potential future improvements include:

* Online veterinary consultation
* Video appointments
* Online payment integration
* Prescription PDF downloads
* Pet medical report downloads
* SMS notifications
* WhatsApp appointment reminders
* Advanced analytics
* Pet insurance integration
* Pharmacy management
* Laboratory management
* Diagnostic report uploads
* Pet adoption integration
* Pet nutrition recommendations
* AI-assisted veterinary support
* Mobile application
* Wearable pet-health integration

---

# 📌 Project Status

### Completed

* ✅ Public Website
* ✅ Pet Owner Portal
* ✅ Veterinarian Dashboard
* ✅ Admin Dashboard
* ✅ Appointment Management
* ✅ Pet Management
* ✅ Medical Records
* ✅ Vaccination Management
* ✅ Veterinarian Availability
* ✅ Reviews
* ✅ Pet Care Tips
* ✅ Notifications
* ✅ Firebase Integration
* ✅ Role-Based Access Control
* ✅ Mock Demo Mode
* ✅ Seed Data
* ✅ Deployment Configuration
* ✅ Production Build Verification

---

# 📄 License

This project was created for **professional veterinary clinic demonstration purposes**.

All rights reserved.

---

# 🐾 PawPulse VetCare

> **Compassionate Care, Modern Veterinary Precision.**

PawPulse VetCare brings pet owners, veterinary professionals, and hospital administrators together through one modern digital platform.

```text
        🐾
   PAWPULSE VETCARE

Compassionate Care
        +
Modern Technology
        +
Veterinary Precision
```

**Built with ❤️ for better pet healthcare.**

