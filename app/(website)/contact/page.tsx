"use client";

import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const clinics = [
    {
      name: "PawPulse Central Animal Hospital (Main Campus)",
      address: "742 Evergreen Terrace, New York, NY 10001",
      phone: "+1 (555) 019-2834",
      hours: "Mon-Fri: 7:30 AM - 8:00 PM • Sat: 8:00 AM - 6:00 PM • Sun: 24/7 Emergency",
      features: "Full Hospital, In-house Lab, ICU & Surgery Suite"
    },
    {
      name: "PawPulse Surgical Suites",
      address: "128 Grand Concourse, Brooklyn, NY 11201",
      phone: "+1 (555) 345-6789",
      hours: "Tue-Sat: 8:30 AM - 5:30 PM",
      features: "Orthopedic Surgery, Fluoroscopy & Physical Rehab"
    },
    {
      name: "PawPulse Exotic Sanctuary & Avian Ward",
      address: "45 Roosevelt Way, Queens, NY 11101",
      phone: "+1 (555) 456-7890",
      hours: "Mon, Wed, Fri: 10:00 AM - 6:00 PM",
      features: "Avian, Reptile, Rabbit & Small Mammal Specialized Ward"
    }
  ];

  const faqs = [
    {
      q: "What should I do if my pet eats chocolate, medication, or toxic plants?",
      a: "Contact our 24/7 Emergency Line immediately at (800) 555-PAWS or the ASPCA Animal Poison Control Center. Do not induce vomiting without explicit veterinary instruction."
    },
    {
      q: "How far in advance should I book routine vaccinations?",
      a: "We recommend scheduling wellness appointments 1 to 2 weeks in advance. However, same-day triage and urgent slots are reserved every morning."
    },
    {
      q: "Do you offer payment plans or pet insurance direct claim processing?",
      a: "Yes. We accept all major pet insurance providers (Trupanion, Nationwide, Healthy Paws, Lemonade) and partner with CareCredit and Scratchpay for low-interest financing."
    }
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Client Support & Triage
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We Are Here When You and Your Pet Need Us Most
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Reach out for non-emergent inquiries, prescription refills, medical dossier questions, or hospital directions.
          </p>
        </div>
      </section>

      {/* Main Grid: Form & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Delivered!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{name}</strong>. A veterinary client representative will review your inquiry and get back to you within 24 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-semibold text-xs hover:bg-brand-700 transition mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-xs text-slate-500 mb-6">
                  For emergency critical triage, please call our hotline directly instead of submitting this web form.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                    >
                      <option value="General Inquiry">General Clinical Inquiry</option>
                      <option value="Appointment Question">Appointment Question</option>
                      <option value="Prescription Refill">Prescription Refill Request</option>
                      <option value="Billing & Insurance">Billing & Pet Insurance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    How Can We Help Your Companion?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your pet's breed, symptoms, or inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiries</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact & Emergency Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgent Hotline Card */}
            <div className="bg-gradient-to-br from-rose-900 to-slate-900 text-white p-8 rounded-3xl shadow-lg space-y-3 border border-rose-800">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 font-bold text-[10px] tracking-wider uppercase">
                Immediate Critical Triage
              </span>
              <h3 className="text-2xl font-bold">24/7 Emergency Line</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                If your companion is experiencing severe bleeding, respiratory arrest, bloat, or toxin ingestion, contact our ICU dispatch immediately.
              </p>
              <a
                href="tel:18005557297"
                className="inline-flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-sm transition shadow-md shadow-rose-600/30"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Call (800) 555-PAWS</span>
              </a>
            </div>

            {/* Hospital Locations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Our Hospital Locations</h3>
              <div className="space-y-4">
                {clinics.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <p className="text-xs font-bold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-600 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                      <span>{c.address}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{c.hours}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
            Frequently Answered
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Common Veterinary Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full px-6 py-4 text-left font-semibold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === i && (
                <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
