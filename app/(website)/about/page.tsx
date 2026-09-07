"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Shield,
  MapPin,
  Star,
  Clock,
  Heart, 
  Award, 
  Stethoscope, 
  Activity, 
  Sparkles, 
  CheckCircle2,
  Users,
  ChevronUp,
  Mail,
  Linkedin,
  Phone,
  Calendar,
  Compass,
  Building2,
  ArrowRight
} from "lucide-react";
import { MissionIllustration } from "@/website/components/MissionIllustration";

export default function AboutPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTab, setActiveTab] = useState<"board" | "specialists">("board");

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Director Board (Matching the hierarchy shown in the user's reference)
  const directorBoard = [
    {
      name: "Eleanor Vance",
      title: "Chief Executive & Hospital Director",
      qualification: "MHA, FACHE",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      bio: "With over 18 years of clinical hospital leadership, Eleanor steers PawPulse's mission, ensuring uncompromised standards of patient safety and compassionate client experiences.",
      email: "e.vance@pawpulse.com",
      specialty: "Hospital Strategy & Patient Advocacy"
    },
    {
      name: "Dr. Marcus Chen, BVSc",
      title: "Chief Veterinary Surgeon & Board President",
      qualification: "BVSc, DACVS",
      image: "/images/vets/dr-marcus-chen.jpg",
      bio: "Double board-certified veterinary surgeon pioneering minimally invasive orthopedic procedures and post-operative pain mitigation protocols across our surgical suites.",
      email: "dr.marcus@pawpulse.com",
      specialty: "Orthopedic & Neurological Surgery"
    },
    {
      name: "Dr. Sarah Jenkins, DVM",
      title: "Head of Internal Medicine & Clinical Quality Director",
      qualification: "DVM, DACVIM",
      image: "/images/vets/dr-sarah-jenkins.jpg",
      bio: "Spearheads clinical governance and feline-friendly medical pathways, championing fear-free hospital standards and comprehensive chronic condition management.",
      email: "dr.sarah@pawpulse.com",
      specialty: "Canine & Feline Internal Medicine"
    },
    {
      name: "Dr. Elena Rostova, DVM",
      title: "Director of Exotic Health & Behavioral Science",
      qualification: "DVM, ABVP",
      image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600",
      bio: "Renowned author and veterinary ethologist dedicated to stress-free hospital environments, companion avian health, and positive animal behavioral rehabilitation.",
      email: "dr.elena@pawpulse.com",
      specialty: "Exotic & Avian Diagnostics"
    },
    {
      name: "Dr. David Miller, DVM",
      title: "Director of Critical Care & Board Secretary",
      qualification: "DVM, DACVECC",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
      bio: "Directs PawPulse 24/7 ICU triage and emergency trauma bays, training our teams in state-of-the-art life support and advanced patient monitoring.",
      email: "dr.david@pawpulse.com",
      specialty: "Emergency Medicine & Intensive Care"
    },
    {
      name: "Dr. Aris Thorne, DVM",
      title: "Director of Diagnostic Imaging & Board Trustee",
      qualification: "DVM, DACVR",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600",
      bio: "Supervises our high-definition CT and ultrasound diagnostics, enabling rapid, non-invasive internal pathology detection for delicate pet patients.",
      email: "dr.aris@pawpulse.com",
      specialty: "Advanced Radiology & Telemedicine"
    }
  ];

  const clinicalSpecialists = [
    {
      name: "Dr. Chloe Adams, DVM",
      title: "Veterinary Dermatologist",
      qualification: "DVM, DACVD",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
      bio: "Specializing in chronic allergies, autoimmune skin conditions, and advanced laser otoscopy for companion animals.",
      email: "dr.chloe@pawpulse.com",
      specialty: "Dermatology & Allergy Relief"
    },
    {
      name: "Dr. Julian Patel, BVSc",
      title: "Senior Dental Surgeon",
      qualification: "BVSc, FAVD",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
      bio: "Focusing on preventive oral hygiene, restorative endodontics, and pain-free periodontal surgeries.",
      email: "dr.julian@pawpulse.com",
      specialty: "Veterinary Dentistry & Maxillofacial"
    },
    {
      name: "Dr. Maya Lin, DVM",
      title: "Cardiology Fellow & Diagnostic Lead",
      qualification: "DVM, DACVIM (Cardio)",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
      bio: "Expertise in Doppler echocardiography, congenital cardiac anomalies, and individualized cardiovascular therapy.",
      email: "dr.maya@pawpulse.com",
      specialty: "Cardiology & Vascular Health"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Tender Loving Care",
      desc: "Treating every pet as an indispensable member of your family with warm gentle handling and emotional reassurance."
    },
    {
      icon: ShieldCheck,
      title: "AAHA Clinical Rigor",
      desc: "Accredited to surpass 900+ veterinary medicine standards in surgical sterility, diagnostics, and patient safety."
    },
    {
      icon: Stethoscope,
      title: "Fear-Free Practices",
      desc: "Designed to minimize sensory stressors with species-separated spaces, pheromone calming, and gentle touch."
    },
    {
      icon: Activity,
      title: "24/7 ICU & Emergency",
      desc: "On-site veterinary surgeons, intensive care doctors, and continuous monitoring beds available around the clock."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "Founded in Colombo",
      desc: "PawPulse began as a dedicated boutique veterinary practice in Colombo 03, sharing fear-free clinical guidance and rescue care to build our early pet parent community.",
      align: "right" as const,
    },
    {
      year: "2021",
      title: "5,000+ Companions Healed",
      desc: "Grew to a loyal islandwide community across Sri Lanka, recognized for clinical excellence, opening 24/7 ICU trauma bays, and gentle handling techniques.",
      align: "left" as const,
    },
    {
      year: "2023",
      title: "Advanced Surgical & Diagnostic Suites",
      desc: "Commissioned Sri Lanka's leading veterinary orthopedic surgery suites, high-definition digital radiology, and dedicated exotic pet rehabilitation wards.",
      align: "right" as const,
    },
    {
      year: "2026",
      title: "Islandwide Digital Care Network",
      desc: "Launched our unified digital veterinary platform, connecting 15,000+ pet parents with verified medical records, online specialist booking, and 24/7 triage support.",
      align: "left" as const,
    },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* SECTION 0: WHY CHOOSE US - TRUSTED PLATFORM IN SRI LANKA */}
      <section className="pt-10 pb-14 md:pt-16 md:pb-20 border-b border-slate-100 bg-gradient-to-b from-brand-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Group Pet Portrait */}
            <div className="reveal-left lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src="/images/trusted-pet-care.png"
                  alt="Trusted Platform for Pet Owners in Sri Lanka"
                  width={600}
                  height={400}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Column: Information & Key Highlights */}
            <div className="reveal-right delay-100 lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide">
                <span>Why Choose Us</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Trusted Platform for Pet Owners in Sri Lanka
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  We connect pet owners with verified and reliable pet care providers across Sri Lanka, making it easier to find the perfect care for your furry companions.
                </p>
              </div>

              {/* 2x2 Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                {/* 1. Verified Providers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Verified Providers</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      All listed businesses are verified for quality and reliability.
                    </p>
                  </div>
                </div>

                {/* 2. Nationwide Coverage */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Nationwide Coverage</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Find pet care services across all provinces in Sri Lanka.
                    </p>
                  </div>
                </div>

                {/* 3. Genuine Reviews */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Genuine Reviews</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Real feedback from pet owners to guide your decision.
                    </p>
                  </div>
                </div>

                {/* 4. Updated Information */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Updated Information</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                      Current business hours, services, and contact details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-action Button */}
              <div className="pt-2">
                <Link
                  href="#mission"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: OUR MISSION (Matching the exact layout and content of user reference) */}
      <section id="mission" className="pt-16 pb-20 md:pt-20 md:pb-28 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading & Mission Text */}
            <div className="reveal-left lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide uppercase">
                <Compass className="w-3.5 h-3.5 text-brand-600" />
                <span>Our Core Purpose</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
                Our Mission
              </h1>

              <div className="max-w-xl mx-auto lg:mx-0 space-y-4">
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
                  We are committed to providing the best possible care and service. 
                  We realize that your pets are a part of your family and we are dedicated to ensuring your pets are treated with tender loving care.
                </p>

                <p className="text-sm text-slate-500 leading-relaxed pt-2">
                  At PawPulse, our pledge extends beyond clinical treatments—we build lifelong bonds of trust, keeping companion animals joyful, vibrant, and thriving by your side.
                </p>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Fear-Free Certified Staff</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>AAHA Top Tier Accredited</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>TLC Guaranteed Always</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Illustration Graphic */}
            <div className="reveal-right delay-150 lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-lg lg:max-w-none transition-transform duration-500 hover:scale-[1.01]">
                <MissionIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR TEAM (Matching the exact hierarchy: Our Team -> Director Board) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="reveal-fade-in space-y-4 mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide uppercase">
            <Users className="w-3.5 h-3.5 text-brand-600" />
            <span>Hospital Leadership & Medical Faculty</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Team
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-700 tracking-tight">
                Director Board
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Executive leaders and chief veterinary surgeons steering patient advocacy, clinical innovation, and hospital governance.
              </p>
            </div>

            {/* Navigation Tabs between Director Board and Clinical Specialists */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("board")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "board"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Director Board ({directorBoard.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("specialists")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "specialists"
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Senior Specialists ({clinicalSpecialists.length})
              </button>
            </div>
          </div>
        </div>

        {/* Team Cards Grid */}
        {activeTab === "board" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {directorBoard.map((member, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <div
                key={idx}
                className={`reveal-scale-up ${delays[idx % delays.length]} group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Specialty Pill on image */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/90 backdrop-blur-md text-brand-700 shadow-xs border border-white/40">
                        {member.specialty}
                      </span>
                    </div>

                    {/* Member name & qualification on bottom of photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold leading-snug drop-shadow-sm">
                        {member.name}
                      </h4>
                      <p className="text-xs font-medium text-brand-200 mt-0.5">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Award className="w-3.5 h-3.5 text-brand-600" />
                      <span>Credentials: {member.qualification}</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Quick Actions */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-600 font-medium transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Doctor</span>
                  </a>
                  <Link
                    href="/find-a-vet"
                    className="inline-flex items-center gap-1 text-brand-700 font-bold hover:underline"
                  >
                    <span>Book Consult</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
            })}
          </div>
        )}

        {activeTab === "specialists" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinicalSpecialists.map((member, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <div
                key={idx}
                className={`reveal-scale-up ${delays[idx % delays.length]} group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/90 backdrop-blur-md text-brand-700 shadow-xs border border-white/40">
                        {member.specialty}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-xl font-bold leading-snug drop-shadow-sm">
                        {member.name}
                      </h4>
                      <p className="text-xs font-medium text-brand-200 mt-0.5">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Award className="w-3.5 h-3.5 text-brand-600" />
                      <span>Credentials: {member.qualification}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-600 font-medium transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Doctor</span>
                  </a>
                  <Link
                    href="/find-a-vet"
                    className="inline-flex items-center gap-1 text-brand-700 font-bold hover:underline"
                  >
                    <span>Book Consult</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </section>

      {/* SECTION 3: CORE CLINICAL VALUES */}
      <section className="bg-slate-50/80 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal-fade-in text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-3.5 py-1.5 rounded-full border border-brand-200/60">
              The PawPulse Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Values That Anchor Our Clinical Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every decision, consultation, and surgical procedure is anchored in our uncompromising dedication to tender loving care and medical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              const delays = ["delay-75", "delay-150", "delay-225", "delay-300"];
              return (
                <div
                  key={i}
                  className={`reveal-scale-up ${delays[i % delays.length]} bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300 transition duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 border border-brand-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOSPITAL IMPACT METRICS */}
      <section className="reveal-scale-up py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-600/20 blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-teal-500/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            <div className="pt-4 lg:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold text-teal-300 tracking-tight">
                15,000+
              </span>
              <span className="block text-xs sm:text-sm text-slate-300 font-medium mt-2">
                Pets Healed with TLC
              </span>
            </div>
            <div className="pt-4 lg:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold text-teal-300 tracking-tight">
                99.4%
              </span>
              <span className="block text-xs sm:text-sm text-slate-300 font-medium mt-2">
                Client Trust & Approval
              </span>
            </div>
            <div className="pt-4 lg:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold text-teal-300 tracking-tight">
                100%
              </span>
              <span className="block text-xs sm:text-sm text-slate-300 font-medium mt-2">
                Fear-Free Certified Teams
              </span>
            </div>
            <div className="pt-4 lg:pt-0">
              <span className="block text-4xl sm:text-5xl font-extrabold text-teal-300 tracking-tight">
                24/7/365
              </span>
              <span className="block text-xs sm:text-sm text-slate-300 font-medium mt-2">
                Surgeon & ICU Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: MILESTONES / OUR GROWTH STORY (Matching user reference with website teal palette) */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-teal-50/20 to-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="reveal-fade-in text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              Milestones
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
              Our Growth Story
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Center Vertical Line (Teal) */}
            <div 
              className="absolute top-4 bottom-8 left-6 md:left-1/2 -translate-x-1/2 w-[2px] bg-brand-600" 
              aria-hidden="true" 
            />

            <div className="space-y-12 sm:space-y-16">
              {milestones.map((item, idx) => {
                const isLeft = item.align === "left";
                return (
                  <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-20 items-center">
                    {/* Node Dot on Timeline */}
                    <div 
                      className="absolute left-6 md:left-1/2 -translate-x-1/2 top-10 z-10 w-3 h-3 rounded-full bg-brand-600 ring-4 ring-white shadow-xs" 
                      aria-hidden="true" 
                    />

                    {isLeft ? (
                      <>
                        {/* Left Column: Card */}
                        <div className="reveal-left w-full pl-14 md:pl-0">
                          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow overflow-hidden md:text-right">
                            {/* Mobile: accent bar on left */}
                            <div className="block md:hidden absolute left-0 top-0 bottom-0 w-2 bg-brand-600 rounded-l-2xl" />
                            {/* Desktop: accent bar on right side */}
                            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-2 bg-brand-600 rounded-r-2xl sm:rounded-r-3xl" />

                            <div className="space-y-2">
                              <span className="text-sm sm:text-base font-extrabold text-brand-600 tracking-wider block">
                                {item.year}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Spacer */}
                        <div className="hidden md:block" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        {/* Left Column: Spacer */}
                        <div className="hidden md:block" aria-hidden="true" />

                        {/* Right Column: Card */}
                        <div className="reveal-right w-full pl-14 md:pl-0">
                          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow overflow-hidden text-left">
                            {/* Accent bar on left */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-600 rounded-l-2xl sm:rounded-l-3xl" />

                            <div className="space-y-2">
                              <span className="text-sm sm:text-base font-extrabold text-brand-600 tracking-wider block">
                                {item.year}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">
                                {item.title}
                              </h3>
                              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA BANNER */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50 border border-brand-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Experience Tender Loving Care for Your Pet
            </h3>
            <p className="text-slate-600 text-sm">
              Schedule an in-person wellness visit, talk to a board specialist, or consult with our emergency team anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/find-a-vet"
              className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 shadow-xs transition"
            >
              Contact Hospital
            </Link>
          </div>
        </div>
      </section>

      {/* FLOATING SCROLL TO TOP BUTTON (Matching bottom right element in screenshot) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-slate-900/90 hover:bg-brand-600 text-white shadow-xl transition-all duration-300 backdrop-blur-xs flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
