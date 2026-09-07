"use client";

import React, { useState } from "react";
import { BookingModal } from "@/website/components/BookingModal";
import { 
  Stethoscope, 
  Syringe, 
  Activity, 
  Sparkles, 
  Radio, 
  ShieldAlert, 
  Flame, 
  Check, 
  Calendar,
  PhoneCall,
  Clock
} from "lucide-react";

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const services = [
    {
      category: "Preventative & Primary Care",
      items: [
        {
          name: "Annual Wellness & Geriatric Vitality Exams",
          fee: "Rs. 2,000 – Rs. 3,500",
          time: "30 - 45 mins",
          desc: "Full head-to-tail physiological evaluation, ocular pressure checks, cardiac auscultation, and nutritional consultation.",
          features: ["Complete organ system review", "Weight and body condition scoring", "Behavioral guidance", "Parasite stool screen included"]
        },
        {
          name: "Core Immunization & Microchipping",
          fee: "Rs. 1,500 – Rs. 2,800",
          time: "20 - 30 mins",
          desc: "Rabies, DHPP, FVRCP, Bordetella, and Lyme vaccinations paired with ISO 134.2 kHz universal microchip implantation.",
          features: ["State-certified vaccination certificate", "Lifetime microchip registry", "Automated digital booster notifications", "Pre-vaccine allergy check"]
        }
      ]
    },
    {
      category: "Surgery & Anesthesia",
      items: [
        {
          name: "Board-Certified Soft Tissue & Orthopedic Surgery",
          fee: "Custom Estimate (Rs. 25,000+)",
          time: "Variable",
          desc: "High-level procedures including TPLO, fracture fixation, spay/neuter, mass removal, and intestinal foreign body retrieval.",
          features: ["Dedicated veterinary anesthesiologist", "Positive pressure HEPA-filtered OR", "Real-time capnography & ECG", "Post-op multi-modal pain therapy"]
        },
        {
          name: "Comprehensive Dental Cleaning & Oral Surgery",
          fee: "Rs. 8,000 – Rs. 20,000",
          time: "45 - 90 mins",
          desc: "Ultrasonic subgingival tartar scaling, computerized full-mouth dental X-rays, surgical extractions, and enamel polishing.",
          features: ["Full mouth digital dental radiography", "Subgingival plaque elimination", "Tooth-sparing restoration where possible", "Home dental hygiene kit"]
        }
      ]
    },
    {
      category: "Diagnostics & Critical Care",
      items: [
        {
          name: "Advanced Diagnostic Imaging (Ultrasound & X-Ray)",
          fee: "Rs. 5,000 – Rs. 12,000",
          time: "30 - 45 mins",
          desc: "High-frequency abdominal ultrasound, echocardiography, and low-radiation HD digital radiography reviewed by radiologists.",
          features: ["Same-day board-certified radiologist report", "Non-invasive abdominal cavity scans", "Cardiology Doppler evaluation", "Exportable digital DICOM files"]
        },
        {
          name: "24/7 Emergency Triage & ICU Support",
          fee: "Triage Evaluation: Rs. 4,500",
          time: "Immediate Triage",
          desc: "Round-the-clock emergency care for trauma, toxin ingestion, gastric dilatation-volvulus (bloat), seizures, and breathing difficulties.",
          features: ["Oxygen-enriched climate ICU cages", "Emergency blood transfusion bank", "Stat in-house blood gas analyzers", "Continuous 24-hour doctor monitoring"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-fade-in text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Medical Spectrum
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Specialized Clinical Services & Surgical Expertise
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every procedure at PawPulse adheres to the highest AAHA clinical standards, utilizing modern diagnostic equipment and compassionate fear-free pain management.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {services.map((group, gIdx) => (
          <div key={gIdx} className="space-y-6">
            <h2 className="reveal-left text-2xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
              {group.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.items.map((svc, idx) => (
                <div
                  key={idx}
                  className={`reveal-scale-up ${idx % 2 === 0 ? "delay-75" : "delay-150"} bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm card-interactive flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        {svc.name}
                      </h3>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-brand-50 text-brand-700 font-bold text-xs">
                        {svc.fee}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        Est. Duration: {svc.time}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.desc}
                    </p>

                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Included Protocol:</p>
                      <ul className="space-y-1.5">
                        {svc.features.map((f, fi) => (
                          <li key={fi} className="text-xs text-slate-600 flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book This Service</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Emergency Assurance */}
      <section className="reveal-scale-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Unsure which service your companion needs?</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our veterinary triage nurses are available 24/7 to guide you through initial assessments.
            </p>
          </div>
          <a
            href="tel:+94112697297"
            className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shrink-0 transition"
          >
            <PhoneCall className="w-4 h-4" />
            Speak With A Vet Nurse
          </a>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
