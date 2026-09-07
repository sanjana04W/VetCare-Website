"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTips } from "@/lib/firebase/firestore";
import { SEED_TIPS } from "@/lib/firebase/seed";
import { PetCareTip } from "@/lib/types";
import { Search, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";

export default function PetCareTipsPage() {
  const [tips, setTips] = useState<PetCareTip[]>(() => SEED_TIPS.filter(t => t.published));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllTips(true);
        if (data && data.length > 0) {
          setTips(data);
        }
      } catch (e) {
        console.warn("PetCareTipsPage load fallback active:", e);
      }
    }
    load();
  }, []);

  const categories = [
    "All",
    "Emergency Care",
    "Nutrition",
    "Vaccinations",
    "Health & Wellness",
    "Training & Behavior",
  ];

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || tip.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-fade-in text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Veterinary Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pet Care Knowledge & Clinical Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Evidence-based veterinary articles to empower companion owners with preventive healthcare, nutritional guidance, and emergency response wisdom.
          </p>
        </div>
      </section>

      {/* Search & Category Pills */}
      <section className="reveal-scale-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by condition, topic, or tag..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === c
                  ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTips.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No articles found matching your query.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 px-4 py-1.5 bg-brand-50 text-brand-700 font-semibold rounded-xl text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip, idx) => {
              const delays = ["delay-75", "delay-150", "delay-225"];
              return (
              <Link
                key={tip.id}
                href={`/pet-care-tips/${tip.slug}`}
                className={`reveal-scale-up ${delays[idx % delays.length]} group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm card-interactive flex flex-col justify-between`}
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tip.coverImage || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"}
                      alt={tip.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                      {tip.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tip.readTime}</span>
                      <span>•</span>
                      <span>By {tip.authorName}</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2">
                      {tip.title}
                    </h2>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {tip.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {tip.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-100"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-2 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-brand-700">
                  <span className="pt-4">Read Complete Article</span>
                  <ArrowRight className="w-4 h-4 pt-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
          </div>
        )}
      </section>
    </div>
  );
}
