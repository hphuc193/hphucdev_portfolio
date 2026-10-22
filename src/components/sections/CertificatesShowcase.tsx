"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData, CertificateItem } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Maximize2,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Info,
  Building,
  Calendar,
  Award,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CACHE_KEY = "v20261012e";

// Architectural exhibition configuration for non-linear, spatial floating presentation
// Alternate heights, subtle tilts, and varied depth coordinates to break traditional boring rows
interface ExhibitSpatialConfig {
  yOffset: number; // Vertical offset in px
  zRotation: number; // Subtle tilt angle in deg
  spotlightIntensity: number; // 0 to 1
  spotlightAngle: number; // Cone direction in deg
}

const EXHIBIT_SPATIAL_MATRIX: ExhibitSpatialConfig[] = [
  { yOffset: -24, zRotation: -1.0, spotlightIntensity: 0.35, spotlightAngle: -5 },
  { yOffset: -8, zRotation: 1.0, spotlightIntensity: 0.38, spotlightAngle: 5 },
  { yOffset: -28, zRotation: -0.8, spotlightIntensity: 0.32, spotlightAngle: -4 },
  { yOffset: -10, zRotation: 0.9, spotlightIntensity: 0.36, spotlightAngle: 4 },
  { yOffset: -18, zRotation: -0.3, spotlightIntensity: 0.42, spotlightAngle: 0 }, // Portrait Stele
  { yOffset: -8, zRotation: -0.8, spotlightIntensity: 0.34, spotlightAngle: -4 },
  { yOffset: -22, zRotation: 1.0, spotlightIntensity: 0.37, spotlightAngle: 5 },
];

