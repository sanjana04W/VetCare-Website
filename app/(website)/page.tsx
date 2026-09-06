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
  HeartHandshake, 
  Sparkles,
  PhoneCall,
  CheckCircle2
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
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50 to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>AAHA Accredited • Fear-Free Certified Hospital</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                World-Class Medical Care For Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-teal-500">
                  Beloved Pets
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience seamless appointment booking, live digital health cards, vaccination tracking, and immediate emergency triage — backed by board-certified specialists.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => openBooking()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-lg shadow-brand-600/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <Link
                  href="/find-a-vet"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200 transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Meet Our Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">15,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Pets Treated</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900">99.4%</p>
                  <p className="text-xs text-slate-500 font-medium">Client Satisfaction</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-brand-600">24/7</p>
                  <p className="text-xs text-slate-500 font-medium">Emergency Triage</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800"
                    alt="Veterinarian examining smiling dog"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Guarantee Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Zero-Stress Veterinary Promise</p>
                      <p className="text-[11px] text-slate-500">Certified gentle-handling protocols for dogs, cats & exotics.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Specialized Medicine
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Comprehensive Veterinary Services
          </h2>
          <p className="text-slate-600 text-sm">
            From routine immunization schedules to complex surgical interventions, we provide hospital-grade care tailored to your companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wide">
                    {s.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-50">
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1"
                  >
                    Learn clinical details &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Veterinarians */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-3 py-1 rounded-full">
                Our Medical Board
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
                Meet Our Board-Certified Veterinarians
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Compassionate doctors with decades of combined clinical expertise.
              </p>
            </div>
            <Link
              href="/find-a-vet"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 shrink-0"
            >
              View all veterinarians &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vets.slice(0, 3).map((vet) => (
              <div
                key={vet.uid}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative h-60 w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vet.photoURL || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"}
                    alt={vet.displayName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{vet.rating}</span>
                    <span className="text-slate-400 font-normal">({vet.reviewCount})</span>
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
                        ${vet.consultationFee}
                      </span>
                    </div>

                    <button
                      onClick={() => openBooking(vet)}
                      className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips / Blog Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Veterinary Knowledge Base
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-2">
              Expert Pet Care Insights & Articles
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Curated by certified veterinarians to keep your companions healthy and thriving.
            </p>
          </div>
          <Link
            href="/pet-care-tips"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 shrink-0"
          >
            Read all articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <Link
              key={tip.id}
              href={`/pet-care-tips/${tip.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tip.coverImage}
                  alt={tip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          ))}
        </div>
      </section>

      {/* Verified Reviews Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Client Feedback
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              What Pet Parents Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
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
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Emergency Dispatch Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              24/7 Rapid Emergency Response
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Facing an Immediate Pet Medical Emergency?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our veterinary critical care intensive unit operates around the clock with oxygen cages, emergency surgical suites, and blood transfusion facilities.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:18005557297"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-rose-600/30"
              >
                <PhoneCall className="w-4 h-4" />
                Call (800) 555-PAWS Now
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-sm flex items-center justify-center transition border border-slate-700"
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
