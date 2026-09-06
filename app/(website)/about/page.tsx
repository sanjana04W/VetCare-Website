import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Heart, 
  Award, 
  Stethoscope, 
  Building2, 
  Activity, 
  Sparkles, 
  CheckCircle2,
  Users
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassion-First Veterinary Medicine",
      desc: "Every animal is treated as an individual member of your family, with emotional comfort prioritized during every examination."
    },
    {
      icon: Award,
      title: "Uncompromising Clinical Standards",
      desc: "Proudly AAHA-accredited, adhering to over 900 stringent veterinary hospital protocols in surgical sterility, diagnostics, and patient safety."
    },
    {
      icon: ShieldCheck,
      title: "Fear-Free Certified Environment",
      desc: "We utilize species-specific waiting alcoves, pheromone-diffused exam rooms, non-skid exam pads, and low-stress handling techniques."
    },
    {
      icon: Activity,
      title: "Transparent Care & Client Partnership",
      desc: "Pet parents are empowered with honest diagnostic guidance, itemized estimates, and open access to complete digital health dossiers."
    }
  ];

  const milestones = [
    { year: "2018", title: "Hospital Founded", desc: "Established our flagship animal hospital in Manhattan with a small team of 3 veterinary surgeons." },
    { year: "2020", title: "AAHA Accreditation", desc: "Awarded top-tier American Animal Hospital Association accreditation on our first evaluation." },
    { year: "2023", title: "Digital Platform Launch", desc: "Unveiled PawPulse digital health cards, real-time booking, and telemedicine integrations." },
    { year: "2026", title: "Regional Expansion", desc: "Providing multi-facility advanced surgical and ICU triage across 3 state-of-the-art hospitals." }
  ];

  return (
    <div className="space-y-20 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            About PawPulse VetCare
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Advancing Animal Health With Integrity, Compassion, and Precision
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded by veterinary specialists who believe in elevating companion animal healthcare through modern diagnostics, stress-free clinical handling, and accessible client partnerships.
          </p>
        </div>
      </section>

      {/* Hospital Visual & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800"
              alt="Veterinary hospital surgical suite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">PawPulse Central Hospital</p>
                <p className="text-lg font-bold">Comprehensive Emergency & Referral Center</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Our Clinical Mission
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Where Cutting-Edge Science Meets Gentle, Fear-Free Handling
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We understand that bringing your pet to the veterinarian can be stressful for both pet and parent. That’s why PawPulse was engineered from the ground up to mitigate sensory triggers. Separate dog and cat entrances, acoustic dampening, warm plush examination blankets, and organic treats form the foundation of every visit.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Behind our calm, warm environment is a sophisticated medical infrastructure equipped with high-resolution digital X-rays, ultrasound fluoroscopy, in-house hematology labs, and positive-pressure surgical theatres.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition shadow-sm"
              >
                <span>Explore Our Facilities & Services</span>
                &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100/60 px-3 py-1 rounded-full">
              Our Core Pillars
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              The Values That Guide Every Diagnosis
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Our Journey
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Built On a Legacy of Patient Advocacy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <span className="text-3xl font-extrabold text-brand-600">{m.year}</span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-1">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
