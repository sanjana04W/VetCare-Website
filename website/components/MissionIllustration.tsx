"use client";

import React from "react";

export function MissionIllustration({ className = "w-full max-w-xl mx-auto h-auto" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 620 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          <linearGradient id="bgGlow" x1="100" y1="50" x2="520" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ccfbf1" stopOpacity="0.5" />
            <stop stopColor="#e0f2fe" stopOpacity="0.6" />
            <stop stopColor="#f0fdfa" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="beanbagGrad" x1="330" y1="180" x2="410" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fb923c" />
            <stop stopColor="#f97316" />
            <stop stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="laptopGrad" x1="370" y1="210" x2="420" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f766e" />
            <stop stopColor="#115e59" />
          </linearGradient>

          <linearGradient id="targetOuterGrad" x1="410" y1="80" x2="470" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="targetInnerGrad" x1="430" y1="100" x2="450" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f43f5e" />
            <stop stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="shirtManGrad" x1="360" y1="160" x2="400" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop stopColor="#fde047" />
          </linearGradient>

          <linearGradient id="shirtWomanGrad" x1="465" y1="120" x2="500" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fed7aa" />
            <stop stopColor="#fcd34d" />
          </linearGradient>

          <linearGradient id="pantsWomanGrad" x1="470" y1="180" x2="505" y2="310" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0d9488" />
            <stop stopColor="#0f766e" />
          </linearGradient>

          <linearGradient id="pantsManGrad" x1="370" y1="220" x2="415" y2="290" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0d9488" />
            <stop stopColor="#134e4a" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Backdrop Organic Blob / Office Window */}
        <path
          d="M310 100 C 350 70, 480 70, 520 120 C 560 170, 530 290, 490 320 C 450 350, 340 350, 310 320 C 280 290, 270 130, 310 100 Z"
          fill="url(#bgGlow)"
          className="opacity-75"
        />

        {/* Modern Window Grid in Background */}
        <g stroke="#99f6e4" strokeWidth="2.5" strokeOpacity="0.4" strokeDasharray="4 4">
          <path d="M330 110 L330 280" />
          <path d="M420 90 L420 280" />
          <path d="M500 110 L500 280" />
          <path d="M300 160 L520 160" />
          <path d="M300 230 L520 230" />
        </g>

        {/* Potted Houseplant (Left) */}
        <g>
          {/* Pot */}
          <path
            d="M312 285 L328 285 L325 325 L315 325 Z"
            fill="#ea580c"
          />
          {/* Rim */}
          <ellipse cx="320" cy="285" rx="9" ry="3.5" fill="#f97316" />
          {/* Leaves */}
          <path d="M320 282 Q305 250 295 245 Q312 258 320 282 Z" fill="#0d9488" />
          <path d="M320 282 Q335 240 330 230 Q323 252 320 282 Z" fill="#14b8a6" />
          <path d="M320 270 Q300 220 310 205 Q318 230 320 270 Z" fill="#047857" />
          <path d="M320 260 Q340 215 330 200 Q325 225 320 260 Z" fill="#10b981" />
        </g>

        {/* Mission Archery Target & Bullseye */}
        <g filter="url(#softShadow)">
          {/* Target Board Stand */}
          <line x1="425" y1="120" x2="425" y2="175" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <line x1="425" y1="175" x2="410" y2="210" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <line x1="425" y1="175" x2="440" y2="210" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

          {/* Outer Ring */}
          <circle cx="425" cy="115" r="42" fill="#f0fdfa" stroke="#0d9488" strokeWidth="6" />
          {/* Mid Ring 1 */}
          <circle cx="425" cy="115" r="30" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="4" />
          {/* Mid Ring 2 */}
          <circle cx="425" cy="115" r="18" fill="#ffffff" stroke="#f43f5e" strokeWidth="4" />
          {/* Bullseye Core */}
          <circle cx="425" cy="115" r="8" fill="url(#targetInnerGrad)" />

          {/* Arrow hitting Bullseye */}
          <line x1="448" y1="92" x2="426" y2="114" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          {/* Fletching / Feathers */}
          <path d="M446 94 L456 84 M450 90 L460 80 M442 98 L452 88" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Mission Precision Gears (Golden/Pastel Yellow) */}
        <g opacity="0.75">
          {/* Gear 1 */}
          <g transform="translate(435, 175) scale(0.65)">
            <circle cx="40" cy="40" r="32" fill="#fed7aa" />
            <circle cx="40" cy="40" r="14" fill="#ffffff" />
            {/* Teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <rect
                key={i}
                x="35"
                y="0"
                width="10"
                height="10"
                rx="2"
                fill="#f97316"
                opacity="0.7"
                transform={`rotate(${angle} 40 40)`}
              />
            ))}
          </g>

          {/* Gear 2 (Interlocking) */}
          <g transform="translate(450, 225) scale(0.5)">
            <circle cx="40" cy="40" r="30" fill="#ccfbf1" />
            <circle cx="40" cy="40" r="12" fill="#ffffff" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <rect
                key={i}
                x="35"
                y="2"
                width="10"
                height="10"
                rx="2"
                fill="#0d9488"
                opacity="0.6"
                transform={`rotate(${angle} 40 40)`}
              />
            ))}
          </g>
        </g>

        {/* Beanbag Chair (Man Sitting) */}
        <g>
          {/* Shadow */}
          <ellipse cx="380" cy="335" rx="42" ry="12" fill="#0f172a" fillOpacity="0.08" />

          {/* Cozy Bean Bag Body */}
          <path
            d="M345 320 C330 280, 340 210, 370 200 C395 190, 420 230, 420 280 C420 330, 370 335, 345 320 Z"
            fill="url(#beanbagGrad)"
          />
          <path
            d="M350 250 C365 240, 385 245, 395 260"
            stroke="#c2410c"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Seated Person (Man with Laptop) */}
          {/* Head & Hair */}
          <circle cx="388" cy="162" r="11" fill="#fed7aa" />
          <path d="M380 158 C380 150, 395 147, 398 152 C401 157, 399 162, 399 162 C395 160, 383 162, 380 158 Z" fill="#78350f" />
          {/* Smile/Features */}
          <circle cx="392" cy="163" r="1.2" fill="#78350f" />
          <path d="M391 167 Q394 169 396 167" stroke="#78350f" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Torso & Yellow Shirt */}
          <path
            d="M375 174 C385 173, 400 174, 403 186 L395 230 L372 225 Z"
            fill="url(#shirtManGrad)"
          />

          {/* Green Legs relaxed */}
          <path
            d="M375 225 L405 240 L418 280 L406 283 L395 246 L372 235 Z"
            fill="url(#pantsManGrad)"
          />
          <ellipse cx="414" cy="285" rx="7" ry="3.5" fill="#0f766e" />

          {/* Arms & Laptop */}
          <path d="M385 188 L395 210 L410 210" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Laptop */}
          <polygon points="398,206 422,204 425,220 396,220" fill="url(#laptopGrad)" />
          <line x1="395" y1="220" x2="428" y2="220" stroke="#042f2e" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Standing Person (Woman Collaborating with Laptop) */}
        <g>
          {/* Standing Shadow */}
          <ellipse cx="495" cy="340" rx="30" ry="7" fill="#0f172a" fillOpacity="0.08" />

          {/* Legs in Teal Pants */}
          <path
            d="M480 205 L484 275 L480 335 L487 335 L493 275 L490 205 Z"
            fill="url(#pantsWomanGrad)"
          />
          {/* Walking back leg */}
          <path
            d="M490 205 L508 260 L518 310 L512 312 L497 265 L488 205 Z"
            fill="url(#pantsWomanGrad)"
          />
          {/* Shoes (Coral/Warm) */}
          <ellipse cx="483" cy="336" rx="5" ry="2.5" fill="#f97316" />
          <ellipse cx="516" cy="312" rx="5" ry="2.5" fill="#f97316" />

          {/* Torso & Yellow Top */}
          <path
            d="M474 150 C480 148, 496 148, 502 153 L494 205 L477 205 Z"
            fill="url(#shirtWomanGrad)"
          />

          {/* Head, Ponytail, Face */}
          <circle cx="486" cy="130" r="10" fill="#fed7aa" />
          {/* Red/Brown Hair & Ponytail */}
          <path d="M479 128 C477 120, 492 118, 495 125 C498 132, 490 136, 480 134 Z" fill="#b45309" />
          <path d="M493 125 Q512 120 514 140 Q504 140 493 130 Z" fill="#b45309" />
          {/* Facial features */}
          <circle cx="482" cy="130" r="1.1" fill="#78350f" />
          <path d="M481 133 Q484 135 487 133" stroke="#78350f" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Left Arm holding laptop */}
          <path d="M495 160 L470 172 L455 170" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />

          {/* Woman's Laptop (Open facing her) */}
          <g transform="translate(442, 148)">
            <polygon points="12,18 34,14 36,30 10,32" fill="#0284c7" />
            <polygon points="10,32 36,30 40,34 6,35" fill="#0369a1" />
            <line x1="8" y1="35" x2="38" y2="35" stroke="#082f49" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Arm gesturing towards team / target */}
          <path d="M480 162 L498 168 L516 160" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Small floating sparkles/stars */}
        <g fill="#14b8a6">
          <circle cx="340" cy="130" r="3" opacity="0.6" />
          <circle cx="475" cy="95" r="2.5" opacity="0.7" />
          <circle cx="535" cy="165" r="3" opacity="0.5" />
          <circle cx="305" cy="210" r="2" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
