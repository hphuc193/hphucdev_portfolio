"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Sparkles,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 192; // 8 seconds @ 24fps
const CACHE_KEY = "v20261013_v3";

export function Hero() {
  const { locale, playUiSound } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const foregroundContentRef = useRef<HTMLDivElement>(null);
  const backgroundStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);

  // Preloaded frame images buffer for instant 60fps frame scrubbing (desktop only)
  const framesBufferRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const isDrawingRef = useRef<boolean>(false);

  const roles = [
    { en: "Mobile Applications", vi: "Ứng dụng Di động" },
    { en: "Flutter & Dart Specialist", vi: "Chuyên sâu Flutter & Dart" },
    { en: "Kotlin Android Native", vi: "Android Native với Kotlin" },
    { en: "SwiftUI iOS Systems", vi: "Hệ thống iOS với SwiftUI" },
    { en: "AI & Machine Learning", vi: "Trí tuệ Nhân tạo & ML" },
    { en: "Backend & Systems", vi: "Backend & Kiến trúc Hệ thống" },
  ];

  // Cycling roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Set adaptive canvas resolution on desktop (1920x960)
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    if (window.innerWidth < 1024) return;
    canvasRef.current.width = 1920;
    canvasRef.current.height = 960;
  }, []);

  // Render a specific frame onto the background canvas with double-buffering / RAF safety
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = framesBufferRef.current[frameIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Progressive frame loading: ONLY on Desktop (>= 1024px)
  // Completely disabled on mobile to prevent memory bloat, high battery drain, and heating
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return; // Zero heavy loading on mobile

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    framesBufferRef.current = images;

    // 1. Immediately load Frame 1 for zero-lag initial paint
    const img1 = new Image();
    img1.src = `/videos/hero_frames/frame_001.webp?v=${CACHE_KEY}`;
    img1.onload = () => {
      images[0] = img1;
      drawFrame(0);
      setCanvasReady(true);
    };

    // 2. Load remaining frames in progressive batches via requestIdleCallback / setTimeout
    let currentBatch = 1;
    let cancelled = false;

    const loadNextBatch = () => {
      if (cancelled) return;
      const batchSize = 24;
      const end = Math.min(TOTAL_FRAMES, currentBatch + batchSize);

      for (let i = currentBatch; i < end; i++) {
        const img = new Image();
        const frameNum = String(i + 1).padStart(3, "0");
        img.src = `/videos/hero_frames/frame_${frameNum}.webp?v=${CACHE_KEY}`;
        images[i] = img;
      }

      currentBatch = end;
      if (currentBatch < TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(
            () => loadNextBatch(),
            { timeout: 70 }
          );
        } else {
          setTimeout(loadNextBatch, 20);
        }
      }
    };

    const timeoutId = setTimeout(loadNextBatch, 50);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [drawFrame]);

  // Scroll-Driven Animation: ONLY on Desktop (>= 1024px)
  // On mobile (< 1024px), scroll transform and pinning are completely omitted for pure native 120fps scrolling
  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    if (window.innerWidth < 1024) return; // Completely disabled on mobile/tablet

    const PIN_SCROLL_DISTANCE = 1600;

    const updateFrame = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let targetFrame = 0;
      let videoTime = 0;

      if (scrollY <= PIN_SCROLL_DISTANCE) {
        // Phase 1: 0s to 5s (Frames 0 to 119) while pinned
        const progress = Math.max(0, Math.min(1, scrollY / PIN_SCROLL_DISTANCE));
        targetFrame = Math.min(119, Math.floor(progress * 119));
        videoTime = progress * 5.0;
      } else {
        // Phase 2: 5s to 8s (Frames 120 to 191) as hero glides off screen
        const exitDistance = window.innerHeight || 800;
        const exitProgress = Math.max(0, Math.min(1, (scrollY - PIN_SCROLL_DISTANCE) / exitDistance));
        targetFrame = Math.min(191, Math.floor(120 + exitProgress * 71));
        videoTime = 5.0 + exitProgress * 3.0;
      }

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (!isDrawingRef.current) {
          isDrawingRef.current = true;
          requestAnimationFrame(() => {
            drawFrame(targetFrame);
            isDrawingRef.current = false;
          });
        }
      }

      if (videoFallbackRef.current && videoFallbackRef.current.duration) {
        videoFallbackRef.current.currentTime = videoTime;
      }
    };

    window.addEventListener("scroll", updateFrame, { passive: true });

    const ctx = gsap.context(() => {
      // Pinning hero section during Phase 1 on desktop
      ScrollTrigger.create({
        trigger: heroRef.current,
        pin: true,
        start: "top top",
        end: `+=${PIN_SCROLL_DISTANCE}`,
        scrub: true,
        onUpdate: updateFrame,
      });

      // Foreground Content Parallax & Smooth Fade
      if (foregroundContentRef.current) {
        gsap.to(foregroundContentRef.current, {
          y: -70,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: `+=${PIN_SCROLL_DISTANCE}`,
            scrub: 1,
          },
        });
      }

      // Volumetric Light Ray Drift
      if (lightRaysRef.current) {
        gsap.to(lightRaysRef.current, {
          y: -90,
          rotate: 15,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: `+=${PIN_SCROLL_DISTANCE}`,
            scrub: 1.2,
          },
        });
      }

      // Floating 3D Telemetry Badges Multi-plane Parallax
      gsap.to(".hero-3d-badge-top", {
        y: -110,
        x: 15,
        rotate: 4,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: `+=${PIN_SCROLL_DISTANCE}`,
          scrub: 1.4,
        },
      });
    }, heroRef);

    // Initial frame update on mount
    updateFrame();

    return () => {
      window.removeEventListener("scroll", updateFrame);
      ctx.revert();
    };
  }, [drawFrame]);

  const scrollToWork = () => {
    playUiSound("whoosh");
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full pt-20 sm:pt-24 pb-6 sm:pb-8 flex flex-col justify-between overflow-hidden px-4 sm:px-6 md:px-8 lg:px-14 bg-gradient-to-b from-[#eaf3f8] via-[#eef6fa] to-[#edf5f9] text-[#090d16] select-none"
    >
      {/* =========================================================================
          DESKTOP FULL-SCREEN BACKGROUND SCROLL TRANSFORM (lg:block only)
          - Paused at Frame 1 on initial load.
          - Scrubs seamlessly as user scrolls on desktop screens (>=1024px).
          - Completely omitted on mobile for zero GPU/CPU battery drain.
          ========================================================================= */}
      <div
        ref={backgroundStageRef}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          width={1920}
          height={960}
          className="absolute inset-0 w-full h-full object-cover md:object-right block select-none pointer-events-none lg:scale-[0.78] origin-[85%_50%]"
        />

        {!canvasReady && (
          <img
            src={`/videos/hero_frames/frame_001.webp?v=${CACHE_KEY}`}
            alt="HOANGPHUC 3D Stage Background Still"
            className="absolute inset-0 w-full h-full object-cover md:object-right block select-none pointer-events-none lg:scale-[0.78] origin-[85%_50%]"
          />
        )}

        {/* Artistic left feathered gradient dissolve */}
        <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#eaf3f8] via-[#eaf3f8]/95 via-50% to-transparent pointer-events-none z-10" />

        {/* Atmosphere feather borders */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#eaf3f8] via-[#eaf3f8]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#edf5f9] via-[#edf5f9]/85 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#eaf3f8]/70 to-transparent pointer-events-none z-10" />

        {/* Fallback All-Intra 8s Video */}
        <video
          ref={videoFallbackRef}
          muted
          playsInline
          preload="auto"
          className="hidden"
        >
          <source src={`/videos/hero-scroll-8s.mp4?${CACHE_KEY}`} type="video/mp4" />
        </video>

        {/* Volumetric Atmospheric Light Rays Extension */}
        <div
          ref={lightRaysRef}
          className="hero-light-ray absolute -top-28 -right-28 w-[80vw] h-[80vw] max-w-[1050px] max-h-[1050px] pointer-events-none -z-10 opacity-70"
          style={{
            background:
              "conic-gradient(from 215deg at 80% 20%, rgba(56,189,248,0.22) 0deg, rgba(255,255,255,0.1) 45deg, transparent 90deg, rgba(56,189,248,0.18) 140deg, transparent 180deg)",
            filter: "blur(45px)",
          }}
        />

        {/* Ambient Soft Cyan Aura */}
        <div className="absolute top-1/3 right-1/4 w-[48vw] h-[48vw] max-w-[620px] max-h-[620px] rounded-full bg-sky-400/20 blur-[140px] pointer-events-none -z-10" />
      </div>

      {/* =========================================================================
          TOP TELEMETRY / STATUS BAR (Z-20, RESPONSIVE FOR ALL DEVICES)
          ========================================================================= */}
      <div className="flex items-center justify-between gap-3 text-xs font-mono text-slate-700 border-b border-slate-300/80 pb-3 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-slate-900 font-semibold tracking-wide text-[11px] sm:text-xs">
            {locale === "vi" ? portfolioData.personal.status.vi : portfolioData.personal.status.en}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-700">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            10.82°N · 106.63°E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/95 text-sky-700 font-bold border border-sky-400/40 text-[9px] shadow-xs">
            <CounterBadge value={31} suffix=" REPOS" />
          </span>
          <span className="text-slate-700 font-semibold text-[10px] sm:text-[11px]">HP-CORE v2026</span>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW LAYOUT (lg:hidden) - ELEGANT, CRISP, LIGHTWEIGHT & COOL
          - No text covering the character's face
          - Framed 3D Stage Visual with floating telemetry
          - Native 120Hz silky scrolling with zero phone heating
          ========================================================================= */}
      <div className="block lg:hidden z-10 relative my-auto py-3 sm:py-4 space-y-4">
        {/* 1. Chuyên ngành (Domain & Status Badge) */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/10 via-white/95 to-cyan-500/10 backdrop-blur-md shadow-[0_2px_12px_rgba(2,132,199,0.1)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-[0_0_6px_#0284c7]" />
            </span>
            <span className="text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.12em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600">
              SOFTWARE &amp; MOBILE ARCHITECT
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/85 border border-slate-200/90 text-[10px] font-mono text-slate-500 flex items-center gap-1 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">VERIFIED</span>
          </div>
        </div>

        {/* 2. Headline & Artistic Signature Byline */}
        <div className="relative pt-1 space-y-1">
          {/* Ambient subtle backglow behind name */}
          <div className="absolute -left-4 -top-3 w-48 h-16 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative">
            <h1 className="font-[family-name:var(--font-syne)] text-[clamp(1.75rem,7.5vw,2.35rem)] sm:text-[3rem] font-extrabold tracking-[-0.04em] leading-[0.95] select-none text-slate-900 drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)] whitespace-nowrap">
              HOANG<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500">PHUC</span>
            </h1>
          </div>

          {/* Designer Signature Byline */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="h-[2px] w-6 bg-gradient-to-r from-sky-500 to-transparent rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-800">
              Hoàng Phúc
            </span>
            <span className="w-1 h-1 rounded-full bg-sky-400" />
            <span className="text-xs sm:text-sm font-light text-slate-500 font-mono tracking-tight">
              Lê Công Hoàng Phúc
            </span>
          </div>
        </div>

        {/* 3. Sở trường (Core Specialties & Dynamic Superpowers) */}
        <div className="space-y-2 pt-0.5">
          {/* Active Specialty Capsule with Glowing Border */}
          <div className="relative rounded-2xl p-3 bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white shadow-[0_8px_24px_rgba(2,132,199,0.2)] border border-sky-400/35 overflow-hidden">
            {/* Ambient internal light */}
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                <span>{locale === "vi" ? "SỞ TRƯỜNG CHUYÊN SÂU" : "CORE SPECIALTY"}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/25 border border-sky-400/40 text-[9px] font-mono font-bold text-sky-300">
                0{roleIndex + 1} / 06
              </span>
            </div>

            {/* Dynamic Title */}
            <div className="h-6 flex items-center text-sm sm:text-base font-bold font-sans tracking-tight text-white">
              <span className="text-sky-400 font-mono mr-1.5">&gt;</span>
              <div key={roleIndex} className="flex items-center">
                <span className="font-bold text-white tracking-tight">
                  {locale === "vi" ? roles[roleIndex].vi : roles[roleIndex].en}
                </span>
                <span className="inline-block w-1.5 h-3.5 bg-sky-400 ml-1.5 animate-pulse rounded-xs shadow-[0_0_8px_#38bdf8]" />
              </div>
            </div>
          </div>

          {/* Signature Tech Badges (Highlights) */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Flutter & Dart", desc: "Cross-Platform", dot: "bg-sky-500" },
              { label: "Kotlin Native", desc: "Android Media3", dot: "bg-indigo-500" },
              { label: "SwiftUI iOS", desc: "Combine & Core", dot: "bg-cyan-500" },
              { label: "Applied AI", desc: "LLM & ML", dot: "bg-amber-500" },
            ].map((tech) => (
              <div
                key={tech.label}
                className="px-2.5 py-1 rounded-xl text-[10px] font-mono bg-white/90 border border-slate-200/90 backdrop-blur-md shadow-2xs flex items-center gap-1.5"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${tech.dot}`} />
                <span className="font-bold text-slate-800">{tech.label}</span>
                <span className="text-slate-300">·</span>
                <span className="text-[9px] text-slate-500">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 3D Character Showcase Card (Crisp, High-Quality, Framed & Non-Overlapping) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/90 via-sky-50/50 to-white/95 border border-sky-200/80 shadow-[0_10px_25px_rgba(2,132,199,0.08)] p-2">
          {/* Floating tech badges */}
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs text-[9px] font-mono font-bold text-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span>3D BUILDER REALM</span>
          </div>
          
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-400/30 shadow-xs text-[9px] font-mono font-bold text-sky-200">
            <span className="text-sky-400 font-bold">&lt;/&gt;</span>
            <span>MOBILE & AI</span>
          </div>

          <img
            src="/images/hero-mobile-stage.webp"
            alt="HOANGPHUC - Mobile & Software Engineer 3D Stage"
            width={960}
            height={744}
            loading="eager"
            decoding="async"
            className="w-full h-auto rounded-xl object-cover"
          />

          {/* Ambient bottom dissolve inside card */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        </div>

        {/* 5. Bio Card with Glass Backing */}
        <div className="p-3.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {locale === "vi"
              ? "Tôi phát triển các ứng dụng di động và hệ thống phần mềm kết hợp trải nghiệm người dùng tinh tế, kiến trúc backend tin cậy và công nghệ thông minh."
              : "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and intelligent technology."}
          </p>
        </div>

        {/* 6. Action Button */}
        <div>
          <button
            onClick={scrollToWork}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-[13px] tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{locale === "vi" ? "Khám Phá Các Dự Án" : "Explore Selected Work"}</span>
            <span className="text-sm font-bold">→</span>
          </button>
        </div>

        {/* 7. Stats Counters Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-300/80">
          <div className="p-2 rounded-xl bg-white/60 border border-slate-200/60 text-center">
            <div className="text-lg font-black font-mono text-sky-600">
              <CounterBadge value={31} />
            </div>
            <div className="text-[9px] text-slate-600 font-mono tracking-tight mt-0.5">
              Public Repos
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white/60 border border-slate-200/60 text-center">
            <div className="text-lg font-black font-mono text-slate-900">
              <CounterBadge value={175} suffix="M" />
            </div>
            <div className="text-[9px] text-slate-600 font-mono tracking-tight mt-0.5">
              Scholarship
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white/60 border border-slate-200/60 text-center">
            <div className="text-lg font-black font-mono text-sky-600">
              <CounterBadge value={5} suffix="+" />
            </div>
            <div className="text-[9px] text-slate-600 font-mono tracking-tight mt-0.5">
              Projects
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP VIEW FOREGROUND CONTENT (lg:flex) - WITH PARALLAX & DUAL-COLUMN
          ========================================================================= */}
      <div
        ref={foregroundContentRef}
        className="hidden lg:flex my-auto py-6 z-10 relative flex-row items-center justify-between gap-8 will-change-transform"
      >
        {/* Left Column: Glassmorphic Typography & Action Deck */}
        <div className="w-full max-w-[580px] flex flex-col justify-center space-y-5">
          {/* 1. Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-white/90 backdrop-blur-xl w-fit shadow-sm">
            <span className="text-sky-600 font-mono font-bold text-xs">#</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-700 font-bold">
              SOFTWARE & MOBILE ENGINEER
            </span>
          </div>

          {/* 2. Headline */}
          <div className="space-y-1">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.85rem] font-black tracking-tight text-slate-900 leading-[0.92] select-none hover:text-sky-600 transition-colors duration-500 will-change-transform drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)]"
            >
              HOANGPHUC
            </h1>
            <div className="pt-1">
              <span className="text-lg md:text-xl font-light text-slate-600 italic">
                Hoàng Phúc · Lê Công Hoàng Phúc
              </span>
            </div>
          </div>

          {/* 3. Dynamic Terminal Typing Line */}
          <div className="h-8 flex items-center overflow-hidden font-mono text-lg font-bold">
            <span className="text-sky-600 mr-2">&gt;</span>
            <div
              key={roleIndex}
              className="text-sky-600 flex items-center transition-all duration-300"
            >
              <ScrambleText
                text={locale === "vi" ? roles[roleIndex].vi : roles[roleIndex].en}
                triggerOnHover={false}
              />
              <span className="inline-block w-2 h-3.5 bg-sky-600 ml-1 animate-pulse" />
            </div>
          </div>

          {/* 4. Bio Paragraph */}
          <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(56,189,248,0.06)] max-w-lg">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {locale === "vi"
                ? "Tôi phát triển các ứng dụng di động và hệ thống phần mềm kết hợp trải nghiệm người dùng tinh tế, kiến trúc backend tin cậy và công nghệ thông minh."
                : "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and intelligent technology."}
            </p>
          </div>

          {/* 5. Action Button */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={scrollToWork}
              className="px-6 py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-[13px] tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(2,132,199,0.35)] flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{locale === "vi" ? "Khám Phá Các Dự Án" : "Explore Selected Work"}</span>
              <span className="text-sm font-bold">→</span>
            </button>
          </div>

          {/* 6. Three Stat Counters Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-300/80 max-w-md">
            <div>
              <div className="text-2xl font-black font-mono text-sky-600">
                <CounterBadge value={31} />
              </div>
              <div className="text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Public Repos
              </div>
            </div>

            <div>
              <div className="text-2xl font-black font-mono text-slate-900">
                <CounterBadge value={175} suffix="M" />
              </div>
              <div className="text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Maker Scholarship
              </div>
            </div>

            <div>
              <div className="text-2xl font-black font-mono text-sky-600">
                <CounterBadge value={5} suffix="+" />
              </div>
              <div className="text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Core Projects
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Telemetry Accents */}
        <div className="flex flex-col items-end justify-between self-stretch py-3 pointer-events-none">
          <div className="hero-3d-badge-top px-2.5 py-1 rounded-full bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-sm flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-800 transition-transform">
            <span className="text-sky-600 font-mono font-black text-[9px]">&lt;/&gt;</span>
            <span>CODE · BUILD · IMPACT</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-[9px] font-mono font-semibold text-sky-800 flex items-center gap-1.5 shadow-xs backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5 text-sky-600 animate-pulse" />
            <span>SCROLL TO TRANSFORM (5s / 8s)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM KINETIC VELOCITY MARQUEE TICKER (SHARED Z-20)
          ========================================================================= */}
      <div className="border-t border-slate-300/80 pt-3 overflow-hidden z-20 relative">
        <VelocityMarquee
          baseVelocity={0.7}
          className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-slate-600"
        >
          <span>C# .NET WINFORMS</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>FLUTTER ENGINEERING</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>KOTLIN ANDROID MEDIA3</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>SWIFTUI & COMBINE</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>NODE.JS & WEBSOCKET GATEWAY</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>POSTGRESQL & POSTGIS SPATIAL</span>
          <span className="text-sky-600 font-bold px-2">+</span>
          <span>APPLIED AI & MACHINE LEARNING</span>
          <span className="text-sky-600 font-bold px-2">+</span>
        </VelocityMarquee>
      </div>
    </section>
  );
}
