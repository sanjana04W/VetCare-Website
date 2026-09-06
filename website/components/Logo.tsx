import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showTagline = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform ${className}`}>
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-400 p-2 shadow-md shadow-brand-700/20 text-white flex items-center justify-center`}>
        {/* Stylized Cross + Heartbeat Pulse + Paw SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          {/* Paw Pads */}
          <circle cx="8" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="5" cy="11" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="19" cy="11" r="1.3" fill="currentColor" stroke="none" />
          {/* Central Pulse Path */}
          <path d="M4 17h4l2-4 3 7 3-5h4" stroke="currentColor" strokeWidth="2.2" />
        </svg>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-warm-400 rounded-full ring-2 ring-white"></span>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-slate-900 ${textSizes[size]} leading-none`}>
          Paw<span className="text-brand-600">Pulse</span>
          <span className="text-xs font-semibold text-brand-700 ml-1 px-1.5 py-0.5 rounded bg-brand-50 border border-brand-200">VetCare</span>
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">
            Compassionate Veterinary Precision
          </span>
        )}
      </div>
    </Link>
  );
}
