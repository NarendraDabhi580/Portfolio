"use client";
import React from "react";

const MARQUEE_ITEMS = [
  {
    text: "Clean Code · Scalable Architecture",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17L12 22L22 17" />
        <path d="M2 12L12 17L22 12" />
        <path d="M12 2L2 7L12 12L22 7L12 2" />
      </svg>
    ),
  },
  {
    text: "TypeScript · Tailwind CSS",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f72585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M10 13l-2 2 2 2" />
        <path d="M14 17l2-2-2-2" />
      </svg>
    ),
  },
  {
    text: "UI Systems · Component Design",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
  },
  {
    text: "3+ Years React Experience",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
      </svg>
    ),
  },
  {
    text: "Modern Frontend Applications",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    text: "Next.js + Performance Focus",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f72585" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function InfiniteMarquee() {
  return (
    <div
      className="relative w-full pt-16 pb-8 flex flex-col items-center justify-center"
      style={{
        background: "rgba(3, 5, 15, 0.3)",
      }}
    >
      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden">
        {/* Left and Right fade gradients for smooth edge blending */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(3, 5, 15, 1), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(3, 5, 15, 1), transparent)",
          }}
        />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:pause-marquee">
          {/* Map items 4 times to ensure it's wide enough for ultra-wide screens */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mx-2 px-5 py-2.5 rounded-full whitespace-nowrap cursor-default"
              style={{
                background: "rgba(13, 27, 62, 0.3)",
                border: "1px solid rgba(232, 244, 253, 0.04)",
                fontFamily: "var(--font-jetbrains)",
              }}
            >
              <div style={{ opacity: 0.8 }}>{item.icon}</div>
              <span
                className="text-[0.68rem] tracking-[0.05em]"
                style={{ color: "rgba(232, 244, 253, 0.55)" }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
