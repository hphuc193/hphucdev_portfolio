"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { ScrambleText } from "@/hooks/useTextScramble";
import { CounterBadge } from "@/hooks/useCounter";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import {
  Compass,
  MapPin,
  ArrowRight,
  Code2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const { locale, playUiSound } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);

  const roles = [
    { en: "Mobile Applications", vi: "Ứng dụng Di động" },
    { en: "Flutter & Dart Specialist", vi: "Chuyên sâu Flutter & Dart" },
    { en: "Kotlin Android Native", vi: "Android Native với Kotlin" },
    { en: "SwiftUI iOS Systems", vi: "Hệ thống iOS với SwiftUI" },
    { en: "Applied AI & Machine Learning", vi: "Trí tuệ Nhân tạo & ML" },
    { en: "Backend & Cloud Systems", vi: "Backend & Kiến trúc Đám mây" },
  ];

  // Cycling roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Entrance animation
  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }
        );
      }
      if (imageStageRef.current) {
        gsap.fromTo(
          imageStageRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out", delay: 0.1 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    playUiSound("whoosh");
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full pt-20 sm:pt-24 pb-4 sm:pb-6 flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-gradient-to-b from-[#f0f6fa] via-[#f4f8fb] to-[#f8fafc] dark:from-[#070b14] dark:via-[#090f1d] dark:to-[#070910] text-[#090d16] dark:text-white select-none transition-colors duration-500"
    >
      {/* Soft celestial sky-blue ambient aura behind the 3D character matching the sample composition */}
      <div
        className="absolute top-1/4 right-[8%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(196, 222, 249, 0.65) 0%, rgba(224, 242, 254, 0.3) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle top left ambient light fill */}
      <div className="absolute top-10 left-5 w-[35vw] h-[35vw] max-w-[480px] max-h-[480px] rounded-full bg-sky-200/30 dark:bg-sky-500/10 blur-[100px] pointer-events-none -z-0" />

      {/* =========================================================================
          TOP TELEMETRY / STATUS BAR (Z-20)
          ========================================================================= */}
      <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-700 dark:text-slate-300 border-b border-slate-200/90 dark:border-slate-800 pb-3 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold tracking-wide text-[11px] sm:text-xs">
            {locale === "vi" ? portfolioData.personal.status.vi : portfolioData.personal.status.en}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Compass className="w-3.5 h-3.5 text-[#0284C7]" />
            10.82°N · 106.63°E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#0284C7] dark:text-sky-400 font-bold border border-sky-400/30 text-[9px] shadow-2xs">
            <CounterBadge value={31} suffix=" REPOS" />
          </span>
          <span className="text-slate-600 dark:text-slate-400 font-semibold text-[10px] sm:text-[11px]">HP-CORE v2026</span>
        </div>
      </div>

      {/* =========================================================================
          MAIN HERO BODY COMPOSITION (SEAMLESS DUAL COLUMN MATCHING SAMPLE MOCKUP)
          ========================================================================= */}
      <div className="my-auto py-4 sm:py-6 z-10 relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 xl:gap-12">
        {/* LEFT COLUMN: Clean Editorial Typography & Action Elements */}
        <div
          ref={leftColRef}
          className="w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-center space-y-4 sm:space-y-5 shrink-0"
        >
          {/* 1. Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md w-fit shadow-2xs">
            <span className="text-[#0284C7] font-mono font-black text-xs">#</span>
            <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-700 dark:text-slate-300 font-bold">
              SOFTWARE &amp; MOBILE ENGINEER
            </span>
          </div>

          {/* 2. Main Headline & Subtitle */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-black tracking-[-0.035em] text-[#0A0D14] dark:text-white leading-[0.93] select-none">
              HOANGPHUC
            </h1>
            <div className="pt-0.5">
              <span className="text-base sm:text-lg md:text-xl font-light text-slate-500 dark:text-slate-400 italic tracking-tight">
                Hoàng Phúc · Lê Công Hoàng Phúc
              </span>
            </div>
          </div>

          {/* 3. Dynamic Terminal Typing Line */}
          <div className="h-7 sm:h-8 flex items-center overflow-hidden font-mono text-base sm:text-lg md:text-xl font-bold">
            <span className="text-[#0284C7] mr-2">&gt;</span>
            <div
              key={roleIndex}
              className="text-[#0284C7] dark:text-sky-400 flex items-center transition-all duration-300"
            >
              <ScrambleText
                text={locale === "vi" ? roles[roleIndex].vi : roles[roleIndex].en}
                triggerOnHover={false}
              />
              <span className="inline-block w-2 h-4 bg-[#0284C7] dark:bg-sky-400 ml-1.5 animate-pulse" />
            </div>
          </div>

          {/* 4. Bio Paragraph (Unboxed, pure typography sitting naturally on canvas) */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-normal">
            {locale === "vi"
              ? "Tôi phát triển các ứng dụng di động và hệ thống phần mềm kết hợp trải nghiệm người dùng tinh tế, kiến trúc backend tin cậy và công nghệ thông minh."
              : "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and intelligent technology."}
          </p>

          {/* 5. Action Button */}
          <div className="pt-1">
            <button
              onClick={scrollToWork}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 hover:scale-[1.03] active:scale-95 flex items-center gap-2.5 cursor-pointer w-fit"
            >
              <span>{locale === "vi" ? "Khám Phá Các Dự Án" : "Explore Selected Work"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6. Three Stat Counters Strip */}
          <div className="grid grid-cols-3 gap-4 pt-4 sm:pt-6 border-t border-slate-200/90 dark:border-slate-800 max-w-md">
            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#0284C7] dark:text-sky-400">
                <CounterBadge value={31} />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-0.5 font-medium">
                Public Repos
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-slate-100">
                <CounterBadge value={175} suffix="M" />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-0.5 font-medium">
                Maker Scholarship
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-[#0284C7] dark:text-sky-400">
                <CounterBadge value={5} suffix="+" />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight mt-0.5 font-medium">
                Core Projects
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The 3D Developer Realm Artwork (Floating naturally on canvas without any card/box borders) */}
        <div
          ref={imageStageRef}
          className="w-full lg:w-[56%] xl:w-[58%] relative flex items-center justify-center lg:justify-end select-none pointer-events-none"
        >
          {/* Top Floating Badge: </> CODE · BUILD · IMPACT */}
          <div className="absolute top-2 sm:top-4 right-6 sm:right-16 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200">
            <span className="text-[#0284C7] font-black">&lt;/&gt;</span>
            <span>CODE · BUILD · IMPACT</span>
          </div>

          {/* Bottom Right Floating Location Pill: 📍 Ho Chi Minh City, VN */}
          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-sm text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300">
            <MapPin className="w-3 h-3 text-[#0284C7]" />
            <span>Ho Chi Minh City, VN</span>
          </div>

          {/* Authentic High-Resolution Artwork floating naturally on the canvas */}
          <img
            src="/images/portrait2.png"
            alt="HOANGPHUC 3D Developer Realm"
            className="w-full h-auto max-h-[580px] lg:max-h-[640px] xl:max-h-[700px] object-contain object-center lg:object-right select-none drop-shadow-[0_20px_50px_rgba(2,132,199,0.18)]"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* =========================================================================
          BOTTOM KINETIC VELOCITY MARQUEE TICKER (SHARED Z-20)
          ========================================================================= */}
      <div className="border-t border-slate-200/90 dark:border-slate-800 pt-3 overflow-hidden z-20 relative">
        <VelocityMarquee
          baseVelocity={0.7}
          className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400"
        >
          <span>C# .NET WINFORMS</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>FLUTTER ENGINEERING</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>KOTLIN ANDROID MEDIA3</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>SWIFTUI & COMBINE</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>NODE.JS & WEBSOCKET GATEWAY</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>POSTGRESQL & POSTGIS SPATIAL</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
          <span>APPLIED AI & MACHINE LEARNING</span>
          <span className="text-[#0284C7] font-bold px-2">+</span>
        </VelocityMarquee>
      </div>
    </section>
  );
}
