"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTipBySlug, getAllTips } from "@/lib/firebase/firestore";
import { SEED_TIPS } from "@/lib/firebase/seed";
import { PetCareTip } from "@/lib/types";
import { Clock, Calendar, ArrowLeft, User, Tag, Share2, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ArticleContent } from "@/website/components/ArticleContent";

export default function TipDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const initialTip = SEED_TIPS.find(t => t.slug === slug) || null;
  const [tip, setTip] = useState<PetCareTip | null>(() => initialTip);
  const [relatedTips, setRelatedTips] = useState<PetCareTip[]>(() => 
    SEED_TIPS.filter(t => t.slug !== slug).slice(0, 2)
  );
  const [isLoading, setIsLoading] = useState(!initialTip);

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const found = await getTipBySlug(slug);
        if (found) setTip(found);
        const all = await getAllTips(true);
        if (all && all.length > 0) {
          setRelatedTips(all.filter(t => t.slug !== slug).slice(0, 2));
        }
      } catch (e) {
        console.warn("TipDetailPage load fallback active:", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 text-sm">Loading veterinary article...</p>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Article Not Found</h1>
        <p className="text-slate-500 text-sm mt-2">The requested pet care guide may have been moved or archived.</p>
        <Link
          href="/pet-care-tips"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all tips
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/pet-care-tips"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pet Care Articles
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200 uppercase tracking-wider">
          {tip.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {tip.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-slate-200 py-3 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{tip.authorName}</p>
              <p className="text-slate-500">{tip.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(tip.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tip.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tip.coverImage || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"}
          alt={tip.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed">
        <div className="p-5 rounded-2xl bg-brand-50/80 border-l-4 border-brand-600 text-brand-950 text-sm sm:text-base font-medium italic shadow-2xs">
          {tip.excerpt}
        </div>

        {/* Clean, Neat Formatted Article Body */}
        <ArticleContent content={tip.content} />

        {/* Tags */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-slate-400">Tagged Topics:</span>
          {tip.tags.map((t, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium"
            >
              <Tag className="w-3 h-3 text-slate-400" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Related Tips */}
      {relatedTips.length > 0 && (
        <div className="pt-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Recommended Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedTips.map((r) => (
              <Link
                key={r.id}
                href={`/pet-care-tips/${r.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-brand-300 transition flex gap-4 items-center group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.coverImage} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-700 uppercase">{r.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 line-clamp-2 mt-0.5">
                    {r.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{r.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
