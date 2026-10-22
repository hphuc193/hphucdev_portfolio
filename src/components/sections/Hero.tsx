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

  // Preloaded frame images buffer for instant 60fps frame scrubbing
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

  // Set adaptive canvas resolution maintaining true 2:1 aspect ratio (1920x960 / 1200x600)
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    const isMobile = window.innerWidth < 768;
    canvasRef.current.width = isMobile ? 1200 : 1920;
    canvasRef.current.height = isMobile ? 600 : 960;
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

  // Progressive frame loading: Instant Frame 1, followed by non-blocking chunked batches
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
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
      const batchSize = isMobile ? 12 : 24;
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

    const timeoutId = setTimeout(loadNextBatch, 40);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [drawFrame]);

  // Scroll-Driven Animation: 8s Total (192 frames @ 24fps)
  // Phase 1: Pinned for 5.0s (Frames 0->119)
  // Phase 2: Unpins and continues moving for remaining 3.0s (Frames 120->191) as user scrolls down
  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    const isMobile = window.innerWidth < 768;
    const PIN_SCROLL_DISTANCE = isMobile ? 950 : 1600;

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
      // Pinning hero section during Phase 1
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
      /* 
        ALWAYS LIGHT THEME HERO INTERFACE:
        Base background matches the video's edge colors: #eaf3f8 to #edf6fa
      */
      className="relative min-h-screen w-full pt-24 pb-8 flex flex-col justify-between overflow-hidden px-4 md:px-8 lg:px-14 bg-gradient-to-b from-[#eaf3f8] via-[#eef6fa] to-[#edf5f9] text-[#090d16] select-none"
    >
      {/* =========================================================================
          FULL-SCREEN BACKGROUND SCROLL TRANSFORM 3D VIDEO / CANVAS
          - Paused at Frame 1 (0.0s) on initial load.
          - Full background coverage (object-cover) with zero exposed borders or background leakage.
          - Pinned to right edge with a soft artistic feathered dissolve from the left.
          - Scrubs seamlessly from 0.0s to 3.0s as user scrolls.
          ========================================================================= */}
      <div
        ref={backgroundStageRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      >
        {/* High-Performance 60fps HTML5 Canvas Engine - True 2:1 ratio (1920x960), refined scale to fit gracefully */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={960}
          className="absolute inset-0 w-full h-full object-cover object-[68%_center] sm:object-[60%_center] md:object-right block select-none pointer-events-none scale-[0.85] sm:scale-[0.82] lg:scale-[0.78] origin-[85%_50%]"
        />

        {/* Instant Frame 1 Still while canvas initial buffers load */}
        {!canvasReady && (
          <img
            src={`/videos/hero_frames/frame_001.webp?v=${CACHE_KEY}`}
            alt="HOANGPHUC 3D Stage Background Still"
            className="absolute inset-0 w-full h-full object-cover object-[68%_center] sm:object-[60%_center] md:object-right block select-none pointer-events-none scale-[0.85] sm:scale-[0.82] lg:scale-[0.78] origin-[85%_50%]"
          />
        )}

        {/* Artistic left feathered gradient dissolve: softens the left boundary so text has pristine readability & zero borders exposed */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[58%] md:w-[53%] lg:w-[48%] bg-gradient-to-r from-[#eaf3f8] via-[#eaf3f8]/95 via-50% to-transparent pointer-events-none z-10" />

        {/* Top, bottom & right subtle atmosphere feather: guarantees zero hard edge cuts or border leakage on any viewport size */}
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
          TOP TELEMETRY / STATUS BAR (Z-20, FLOATS ABOVE BACKGROUND)
          ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-700 border-b border-slate-300/80 pb-3 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-slate-900 font-semibold tracking-wide">
            {locale === "vi" ? portfolioData.personal.status.vi : portfolioData.personal.status.en}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-slate-700">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            10.82°N · 106.63°E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/95 text-sky-700 font-bold border border-sky-400/40 text-[9px] shadow-xs">
            <CounterBadge value={31} suffix=" REPOSITORIES" />
          </span>
          <span className="text-slate-700 font-semibold text-[11px]">HP-CORE v2026</span>
        </div>
      </div>

      {/* =========================================================================
          HERO FOREGROUND CONTENT (Z-10, FLOATS ELEGANTLY OVER 3D BACKGROUND)
          ========================================================================= */}
      <div
        ref={foregroundContentRef}
        className="my-auto py-6 z-10 relative flex flex-col lg:flex-row items-center justify-between gap-8 will-change-transform"
      >
        {/* Left Column: Glassmorphic Typography & Action Deck */}
        <div className="w-full lg:max-w-[580px] flex flex-col justify-center space-y-5">
          {/* 1. Category Pill: # SOFTWARE & MOBILE ENGINEER */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-white/90 backdrop-blur-xl w-fit shadow-sm">
            <span className="text-sky-600 font-mono font-bold text-xs">#</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-700 font-bold">
              SOFTWARE & MOBILE ENGINEER
            </span>
          </div>

          {/* 2. Headline: HOANGPHUC - refined slightly for elegance */}
          <div className="space-y-1">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.85rem] font-black tracking-tight text-slate-900 leading-[0.92] select-none hover:text-sky-600 transition-colors duration-500 will-change-transform drop-shadow-[0_4px_12px_rgba(255,255,255,0.8)]"
            >
              HOANGPHUC
            </h1>

            {/* Sub-headline: Hoàng Phúc · Lê Công Hoàng Phúc */}
            <div className="pt-1">
              <span className="text-base sm:text-lg md:text-xl font-light text-slate-600 italic">
                Hoàng Phúc · Lê Công Hoàng Phúc
              </span>
            </div>
          </div>

          {/* 3. Dynamic Terminal Typing Line: > Mobile Applications */}
          <div className="h-8 flex items-center overflow-hidden font-mono text-base sm:text-lg font-bold">
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

          {/* 4. Bio Paragraph with Glass Backing for Pristine Readability */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(56,189,248,0.06)] max-w-lg">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {locale === "vi"
                ? "Tôi phát triển các ứng dụng di động và hệ thống phần mềm kết hợp trải nghiệm người dùng tinh tế, kiến trúc backend tin cậy và công nghệ thông minh."
                : "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and intelligent technology."}
            </p>
          </div>

          {/* 5. Action Buttons - Refined sizing */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={scrollToWork}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-[13px] tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_rgba(2,132,199,0.35)] flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{locale === "vi" ? "Khám Phá Các Dự Án" : "Explore Selected Work"}</span>
              <span className="text-sm font-bold">→</span>
            </button>
          </div>

          {/* 6. Three Stat Counters Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-300/80 max-w-md">
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-sky-600">
                <CounterBadge value={31} />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Public Repos
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                <CounterBadge value={175} suffix="M" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Maker Scholarship
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-sky-600">
                <CounterBadge value={5} suffix="+" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-mono tracking-tight mt-0.5">
                Core Projects
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Telemetry Accents (Floating over the 3D Character) */}
        <div className="hidden lg:flex flex-col items-end justify-between self-stretch py-3 pointer-events-none">
          {/* Top-Right Floating Badge: </> CODE · BUILD · IMPACT */}
          <div className="hero-3d-badge-top px-2.5 py-1 rounded-full bg-white/95 border border-slate-200/90 backdrop-blur-xl shadow-sm flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-800 transition-transform">
            <span className="text-sky-600 font-mono font-black text-[9px]">&lt;/&gt;</span>
            <span>CODE · BUILD · IMPACT</span>
          </div>

          {/* Interactive Scroll Prompt */}
          <div className="px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-[9px] font-mono font-semibold text-sky-800 flex items-center gap-1.5 shadow-xs backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5 text-sky-600 animate-pulse" />
            <span>SCROLL TO TRANSFORM (5s / 8s)</span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          BOTTOM KINETIC VELOCITY MARQUEE TICKER (Z-20, FLOATS ABOVE BACKGROUND)
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
