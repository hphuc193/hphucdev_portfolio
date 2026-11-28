"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePortfolio } from "@/context/PortfolioContext";
import { CounterBadge } from "@/hooks/useCounter";
import { ArrowRight, Play, Code2, Users, Star, ChevronRight } from "lucide-react";

export function Hero() {
  const { locale, playUiSound } = usePortfolio();
  const heroRef = useRef<HTMLElement>(null);
  const isVi = locale === "vi";

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    playUiSound("whoosh");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { icon: <Code2 className="w-4 h-4" />, value: 31, suffix: "+", label: "Public Repos" },
    { icon: <Users className="w-4 h-4" />, value: 175, suffix: "M", label: isVi ? "Học bổng Maker" : "Maker Scholarship" },
    { icon: <Star className="w-4 h-4" />, value: 5, suffix: "+", label: isVi ? "Dự án cốt lõi" : "Core Projects" },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[680px] overflow-hidden bg-[#c6ddfb] dark:bg-[#060a16] select-none"
    >
      {/* ===== Desktop Background: exact untouched hero-root.png at original quality ===== */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-root.png"
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
        />
        {/* Dark mode only overlays */}
        <div className="hidden dark:block absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#050914]/90 via-[#050914]/55 to-transparent pointer-events-none" />
        <div className="hidden dark:block absolute inset-0 bg-[#040814]/50 pointer-events-none" />
        <div className="hidden dark:block absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none" />
      </div>

      {/* ===== Mobile / Tablet Unified Vertical Background: full-bleed portrait artwork ===== */}
      <div className="lg:hidden absolute inset-0 overflow-hidden">
        <img
          src="/images/hero-mobile.png"
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        {/* Dark mode only overlays for mobile */}
        <div className="hidden dark:block absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-[#050914]/92 via-[#050914]/70 to-transparent pointer-events-none" />
        <div className="hidden dark:block absolute inset-0 bg-[#040814]/45 pointer-events-none" />
        <div className="hidden dark:block absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none" />
      </div>

      {/* ===== Content (Unified over background on BOTH Desktop & Mobile) ===== */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 pt-22 sm:pt-26 lg:pt-0 pb-4 lg:pb-0 flex flex-col justify-between lg:justify-center min-h-[100svh] lg:min-h-0">
        <div className="w-full lg:max-w-[560px] xl:max-w-[600px]">
          {/* Eyebrow */}
          <div className="hero-reveal flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5 lg:mb-6">
            <span className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/85 dark:bg-white/10 backdrop-blur-md border border-white dark:border-white/15 shadow-sm text-[11px] sm:text-[12px] font-semibold text-slate-800 dark:text-slate-100">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_#2563EB]" />
              Software Engineer
            </span>
            <span className="h-3.5 w-px bg-slate-400/60" />
            <span className="inline-flex items-center gap-0.5 text-[11px] sm:text-[12px] font-medium text-slate-700 dark:text-slate-300">
              {isVi ? "Luôn kiến tạo tốt hơn" : "Always Building Better"}
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Name with orbit ring */}
          <div className="hero-reveal relative w-fit mb-2.5 sm:mb-4">
            <svg
              viewBox="0 0 600 160"
              className="absolute -left-[4%] -top-[22%] w-[112%] h-[150%] pointer-events-none"
              fill="none"
              aria-hidden
            >
              <path
                d="M 40 120 C 10 80, 140 18, 330 14 C 500 10, 600 40, 560 80 C 530 112, 420 132, 300 136"
                stroke="url(#orbitGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M 538 6 Q 540 20 554 22 Q 540 24 538 38 Q 536 24 522 22 Q 536 20 538 6 Z" fill="#2563EB" />
              <defs>
                <linearGradient id="orbitGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#2563EB" stopOpacity="0" />
                  <stop offset="0.35" stopColor="#2563EB" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#0284C7" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="relative font-black italic tracking-[-0.045em] leading-[0.95] text-[clamp(2.35rem,10.5vw,5.6rem)] text-[#0A0D14] dark:text-white">
              HOANG
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] via-[#2563EB] to-[#38bdf8] pr-2">
                PHUC
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="hero-reveal font-bold italic tracking-[-0.02em] leading-[1.15] text-[clamp(1.35rem,5.2vw,2.5rem)] text-[#0f172a] dark:text-slate-100 mb-3 sm:mb-5">
            {isVi ? "Biến Ý Tưởng" : "Turning Ideas"}
            <br />
            {isVi ? "Thành " : "Into "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] to-[#38bdf8]">
              {isVi ? "Sản Phẩm" : "Amazing"}
              <svg viewBox="0 0 200 12" className="absolute left-0 -bottom-1.5 w-full h-2 sm:h-2.5" fill="none" aria-hidden>
                <path d="M2 9 C 60 2, 140 2, 198 7" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            {isVi ? "Tuyệt Vời" : "Products"}
          </h2>

          {/* Description */}
          <p className="hero-reveal text-[13.5px] sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-[460px] mb-5 sm:mb-8">
            {isVi
              ? "Lập trình viên đam mê tạo ra các giải pháp sáng tạo với công nghệ hiện đại."
              : "A passionate developer focused on creating innovative solutions with modern technologies."}
          </p>

          {/* Actions */}
          <div className="hero-reveal flex flex-wrap items-center gap-4 sm:gap-6 mb-5 sm:mb-9 lg:mb-10">
            <button
              onClick={() => scrollTo("work")}
              className="group inline-flex items-center gap-2 sm:gap-2.5 px-5.5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0b1530] dark:bg-white text-white dark:text-[#0b1530] text-xs sm:text-sm font-semibold shadow-[0_10px_30px_rgba(11,21,48,0.35)] ring-1 ring-[#2563EB]/50 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(37,99,235,0.45)] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {isVi ? "Xem Dự Án" : "Explore My Work"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo("about")}
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-white dark:border-white/15 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#2563EB] text-[#2563EB] ml-0.5" />
              </span>
              {isVi ? "Giới thiệu" : "Watch Intro"}
            </button>
          </div>

          {/* Stats */}
          <div className="hero-reveal flex items-stretch">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`pr-4 sm:pr-10 ${i > 0 ? "pl-4 sm:pl-10 border-l border-slate-400/45 dark:border-white/15" : ""}`}
              >
                <div className="text-[#2563EB] dark:text-sky-400 mb-1 sm:mb-2">{s.icon}</div>
                <div className="text-lg sm:text-2xl font-extrabold text-[#0A0D14] dark:text-white leading-none">
                  <CounterBadge value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 sm:mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet lower viewport showcase space so the unified 3D character & globe below are never covered by text */}
        <div className="lg:hidden w-full h-[88vw] sm:h-[74vw] max-h-[540px] shrink-0 pointer-events-none" aria-hidden />
      </div>

      {/* Scroll Down indicator */}
      <button
        onClick={() => scrollTo("about")}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)] dark:drop-shadow-none cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="w-6 h-9 rounded-full border-2 border-slate-600/80 dark:border-slate-300/70 bg-white/40 dark:bg-black/25 backdrop-blur-xs flex justify-center pt-1.5">
          <span className="w-1 h-2 rounded-full bg-[#2563EB] animate-bounce" />
        </span>
        <span className="flex items-center gap-3">
          <span className="w-8 h-px bg-slate-500/70 dark:bg-slate-400/70" />
          Scroll Down
          <span className="w-8 h-px bg-slate-500/70 dark:bg-slate-400/70" />
        </span>
      </button>
    </section>
  );
}
