"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const { playUiSound, locale, theme } = usePortfolio();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Status sequence in Vietnamese and English
  const steps = [
    {
      at: 0,
      vi: "KHỞI TẠO LÕI ĐIỀU HÀNH KERNEL...",
      en: "INITIALIZING SYSTEM RUNTIME...",
    },
    {
      at: 28,
      vi: "HIỆU CHUẨN POSTGIS & CƠ SỞ DỮ LIỆU...",
      en: "CALIBRATING POSTGIS & ENGINE...",
    },
    {
      at: 60,
      vi: "TẢI MODULE GIAO DIỆN & SHADER 3D...",
      en: "COMPOSING SHADERS & 3D REALM...",
    },
    {
      at: 88,
      vi: "HOÀNG PHÚC OS ĐÃ HOÀN TẤT...",
      en: "HOANGPHUC PORTFOLIO READY...",
    },
    {
      at: 100,
      vi: "TRUY CẬP HỆ THỐNG THÀNH CÔNG",
      en: "SYSTEM LAUNCH INITIALIZED",
    },
  ];

  // Update status message based on progress and locale
  useEffect(() => {
    const current = steps
      .slice()
      .reverse()
      .find((s) => progress >= s.at);
    if (current) {
      setStatusText(locale === "vi" ? current.vi : current.en);
    }
  }, [progress, locale]);

  // High-performance smooth animation via requestAnimationFrame
  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const duration = 1650; // 1.65 seconds for optimal snappy yet cinematic experience

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const linearProgress = Math.min(1, elapsed / duration);
      const easedProgress = Math.floor(easeOutQuart(linearProgress) * 100);

      setProgress(easedProgress);

      if (linearProgress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        // Step complete: trigger sound and exit animation
        setTimeout(() => {
          playUiSound("boot");
          setIsFinishing(true);

          setTimeout(() => {
            setIsDismissed(true);
            setTimeout(onComplete, 700);
          }, 350);
        }, 200);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete, playUiSound]);

  return (
    <div
      aria-label="Loading Screen"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] select-none ${
        isDismissed
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        background:
          theme === "dark"
            ? "radial-gradient(ellipse at 50% 45%, #08111e 0%, #040810 50%, #020408 100%)"
            : "radial-gradient(ellipse at 50% 45%, #eff6ff 0%, #f8fafc 55%, #ffffff 100%)",
      }}
    >
      {/* =====================================================================
          BACKGROUND AMBIENT ATMOSPHERE (White & Cyan Light Fields)
          ===================================================================== */}
      {/* Radiant cyan aura glow behind the core */}
      <div
        className={`absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[110px] pointer-events-none transition-all duration-1000 ${
          isFinishing
            ? "scale-150 opacity-80 bg-sky-400/40"
            : "scale-100 opacity-60 bg-sky-400/20 dark:bg-sky-500/25 animate-pulse"
        }`}
      />

      {/* Floating secondary cyan beam orb */}
      <div className="absolute top-1/4 right-1/4 w-[280px] h-[280px] rounded-full bg-cyan-300/15 dark:bg-cyan-500/15 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[320px] h-[320px] rounded-full bg-blue-400/10 dark:bg-blue-600/15 blur-[100px] pointer-events-none" />

      {/* Delicate cybernetic coordinate grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial cybernetic rings */}
      <svg
        className="absolute w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] pointer-events-none opacity-20 dark:opacity-30"
        viewBox="0 0 500 500"
      >
        <circle
          cx="250"
          cy="250"
          r="230"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
        <circle
          cx="250"
          cy="250"
          r="180"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <circle
          cx="250"
          cy="250"
          r="120"
          fill="none"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="2 12"
        />
      </svg>

      {/* Top Telemetry Header */}
      <div className="absolute top-8 inset-x-0 px-8 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 dark:text-slate-500 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            HOANGPHUC OS
          </span>
          <span className="text-sky-500">v2026.10</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>LAT 10.82°N · LON 106.63°E</span>
          <span className="text-sky-500">|</span>
          <span>SAI GON</span>
        </div>
      </div>

      {/* =====================================================================
          CENTRAL CORE: MONOGRAM + ORBITAL RINGS + FLUID COUNTER
          ===================================================================== */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ${
          isFinishing ? "scale-105" : "scale-100"
        }`}
      >
        {/* Orbital Gyroscope Container */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-8">
          {/* Animated Outer Orbiting Arc */}
          <svg
            className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]"
            viewBox="0 0 160 160"
          >
            <defs>
              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="url(#orbitGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="180 260"
            />
          </svg>

          {/* Reverse Orbiting Dot Ring */}
          <svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_5s_linear_infinite_reverse]"
            viewBox="0 0 144 144"
          >
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 24"
              strokeOpacity="0.6"
            />
          </svg>

          {/* Concentric Biometric Ripple Effect on completion */}
          {isFinishing && (
            <div className="absolute inset-0 rounded-full border-2 border-sky-400 animate-ping opacity-60" />
          )}

          {/* Frosted Glass HP Monogram Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-sky-200 dark:border-sky-500/40 shadow-[0_12px_40px_rgba(2,132,199,0.18)] dark:shadow-[0_12px_40px_rgba(56,189,248,0.22)] flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
            {/* Shimmering glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-white/30 to-transparent dark:from-sky-500/15 dark:via-white/5 opacity-80 pointer-events-none" />

            {/* Subtle inner radial gradient */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-sky-400/30 rounded-full blur-xl pointer-events-none" />

            {/* The "HP" Emblem */}
            <span className="relative z-10 text-3xl sm:text-4xl font-black font-mono tracking-tighter bg-gradient-to-br from-slate-900 via-sky-700 to-sky-500 dark:from-white dark:via-sky-200 dark:to-sky-400 bg-clip-text text-transparent">
              HP
            </span>

            {/* Glowing scanline laser beam */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-[bounce_2.5s_infinite] opacity-75" />
          </div>
        </div>

        {/* =====================================================================
            NUMERIC COUNTER (00% -> 100%)
            ===================================================================== */}
        <div className="flex items-baseline justify-center mb-3">
          <span className="text-6xl sm:text-7xl font-mono font-black tracking-tight text-slate-900 dark:text-white tabular-nums drop-shadow-sm">
            {String(progress).padStart(2, "0")}
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-sky-600 dark:text-sky-400 ml-1.5">
            %
          </span>
        </div>

        {/* Dynamic Status Text with pulsing indicator */}
        <div className="h-7 px-4 rounded-full bg-white/70 dark:bg-slate-900/70 border border-sky-200/70 dark:border-sky-500/30 backdrop-blur-md shadow-xs flex items-center gap-2.5 transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-300">
            {statusText}
          </span>
        </div>

        {/* =====================================================================
            FLUID CYAN PROGRESS BEAM
            ===================================================================== */}
        <div className="w-64 sm:w-72 h-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-full mt-7 overflow-hidden relative shadow-inner">
          {/* Active Glowing Beam */}
          <div
            className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-300 transition-all duration-100 ease-out rounded-full shadow-[0_0_12px_rgba(56,189,248,0.85)] relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer light tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        {/* Progress milestones */}
        <div className="w-64 sm:w-72 flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-2 px-0.5">
          <span>BOOT</span>
          <span>SPATIAL</span>
          <span>KERNEL</span>
          <span className={progress === 100 ? "text-sky-500 font-bold" : ""}>
            READY
          </span>
        </div>
      </div>

      {/* =====================================================================
          BOTTOM FOOTER TELEMETRY
          ===================================================================== */}
      <div className="absolute bottom-8 inset-x-0 text-center px-4">
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          LÊ CÔNG HOÀNG PHÚC · SOFTWARE & MOBILE ENGINEER · 2026
        </p>
      </div>
    </div>
  );
}