export function CertificatesShowcase() {
  const { locale, playUiSound, theme } = usePortfolio();
  const isDark = theme === "dark";
  const { certificates } = portfolioData;

  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [showCuratorDetails, setShowCuratorDetails] = useState<boolean>(false);
  const [activeExhibitIndex, setActiveExhibitIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const horizontalTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP ScrollTrigger Pinned Horizontal Promenade (Desktop)
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Calculate exact scroll translation needed to reveal all plinths plus generous gallery exit breathing room
      const calculateScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 200);

      const tween = gsap.to(track, {
        x: () => -calculateScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.15,
          start: "top top",
          end: () => `+=${calculateScroll() * 1.25}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              certificates.length - 1,
              Math.floor(self.progress * certificates.length)
            );
            setActiveExhibitIndex(idx);
          },
        },
      });

      horizontalTweenRef.current = tween;

      // Subtle parallax float on individual museum plinths as they glide into view
      const plinthNodes = gsap.utils.toArray<HTMLElement>(".museum-spatial-plinth");
      plinthNodes.forEach((plinth, i) => {
        const speedMultiplier = i % 2 === 0 ? 1.05 : 0.95;
        gsap.fromTo(
          plinth,
          {
            opacity: 0.45,
            scale: 0.92,
            filter: "brightness(0.7)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "brightness(1)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: plinth,
              containerAnimation: tween,
              start: "left center+=260",
              end: "center center",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [certificates.length]);

  // Navigate to specific exhibit
  const scrollToExhibit = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      playUiSound("whoosh");
      setActiveExhibitIndex(index);

      if (window.innerWidth >= 1024 && horizontalTweenRef.current?.scrollTrigger) {
        const st = horizontalTweenRef.current.scrollTrigger;
        const progressTarget = index / Math.max(1, certificates.length - 1);
        const targetScroll = st.start + progressTarget * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      } else if (trackRef.current) {
        // Mobile / tablet native scroll
        const plinthElements = trackRef.current.querySelectorAll(".museum-spatial-plinth");
        if (plinthElements[index]) {
          plinthElements[index].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    },
    [certificates.length, playUiSound]
  );

  // Fullscreen Modal Helpers
  const openModal = (cert: CertificateItem, index: number) => {
    playUiSound("whoosh");
    setActiveModalCert(cert);
    setModalIndex(index);
    setShowCuratorDetails(false);
  };

  const closeModal = () => {
    setActiveModalCert(null);
  };

  const nextCert = () => {
    const nextIdx = (modalIndex + 1) % certificates.length;
    setModalIndex(nextIdx);
    setActiveModalCert(certificates[nextIdx]);
    playUiSound("whoosh");
  };

  const prevCert = () => {
    const prevIdx = (modalIndex - 1 + certificates.length) % certificates.length;
    setModalIndex(prevIdx);
    setActiveModalCert(certificates[prevIdx]);
    playUiSound("whoosh");
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (!activeModalCert) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextCert();
      if (e.key === "ArrowLeft") prevCert();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalCert, modalIndex]);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className={`relative w-full transition-colors duration-500 overflow-hidden select-none lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between ${
        isDark
          ? "bg-[#030406] text-white"
          : "bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900"
      }`}
    >
      {/* =========================================================================
          ATMOSPHERIC ARCHITECTURAL BACKGROUND (BẢO TÀNG KỸ THUẬT SỐ)
          ========================================================================= */}
      {/* Ceiling Gradient & Museum Atmosphere */}
      <div
        className={`absolute inset-x-0 top-0 h-44 pointer-events-none z-20 transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-black via-[#06080e] to-transparent"
            : "bg-gradient-to-b from-slate-200/70 via-slate-100/40 to-transparent"
        }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark
            ? "bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(56,189,248,0.12),transparent_75%)]"
            : "bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(2,132,199,0.10),transparent_75%)]"
        }`}
      />

      {/* Modern Museum Floor Perspective Grid Guidelines */}
      <div
        className={`absolute inset-x-0 bottom-0 h-64 pointer-events-none transition-opacity duration-500 ${
          isDark ? "opacity-20" : "opacity-35"
        }`}
        style={{
          backgroundImage: isDark
            ? "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.04) 1px, transparent 1px)"
            : "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to top, rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 40px",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* =========================================================================
          TOP CURATORIAL BANNER & EXHIBITION TITLE
          ========================================================================= */}
      <div className="pt-20 sm:pt-24 lg:pt-14 pb-2 sm:pb-3 lg:pb-1 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 z-30 relative shrink-0">
        <div className="space-y-2">
          {/* Subtle Curatorial Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-widest backdrop-blur-xl border transition-colors ${
              isDark
                ? "bg-black/80 border-sky-400/30 text-sky-400 shadow-2xl"
                : "bg-white/90 border-sky-500/30 text-sky-600 shadow-md"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isDark
                  ? "bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                  : "bg-sky-500 shadow-[0_0_8px_#0284c7]"
              }`}
            />
            <span>
              {locale === "vi"
                ? "BẢO TÀNG KỸ THUẬT SỐ · DIGITAL MUSEUM"
                : "DIGITAL MUSEUM · ACCREDITED ARTIFACTS"}
            </span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-black tracking-tight leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {locale === "vi" ? (
              <>
                Không Gian Trưng Bày <br className="hidden sm:inline" />
                <span
                  className={`text-transparent bg-clip-text ${
                    isDark
                      ? "bg-gradient-to-r from-sky-400 via-sky-200 to-white"
                      : "bg-gradient-to-r from-sky-600 via-blue-600 to-slate-900"
                  }`}
                >
                  Hiện Vật Chứng Chỉ.
                </span>
              </>
            ) : (
              <>
                The Archival Sanctuary <br className="hidden sm:inline" />
                <span
                  className={`text-transparent bg-clip-text ${
                    isDark
                      ? "bg-gradient-to-r from-sky-400 via-sky-200 to-white"
                      : "bg-gradient-to-r from-sky-600 via-blue-600 to-slate-900"
                  }`}
                >
                  of Verified Artifacts.
                </span>
              </>
            )}
          </h2>

        </div>

        {/* Live Exhibition Status Indicator */}
        <div
          className={`flex items-center gap-3 font-mono text-xs ${
            isDark ? "text-zinc-400" : "text-slate-600"
          }`}
        >
          <div
            className={`px-3.5 py-1.5 rounded-full border backdrop-blur-xl flex items-center gap-2 shadow-xl ${
              isDark
                ? "bg-zinc-950/80 border-white/10"
                : "bg-white/90 border-slate-200 shadow-sm"
            }`}
          >
            <span
              className={`font-bold tracking-wider ${
                isDark ? "text-sky-400" : "text-sky-600"
              }`}
            >
              EXHIBIT 0{activeExhibitIndex + 1}
            </span>
            <span className={isDark ? "text-zinc-600" : "text-slate-300"}>/</span>
            <span>0{certificates.length} ARTIFACTS</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SPATIAL MUSEUM PROMENADE TRACK (STAGGERED, ARTISTIC FLOATING PLINTHS)
          ========================================================================= */}
      <div className="relative w-full flex-1 flex items-center overflow-x-auto lg:overflow-x-visible pb-8 lg:pb-0 scrollbar-none snap-x snap-mandatory lg:snap-none [-webkit-overflow-scrolling:touch] min-h-[48vh] lg:min-h-0">
        <div
          ref={trackRef}
          className="flex items-center gap-8 sm:gap-12 lg:gap-16 px-6 md:px-14 lg:px-24 w-max will-change-transform py-2 lg:py-0"
        >
          {certificates.map((cert, index) => {
            const isPortrait = cert.dimensions?.orientation === "portrait";
            const spatialConfig = EXHIBIT_SPATIAL_MATRIX[index % EXHIBIT_SPATIAL_MATRIX.length];

            return (
              <MuseumArtifactPlinth
                key={cert.id}
                cert={cert}
                index={index}
                isPortrait={isPortrait}
                spatialConfig={spatialConfig}
                isActive={activeExhibitIndex === index}
                isDark={isDark}
                isDesktop={isDesktop}
                onSelect={() => openModal(cert, index)}
                locale={locale}
              />
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          FLOOR REFLECTION & CURATORIAL PROMENADE HUD DOCK
          ========================================================================= */}
      <div
        className={`absolute inset-x-0 bottom-0 h-28 pointer-events-none z-20 transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-t from-black via-black/85 to-transparent"
            : "bg-gradient-to-t from-slate-200/90 via-slate-100/60 to-transparent"
        }`}
      />

      <div
        className={`max-w-7xl mx-auto px-6 pb-4 sm:pb-6 lg:pb-4 pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono z-30 relative shrink-0 w-full ${
          isDark ? "text-zinc-400" : "text-slate-600"
        }`}
      >
        {/* Timeline Pill Quick Jump */}
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] uppercase tracking-wider mr-2 hidden md:inline ${
              isDark ? "text-zinc-500" : "text-slate-500"
            }`}
          >
            JUMP TO:
          </span>
          <div
            className={`flex items-center gap-1.5 p-1 rounded-full border backdrop-blur-xl shadow-lg ${
              isDark ? "bg-zinc-950/90 border-white/10" : "bg-white/95 border-slate-200"
            }`}
          >
            {certificates.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToExhibit(i)}
                aria-label={`Jump to exhibit ${i + 1}`}
                className={`w-7 h-7 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                  activeExhibitIndex === i
                    ? isDark
                      ? "bg-sky-400 text-black shadow-[0_0_12px_rgba(56,189,248,0.6)] scale-105"
                      : "bg-sky-600 text-white shadow-[0_0_12px_rgba(2,132,199,0.5)] scale-105"
                    : isDark
                    ? "text-zinc-400 hover:text-white hover:bg-white/10"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Promenade Navigation Arrows & Instructions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToExhibit(Math.max(0, activeExhibitIndex - 1))}
            disabled={activeExhibitIndex === 0}
            className={`w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer ${
              isDark
                ? "border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-sky-400"
                : "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-sky-500 shadow-sm"
            }`}
            aria-label="Previous exhibit"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className={`text-[11px] ${isDark ? "text-zinc-400" : "text-slate-600 font-medium"}`}>
            {locale === "vi"
              ? "BẤM VÀO HIỆN VẬT ĐỂ MỞ TOÀN MÀN HÌNH ✦"
              : "CLICK ANY PLINTH FOR 4K FULLSCREEN ✦"}
          </span>

          <button
            onClick={() => scrollToExhibit(Math.min(certificates.length - 1, activeExhibitIndex + 1))}
            disabled={activeExhibitIndex === certificates.length - 1}
            className={`w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer ${
              isDark
                ? "border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-sky-400"
                : "border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-sky-500 shadow-sm"
            }`}
            aria-label="Next exhibit"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN HIGH-DEFINITION MUSEUM LIGHTBOX MODAL
          ========================================================================= */}
      {activeModalCert && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200 ${
            isDark ? "bg-black/95 backdrop-blur-3xl" : "bg-slate-900/60 backdrop-blur-2xl"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-6xl max-h-[96vh] rounded-[32px] overflow-hidden flex flex-col border transition-colors ${
              isDark
                ? "bg-[#07090e] border-white/15 text-white shadow-[0_50px_120px_rgba(0,0,0,0.95)]"
                : "bg-white border-slate-200 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.25)]"
            }`}
          >
            {/* Modal Header Bar */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b z-20 ${
                isDark ? "bg-[#07090e]/95 border-white/10" : "bg-white/95 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-black uppercase ${
                    isDark
                      ? "bg-sky-400 text-black shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                      : "bg-sky-600 text-white shadow-[0_0_12px_rgba(2,132,199,0.4)]"
                  }`}
                >
                  {activeModalCert.code}
                </span>
                <span
                  className={`text-xs font-mono hidden sm:inline ${
                    isDark ? "text-zinc-400" : "text-slate-500"
                  }`}
                >
                  {activeModalCert.issueDate}
                </span>
                <span
                  className={`text-xs font-mono font-bold hidden md:inline ${
                    isDark ? "text-sky-400" : "text-sky-600"
                  }`}
                >
                  · {locale === "vi" ? activeModalCert.categoryLabel.vi : activeModalCert.categoryLabel.en}
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Curator Notes Toggle */}
                <button
                  onClick={() => setShowCuratorDetails((prev) => !prev)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    showCuratorDetails
                      ? isDark
                        ? "bg-sky-400 text-black border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                        : "bg-sky-600 text-white border-sky-600 shadow-[0_0_15px_rgba(2,132,199,0.3)]"
                      : isDark
                      ? "bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{locale === "vi" ? "Hồ Sơ Lưu Trữ" : "Curator Notes"}</span>
                </button>

                {/* Direct 4K Link */}
                <a
                  href={`${activeModalCert.image}?${CACHE_KEY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono border flex items-center gap-1.5 transition-colors ${
                    isDark
                      ? "text-zinc-300 hover:text-white bg-zinc-900 border-white/10 hover:border-sky-400"
                      : "text-slate-700 hover:text-slate-900 bg-slate-100 border-slate-200 hover:border-sky-500"
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{locale === "vi" ? "Ảnh 4K" : "Raw 4K"}</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isDark
                      ? "border-white/15 hover:border-sky-400 text-zinc-400 hover:text-white"
                      : "border-slate-200 hover:border-sky-500 text-slate-500 hover:text-slate-900"
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Stage: Maximum High-Res Uncropped Canvas */}
            <div
              className={`relative flex-1 overflow-auto p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[50vh] ${
                isDark ? "bg-black" : "bg-slate-100/90"
              }`}
            >
              {/* Previous / Next Arrow Floaters */}
              <button
                onClick={prevCert}
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-all z-20 cursor-pointer shadow-xl ${
                  isDark
                    ? "bg-black/70 hover:bg-black border-white/15 hover:border-sky-400 text-white"
                    : "bg-white/80 hover:bg-white border-slate-200 hover:border-sky-500 text-slate-800 shadow-md"
                }`}
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextCert}
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md transition-all z-20 cursor-pointer shadow-xl ${
                  isDark
                    ? "bg-black/70 hover:bg-black border-white/15 hover:border-sky-400 text-white"
                    : "bg-white/80 hover:bg-white border-slate-200 hover:border-sky-500 text-slate-800 shadow-md"
                }`}
                aria-label="Next certificate"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* The Certificate Artwork Displayed Grandly */}
              <img
                src={`${activeModalCert.image}?${CACHE_KEY}`}
                alt={activeModalCert.title}
                className="w-auto h-auto max-h-[76vh] max-w-full object-contain block drop-shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
              />

              {/* Slide-Over Curator Notes Overlay */}
              {showCuratorDetails && (
                <div
                  className={`absolute inset-y-0 right-0 w-full sm:w-[440px] backdrop-blur-2xl border-l p-6 sm:p-8 overflow-y-auto space-y-6 z-30 shadow-2xl animate-in slide-in-from-right duration-300 ${
                    isDark
                      ? "bg-[#090c13]/98 border-white/10 text-white"
                      : "bg-white/98 border-slate-200 text-slate-900 shadow-xl"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between border-b pb-4 ${
                      isDark ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                        isDark ? "text-sky-400" : "text-sky-600"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      CURATORIAL ARCHIVE RECORD
                    </span>
                    <button
                      onClick={() => setShowCuratorDetails(false)}
                      className={isDark ? "text-zinc-400 hover:text-white" : "text-slate-400 hover:text-slate-800"}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h4
                    className={`text-lg font-black leading-snug ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {activeModalCert.title}
                  </h4>

                  <div className="space-y-4 text-xs font-mono">
                    <div>
                      <span
                        className={`uppercase block text-[10px] ${
                          isDark ? "text-zinc-500" : "text-slate-400"
                        }`}
                      >
                        RECIPIENT / CHỦ SỞ HỮU:
                      </span>
                      <span
                        className={`font-bold text-sm ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {activeModalCert.recipientName}
                      </span>
                    </div>

                    {activeModalCert.teamName && (
                      <div>
                        <span
                          className={`uppercase block text-[10px] ${
                            isDark ? "text-zinc-500" : "text-slate-400"
                          }`}
                        >
                          TEAM / UNIT:
                        </span>
                        <span className={isDark ? "text-zinc-200" : "text-slate-700"}>
                          {activeModalCert.teamName}
                        </span>
                      </div>
                    )}

                    {activeModalCert.certificateNumber && (
                      <div>
                        <span
                          className={`uppercase block text-[10px] ${
                            isDark ? "text-zinc-500" : "text-slate-400"
                          }`}
                        >
                          CERTIFICATE ID / SỐ HIỆU:
                        </span>
                        <span className={`font-bold ${isDark ? "text-sky-400" : "text-sky-600"}`}>
                          {activeModalCert.certificateNumber}
                        </span>
                      </div>
                    )}

                    <div>
                      <span
                        className={`uppercase block text-[10px] ${
                          isDark ? "text-zinc-500" : "text-slate-400"
                        }`}
                      >
                        ISSUING INSTITUTIONS / ĐƠN VỊ CẤP:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5 font-sans">
                        {activeModalCert.issuingOrganization.map((org, i) => (
                          <span
                            key={i}
                            className={`px-2.5 py-1 rounded-md text-xs border ${
                              isDark
                                ? "bg-zinc-900 border-white/10 text-zinc-300"
                                : "bg-slate-100 border-slate-200 text-slate-700"
                            }`}
                          >
                            {org}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span
                        className={`uppercase block text-[10px] ${
                          isDark ? "text-zinc-500" : "text-slate-400"
                        }`}
                      >
                        DATE CONFERRED / NGÀY CẤP:
                      </span>
                      <span className={isDark ? "text-zinc-300" : "text-slate-700"}>
                        {activeModalCert.issueDate}
                      </span>
                    </div>

                    <div
                      className={`pt-3 border-t font-sans leading-relaxed text-xs ${
                        isDark
                          ? "border-white/10 text-zinc-300"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {locale === "vi"
                        ? activeModalCert.description.vi
                        : activeModalCert.description.en}
                    </div>

                    {activeModalCert.signatories.length > 0 && (
                      <div
                        className={`pt-4 border-t space-y-2.5 ${
                          isDark ? "border-white/10" : "border-slate-200"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-mono uppercase block ${
                            isDark ? "text-zinc-500" : "text-slate-400"
                          }`}
                        >
                          ACCREDITED SIGNATORIES:
                        </span>
                        {activeModalCert.signatories.map((sig, i) => (
                          <div key={i} className="text-xs">
                            <div
                              className={`font-bold ${
                                isDark ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {sig.name}
                            </div>
                            <div
                              className={`text-[10px] ${
                                isDark ? "text-zinc-400" : "text-slate-500"
                              }`}
                            >
                              {sig.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// =========================================================================
// MUSEUM ARTIFACT PLINTH (NO TEXT CLUTTER, GRAND SCALE, 3D TILT & SPOTLIGHT)
// =========================================================================
interface PlinthProps {
  cert: CertificateItem;
  index: number;
  isPortrait: boolean;
  spatialConfig: ExhibitSpatialConfig;
  isActive: boolean;
  isDark: boolean;
  isDesktop: boolean;
  onSelect: () => void;
  locale: "en" | "vi";
}

function MuseumArtifactPlinth({
  cert,
  index,
  isPortrait,
  spatialConfig,
  isActive,
  isDark,
  isDesktop,
  onSelect,
  locale,
}: PlinthProps) {
  const plinthRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D mouse parallax following cursor inside card (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!plinthRef.current || !isDesktop) return;
    const rect = plinthRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: nx * 14, y: -ny * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={plinthRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={`museum-spatial-plinth relative flex flex-col items-center justify-center cursor-pointer will-change-transform group shrink-0 snap-center ${
        isPortrait
          ? "w-[76vw] max-w-[260px] sm:max-w-none sm:w-[290px] md:w-[320px] lg:w-[340px]"
          : "w-[86vw] max-w-[320px] sm:max-w-none sm:w-[420px] md:w-[460px] lg:w-[490px]"
      }`}
      style={{
        // Full architectural elevation & floating tilt on desktop; subtle alignment on mobile
        transform: isDesktop
          ? `translateY(${spatialConfig.yOffset}px) rotate(${spatialConfig.zRotation}deg)`
          : `translateY(${spatialConfig.yOffset * 0.25}px) rotate(0deg)`,
        transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {/* 1. Dramatic Focused Overhead Ceiling Spotlight Beam */}
      <div
        className="absolute -top-36 inset-x-0 h-56 pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 55% at 50% 0%, rgba(56, 189, 248, ${
                isHovered ? 0.45 : isActive ? 0.32 : 0.16
              }), transparent 75%)`
            : `radial-gradient(ellipse 60% 55% at 50% 0%, rgba(2, 132, 199, ${
                isHovered ? 0.35 : isActive ? 0.22 : 0.12
              }), transparent 75%)`,
          transform: `rotate(${isDesktop ? spatialConfig.spotlightAngle : 0}deg)`,
          transformOrigin: "top center",
        }}
      />

      {/* Ceiling Laser Anchor Pin */}
      <div
        className={`w-1.5 h-1.5 rounded-full mb-2 transition-colors ${
          isDark
            ? "bg-sky-400 shadow-[0_0_12px_#38bdf8] opacity-80"
            : "bg-sky-500 shadow-[0_0_12px_#0284c7] opacity-90"
        }`}
      />

      {/* 2. Glass Vitrine Monolith Showcase with 3D Tilt */}
      <div
        className={`relative w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] p-2 sm:p-2.5 lg:p-3 backdrop-blur-2xl transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-b from-white/10 via-zinc-900/60 to-black/95 border border-white/15 shadow-[0_35px_100px_rgba(0,0,0,0.9)] group-hover:border-sky-400 group-hover:shadow-[0_45px_110px_rgba(56,189,248,0.35)]"
            : "bg-gradient-to-b from-white via-slate-50/95 to-slate-100/95 border border-slate-300/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)] group-hover:border-sky-500 group-hover:shadow-[0_35px_80px_rgba(2,132,199,0.25)]"
        }`}
        style={{
          perspective: 1600,
          transform: isDesktop
            ? `perspective(1600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${
                isHovered ? 1.025 : 1
              })`
            : "none",
          transition: "transform 0.22s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
        }}
      >
        {/* Certificate Display Vitrine: Tailored height per orientation to eliminate excess vertical void */}
        <div
          className={`relative w-full rounded-[14px] sm:rounded-[16px] lg:rounded-[18px] overflow-hidden flex items-center justify-center p-2 sm:p-2.5 lg:p-3 transition-all duration-300 ${
            isPortrait
              ? "h-[290px] sm:h-[350px] md:h-[390px] lg:h-[420px] lg:max-h-[50vh]"
              : "h-[175px] sm:h-[210px] md:h-[235px] lg:h-[260px] lg:max-h-[34vh]"
          } ${
            isDark
              ? "bg-black"
              : "bg-slate-100/90 border border-slate-200/80 shadow-inner"
          }`}
        >
          {/* Authentic Document Scan */}
          <img
            src={`${cert.image}?${CACHE_KEY}`}
            alt={cert.title}
            className="w-full h-full object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            loading="lazy"
            decoding="async"
          />

          {/* Dynamic Specular Glass Glint Line Following Cursor (Desktop only) */}
          {isDesktop && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              style={{
                background: isDark
                  ? `linear-gradient(${110 + tilt.x * 2.5}deg, transparent 38%, rgba(255,255,255,0.2) 50%, transparent 62%)`
                  : `linear-gradient(${110 + tilt.x * 2.5}deg, transparent 38%, rgba(255,255,255,0.6) 50%, transparent 62%)`,
              }}
            />
          )}

          {/* Minimalist Top Corner Archival Stamp */}
          <div
            className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono font-bold pointer-events-none shadow-lg flex items-center gap-1.5 transition-colors ${
              isDark
                ? "bg-black/85 backdrop-blur-md border border-white/15 text-sky-400"
                : "bg-white/95 backdrop-blur-md border border-slate-200 text-sky-600 shadow-sm"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-sky-400" : "bg-sky-500"
              }`}
            />
            <span>№ 0{index + 1}</span>
            <span className={isDark ? "text-zinc-500" : "text-slate-300"}>·</span>
            <span className={isDark ? "text-zinc-300" : "text-slate-600"}>{cert.code}</span>
          </div>

          {/* Minimalist Top Right Orientation Badge */}
          <div
            className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[8px] sm:text-[9px] font-mono pointer-events-none transition-colors ${
              isDark
                ? "bg-black/75 backdrop-blur-md border border-white/10 text-zinc-400"
                : "bg-white/90 backdrop-blur-md border border-slate-200 text-slate-500 shadow-sm"
            }`}
          >
            {isPortrait ? "PORTRAIT SCAN" : "LANDSCAPE ARCHIVE"}
          </div>

          {/* Luxury Hover Inspection Pill (Appears over artwork on hover - Desktop only) */}
          <div
            className={`absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:flex items-center justify-center p-6 ${
              isDark ? "bg-black/40" : "bg-slate-900/25"
            }`}
          >
            <span
              className={`px-7 py-3.5 rounded-full text-xs font-mono font-black tracking-wider flex items-center gap-2.5 scale-95 group-hover:scale-100 transition-transform duration-300 ${
                isDark
                  ? "bg-sky-400 text-black shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                  : "bg-sky-600 text-white shadow-[0_10px_30px_rgba(2,132,199,0.4)]"
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              <span>{locale === "vi" ? "CHIÊM NGƯỠNG TOÀN MÀN HÌNH ✦" : "INSPECT ARTIFACT ✦"}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Pedestal Underglow Neon LED Strip */}
      <div
        className={`w-[86%] h-2.5 mx-auto mt-2 rounded-full blur-[2px] transition-all duration-500 ${
          isDark
            ? "bg-gradient-to-r from-transparent via-sky-400/40 to-transparent shadow-[0_12px_24px_rgba(56,189,248,0.35)] group-hover:via-sky-400/85"
            : "bg-gradient-to-r from-transparent via-sky-500/35 to-transparent shadow-[0_8px_20px_rgba(2,132,199,0.25)] group-hover:via-sky-500/75"
        }`}
      />

      {/* 4. Realistic Gloss Museum Floor Specular Reflection */}
      <div
        className={`w-[78%] h-10 mx-auto -mt-1 bg-gradient-to-b from-sky-400/20 via-sky-400/5 to-transparent blur-md pointer-events-none -z-10 transition-opacity duration-500 group-hover:opacity-100 ${
          isDark ? "opacity-60" : "opacity-40"
        }`}
      />
    </div>
  );
}
