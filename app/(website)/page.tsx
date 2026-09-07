"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  getAllVeterinarians, 
  getAllTips, 
  getAllReviews 
} from "@/lib/firebase/firestore";
import { Veterinarian, PetCareTip, Review } from "@/lib/types";
import { BookingModal } from "@/website/components/BookingModal";
import { 
  Calendar, 
  Clock, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Stethoscope, 
  Activity, 
  Syringe, 
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Heart,
  Award,
  Users,
  Contact,
  Ambulance,
  MapPin,
  Phone
} from "lucide-react";

export default function HomePage() {
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [tips, setTips] = useState<PetCareTip[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [v, t, r] = await Promise.all([
        getAllVeterinarians(),
        getAllTips(true),
        getAllReviews()
      ]);
      setVets(v.filter(item => item.isApproved));
      setTips(t.slice(0, 3));
      setReviews(r.slice(0, 3));
    }
    load();
  }, []);

  const openBooking = (vet?: Veterinarian) => {
    setSelectedVet(vet || null);
    setIsBookingOpen(true);
  };

  const services = [
    {
      icon: Stethoscope,
      title: "Comprehensive Wellness & Preventative Care",
      desc: "Routine physical exams, pediatric puppy/kitten protocols, geriatric vitality monitoring, and weight management.",
      badge: "Routine & Preventative"
    },
    {
      icon: Syringe,
      title: "Immunizations & Parasite Protection",
      desc: "Core rabies, DHPP, and FVRCP vaccine regimens with automated digital booster reminders.",
      badge: "Core Protection"
    },
    {
      icon: Activity,
      title: "Advanced Surgery & Anesthesia",
      desc: "Board-certified soft-tissue surgery, orthopedic TPLO corrections, and ultrasonic multi-parameter monitoring.",
      badge: "Surgical Suite"
    },
    {
      icon: Sparkles,
      title: "Ultrasonic Dental Prophylaxis",
      desc: "Digital dental radiography, subgingival ultrasonic scaling, tooth preservation, and polishing.",
      badge: "Oral Health"
    }
  ];

  return (
    <div className="space-y-20 pb-24 overflow-hidden">
      {/* TOP SECTION: WELCOME TO PETSVCARE ANIMAL HOSPITALS BANNER & QUICK ACTION CARDS */}
      <section className="relative">
        {/* Hero Background Banner with VetCare Hospital as Shadow Under Letters */}
        <div className="relative bg-gradient-to-b from-[#021816] via-[#042825] to-[#021816] pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-28 lg:pb-44 overflow-hidden">
          {/* VetCare Hospital Image Under Letters */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/vetcare-hospital-clean.png"
              alt="VetCare Animal Hospitals Exterior"
              fill
              priority
              className="object-cover object-center opacity-45 scale-105"
            />
            {/* Color tint matching website's brand teal and shadow under letters */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#021816]/90 via-[#042825]/60 to-[#021816]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(2,24,22,0.65)_0%,_rgba(2,24,22,0.92)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021816] via-transparent to-[#021816]/60" />
            
            {/* Brand teal ambient lighting glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/40 text-brand-300 text-xs font-bold tracking-wide uppercase backdrop-blur-sm shadow-md">
              <ShieldCheck className="w-4 h-4 text-brand-400" />
              <span>Sri Lanka&apos;s Premier Veterinary Hospital</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              Welcome To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-brand-300 to-emerald-200">
                PawPluse Vetcare
              </span>
              <br />
              <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">Animal Hospitals</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              The PawPluse Vetcare Animal Hospital is one of the leading Vet hospitals in Sri Lanka. Your pet will be cared for, by highly experienced Veterinarians with supportive staff using state of the art modern facilities.
            </p> 
          </div>
        </div>

        {/* 3 Overlapping Quick Action Cards */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Book an appointment */}
            <div className="reveal-scale-up delay-75 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <Contact className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Book an appointment
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                Call us to book an appointment to get veterinary services from our experienced veterinary doctors
              </p>
              <div className="w-full pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => openBooking()}
                  className="w-full px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Online</span>
                </button>
                <a
                  href="tel:+94112588444"
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold text-xs rounded-xl border border-slate-200 hover:border-brand-200 transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>011 258 8444</span>
                </a>
              </div>
            </div>

            {/* Card 2: Get Mobile Service */}
            <div className="reveal-scale-up delay-150 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <Ambulance className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Get Mobile Service
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                Call us to schedule an appointment to get our mobile service for your pets
              </p>
              <div className="w-full pt-4 border-t border-slate-100">
                <a
                  href="tel:+94771234567"
                  className="w-full px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Mobile Care: 077 123 4567</span>
                </a>
              </div>
            </div>

            {/* Card 3: Visit Us */}
            <div className="reveal-scale-up delay-250 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-xs">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Visit Us
              </h3>
              <div className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 flex-1 space-y-1">
                <p className="font-semibold text-slate-800">Visit our main hospital</p>
                <p className="text-slate-600">No 506/7 Elvitigala Mawatha, Colombo 05</p>
                <p className="text-[11px] text-brand-600 font-semibold pt-1">Open 24 Hours • 7 Days a Week</p>
              </div>
              <div className="w-full pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="w-full px-4 py-2.5 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold text-xs rounded-xl border border-slate-200 hover:border-brand-200 transition flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  <span>View Location & Directions</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-slate-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="reveal-left lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/90 border border-brand-200/80 text-brand-900 text-xs font-semibold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <ShieldCheck className="w-4 h-4 text-brand-700" />
                <span>AAHA Accredited • Fear-Free Certified Animal Hospital</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                World-Class Medical Care For Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-teal-500">
                  Beloved Pets
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience seamless appointment scheduling, real-time digital health records, automatic vaccination alerts, and immediate emergency triage — delivered by compassionate board-certified clinicians.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => openBooking()}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-600/30 transition-all hover:shadow-brand-600/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <Link
                  href="/find-a-vet"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 transition-all shadow-xs hover:border-slate-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Meet Our Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Real-time stats row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
                <div className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">15,000+</p>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> Happy Pets Treated
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">99.4%</p>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" /> Satisfaction Score
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-600 tracking-tight">24/7</p>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Emergency ICU
                  </p>
                </div>
              </div>
            </div>

            {/* Right Hero Image with Dynamic Floating Badges */}
            <div className="reveal-right delay-150 lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-square group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/vet-option-3.jpg"
                    alt="Happy healthy companion pet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

                  {/* Bottom Guarantee Pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Zero-Stress Veterinary Promise</p>
                      <p className="text-[11px] text-slate-500 leading-tight">Certified gentle-handling protocols for dogs, cats & exotics.</p>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom-Right Card: Doctor On-Duty */}
                <div className="absolute -bottom-6 -right-5 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-3 animate-float-delayed hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <p className="text-xs font-bold text-slate-900">Doctors On Duty</p>
                    </div>
                    <p className="text-[10px] text-slate-500">Walk-ins & scheduled bookings open</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-fade-in text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 shadow-2xs">
            Specialized Medicine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Veterinary Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From routine immunization schedules to complex surgical interventions, we provide hospital-grade care tailored to your companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const delays = ["delay-75", "delay-150", "delay-225", "delay-300"];
            return (
              <div
                key={idx}
                className={`reveal-scale-up ${delays[idx % delays.length]} bg-white rounded-3xl p-6 border border-slate-100 shadow-sm card-interactive flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wide">
                    {s.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-brand-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-50">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn clinical details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Veterinarians Spotlight */}
      <section className="bg-slate-50/80 py-20 border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-fade-in flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-3 py-1 rounded-full">
                Our Medical Board
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Meet Our Board-Certified Veterinarians
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Compassionate doctors with decades of combined clinical expertise.
              </p>
            </div>
            <Link
              href="/find-a-vet"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 shrink-0 group"
            >
              <span>View all veterinarians</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vets.slice(0, 3).map((vet, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <div
                key={vet.uid}
                className={`reveal-scale-up ${delays[idx % delays.length]} bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm card-interactive flex flex-col group`}
              >
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vet.photoURL || "/images/vets/dr-sarah-jenkins.jpg"}
                    alt={vet.displayName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/vets/dr-sarah-jenkins.jpg";
                    }}
                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{vet.rating}</span>
                    <span className="text-slate-400 font-normal">({vet.reviewCount})</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Available Today</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wide">
                      {vet.specialty}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      {vet.displayName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {vet.experienceYears} Years Clinical Practice • {vet.clinicName}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {vet.bio}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                        Consultation
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        Rs. {vet.consultationFee.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => openBooking(vet)}
                      className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm shadow-brand-600/20"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Pet Care Tips / Knowledge Base */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-fade-in flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Veterinary Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Expert Pet Care Insights & Articles
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Curated by certified veterinarians to keep your companions healthy and thriving.
            </p>
          </div>
          <Link
            href="/pet-care-tips"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 shrink-0 group"
          >
            <span>Read all articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, idx) => {
            const delays = ["delay-75", "delay-150", "delay-225"];
            return (
            <Link
              key={tip.id}
              href={`/pet-care-tips/${tip.slug}`}
              className={`reveal-on-scroll ${delays[idx % delays.length]} group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm card-interactive flex flex-col`}
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tip.coverImage}
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white">
                  {tip.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tip.readTime}</span>
                    <span>•</span>
                    <span>By {tip.authorName}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {tip.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-brand-700">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
          })}
        </div>
      </section>

      {/* Verified Reviews Section */}
      <section className="bg-gradient-to-b from-white to-slate-50/80 py-20 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-fade-in text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 shadow-2xs">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Pet Parents Say About Us
            </h2>
            <p className="text-slate-600 text-sm">
              Real stories from families whose pets received emergency triage, routine vaccines, or surgery at PawPulse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <div
                key={rev.id}
                className={`reveal-on-scroll ${delays[idx % delays.length]} bg-white rounded-3xl p-6 border border-slate-100 shadow-sm card-interactive flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{rev.ownerName}</p>
                      <p className="text-[11px] text-slate-400">Consulted {rev.vetName}</p>
                    </div>
                  </div>
                  {rev.response && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                      <strong className="text-brand-700">Doctor response:</strong> {rev.response}
                    </div>
                  )}
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* 24/7 Emergency Dispatch Banner with Pulse Beacon */}
      <section className="reveal-scale-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              24/7 Rapid Emergency Response
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Facing an Immediate Pet Medical Emergency?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our veterinary critical care intensive care unit operates around the clock with oxygen incubators, emergency surgical suites, toxicology protocols, and whole blood reserves.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+94112697297"
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-rose-600/30 hover:shadow-rose-600/40"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                Call +94 11 269 7297 Now
              </a>
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium rounded-xl text-sm flex items-center justify-center transition border border-slate-700"
              >
                Hospital Directions & Triage Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        initialVet={selectedVet}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
