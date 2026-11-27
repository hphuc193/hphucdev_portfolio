"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Trophy,
  Award,
  Globe,
  Code2,
  Languages,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
  CheckCircle2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AchievementItem {
  id: string;
  badge: { en: string; vi: string };
  badgeType: "award" | "certificate" | "fellowship" | "degree" | "scholarship";
  title: { en: string; vi: string };
  organization: { en: string; vi: string };
  period: string;
  summary: { en: string; vi: string };
  iconType: "code" | "globe" | "trophy" | "languages" | "award";
  credentialCode?: string;
  scoreOrHonor?: string;
}

const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "umt-degree",
    badge: { en: "Certificate", vi: "Văn Bằng" },
    badgeType: "degree",
    title: {
      en: "Bachelor of Information Technology – Software Engineering",
      vi: "Cử nhân Công nghệ Thông tin – Kỹ thuật Phần mềm",
    },
    organization: {
      en: "UMT – University of Management and Technology",
      vi: "Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)",
    },
    period: "Mar. 2021 – Mar. 2025",
    summary: {
      en: "Graduated with a strong foundation in Software Engineering.",
      vi: "Tốt nghiệp với nền tảng vững chắc về Kỹ thuật Phần mềm và kiến trúc hệ thống.",
    },
    iconType: "code",
    credentialCode: "UMT-IT-SE-2025",
    scoreOrHonor: "GPA: 3.23 / 4.0",
  },
  {
    id: "unj-fellowship",
    badge: { en: "Certificate", vi: "Học Bổng" },
    badgeType: "fellowship",
    title: {
      en: "Industrial Immersion Camp – Global Climate Resilience",
      vi: "Industrial Immersion Camp – Global Climate Resilience",
    },
    organization: {
      en: "UMT – University of Management and Technology & UNJ",
      vi: "Đại học UNJ Jakarta · UMT · Indosat · RRI",
    },
    period: "Dec. 2024 – Jan. 2025",
    summary: {
      en: "Gained practical experience in climate and sustainability projects.",
      vi: "Tích lũy kinh nghiệm thực tế về các dự án công nghệ khí hậu và phát triển bền vững.",
    },
    iconType: "globe",
    credentialCode: "HP-CERT-03",
    scoreOrHonor: "Global Citizen Fellowship",
  },
  {
    id: "vpbank-hackathon",
    badge: { en: "Award", vi: "Giải Thưởng" },
    badgeType: "award",
    title: {
      en: "VPBank Technology Hackathon 2025",
      vi: "VPBank Technology Hackathon 2025",
    },
    organization: {
      en: "VietNam – Ho Chi Minh City",
      vi: "VPBank & AWS Vietnam · TP. Hồ Chí Minh",
    },
    period: "29 Nov. 2024 – 01 Dec. 2024",
    summary: {
      en: "Achieved excellence in a high-tech hackathon, showcasing innovation and teamwork.",
      vi: "Đạt thành tích xuất sắc tại cuộc thi hackathon công nghệ cao, thể hiện năng lực sáng tạo và phối hợp nhóm.",
    },
    iconType: "trophy",
    credentialCode: "HP-CERT-01",
    scoreOrHonor: "Honor Recipient · Team VeraGuard",
  },
  {
    id: "english-proficiency",
    badge: { en: "Certificate", vi: "Chứng Chỉ" },
    badgeType: "certificate",
    title: {
      en: "English Level B1 – VSTEP Certificate 5.5",
      vi: "Tiếng Anh Chuẩn B1 – Chứng Chỉ VSTEP 5.5",
    },
    organization: {
      en: "Vietnamese Ministry of Education and Training",
      vi: "Bộ Giáo dục và Đào tạo Việt Nam",
    },
    period: "25 Dec. 2024",
    summary: {
      en: "Certified English proficiency at B1 level.",
      vi: "Chứng nhận trình độ tiếng Anh đạt chuẩn CEFR B1 (Bậc 3/6).",
    },
    iconType: "languages",
    credentialCode: "VSTEP-B1-5.5",
    scoreOrHonor: "VSTEP Score: 5.5 / 10",
  },
  {
    id: "maker-scholarship",
    badge: { en: "Certificate", vi: "Chứng Chỉ" },
    badgeType: "scholarship",
    title: {
      en: "English for Academic Purposes & Maker Honors",
      vi: "Học Bổng Tài Năng Maker UMT & Khen Thưởng",
    },
    organization: {
      en: "UMT – University of Management and Technology",
      vi: "Trường Đại học Quản lý và Công nghệ TP.HCM (UMT)",
    },
    period: "2024",
    summary: {
      en: "Completed advanced English course and honored with prestigious 175M Maker Scholarship.",
      vi: "Hoàn thành chương trình tiếng Anh học thuật nâng cao và vinh dự nhận Học bổng Maker 175 triệu đồng.",
    },
    iconType: "award",
    credentialCode: "HP-CERT-05",
    scoreOrHonor: "175M VNĐ Maker Scholarship",
  },
];

export function EducationAchievements() {
  const { locale, playUiSound } = usePortfolio();

  // Center card (VPBank Hackathon) is active by default
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const sectionRef = useRef<HTMLElement>(null);

  // Recalculate ScrollTrigger on mount and layout settle so scrolling never freezes
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(refreshTimer);
  }, []);

  const prevCard = useCallback(() => {
    playUiSound("click");
    setActiveIndex((prev) => (prev - 1 + ACHIEVEMENTS_DATA.length) % ACHIEVEMENTS_DATA.length);
  }, [playUiSound]);

  const nextCard = useCallback(() => {
    playUiSound("click");
    setActiveIndex((prev) => (prev + 1) % ACHIEVEMENTS_DATA.length);
  }, [playUiSound]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevCard, nextCard]);

  const renderIcon = (type: AchievementItem["iconType"], isActive: boolean) => {
    const baseClass = "w-5 h-5 transition-transform duration-300";
    switch (type) {
      case "code":
        return <Code2 className={baseClass} />;
      case "globe":
        return <Globe className={baseClass} />;
      case "trophy":
        return <Trophy className={baseClass} />;
      case "languages":
        return <Languages className={baseClass} />;
      case "award":
      default:
        return <Award className={baseClass} />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden bg-[var(--bg-base)]"
    >
      {/* =========================================================================
          AUTHENTIC 3D CRYSTAL TROPHY (DUAL ADAPTIVE: LIGHT & DARK CROSS-FADE)
          ========================================================================= */}
      <div className="absolute top-0 right-0 w-[520px] sm:w-[680px] md:w-[820px] lg:w-[980px] pointer-events-none select-none -z-0">
        {/* Light Mode Backdrop */}
        <img
          src="/images/achievements/crystal-trophy-light.png"
          alt="Crystal Trophy Backdrop (Light)"
          className="w-full h-auto object-contain transition-opacity duration-700 ease-in-out opacity-100 dark:opacity-0 drop-shadow-[0_20px_60px_rgba(2,132,199,0.2)]"
        />

        {/* Dark Mode Backdrop */}
        <img
          src="/images/achievements/crystal-trophy-dark.png"
          alt="Crystal Trophy Backdrop (Dark)"
          className="absolute inset-0 w-full h-auto object-contain transition-opacity duration-700 ease-in-out opacity-0 dark:opacity-100 drop-shadow-[0_20px_70px_rgba(56,189,248,0.3)]"
        />
      </div>

      {/* Ambient background soft light flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER WITH EDITORIAL TAG & ARROW CONTROLS --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            {/* Top pill identifier: ● 04 — ACHIEVEMENTS */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-widest uppercase mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>04 — ACHIEVEMENTS</span>
            </div>

            {/* Editorial Heading: Honors & Badges. */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
              {locale === "vi" ? "Danh Hiệu & Thành Tích" : "Honors & Badges"}
              <span className="text-[#0284C7]">.</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl font-normal leading-relaxed">
              {locale === "vi"
                ? "Bản ghi hành trình học tập, thi đấu công nghệ và danh hiệu chính thức được đối chiếu xác thực."
                : "A record of my learning journey, competitions, and recognitions throughout my academic career."}
            </p>
          </div>

          {/* Top Right Navigation Controls: [ ← ]  1 / 5  [ → ] */}
          <div className="flex items-center gap-3 self-start lg:self-end z-20">
            <button
              onClick={prevCard}
              aria-label="Previous achievement card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 text-xs sm:text-sm font-mono font-bold text-[var(--text-secondary)] shadow-xs min-w-[62px] text-center">
              {activeIndex + 1} / {ACHIEVEMENTS_DATA.length}
            </div>

            <button
              onClick={nextCard}
              aria-label="Next achievement card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL REFINED STATS PANEL (GPA · VSTEP · SCHOLARSHIP) --- */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm max-w-full">
            {/* Stat 1: GPA */}
            <div className="flex items-center gap-3 pr-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/15">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)] leading-tight">
                  3.23 / 4.0
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                  {locale === "vi" ? "Học lực Tích lũy (UMT)" : "GPA (Overall)"}
                </div>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block shrink-0" />

            {/* Stat 2: English Proficiency */}
            <div className="flex items-center gap-3 pr-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/15">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)] leading-tight">
                  VSTEP - 5.5
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                  {locale === "vi" ? "Chuẩn CEFR B1 Quốc Tế" : "B1 / IELTS Equivalent"}
                </div>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden sm:block shrink-0" />

            {/* Stat 3: Maker Scholarship */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/15">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black font-mono text-[var(--text-primary)] leading-tight">
                  175M VNĐ
                </div>
                <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                  {locale === "vi" ? "Học bổng Maker UMT" : "Maker Scholarship"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 3D INTERACTIVE ACHIEVEMENT CAROUSEL --- */}
        <div
          className="relative w-full h-[450px] sm:h-[480px] md:h-[500px] flex items-center justify-center select-none"
          style={{ perspective: 1400 }}
        >
          {/* Luminous blue pedestal glow under center card */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] md:w-[480px] h-14 pointer-events-none -z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent blur-2xl" />
            <div className="absolute bottom-2 inset-x-12 h-1.5 rounded-full bg-sky-400/80 blur-xs" />
          </div>

          {/* Drag container with explicit touch-action: pan-y to allow vertical wheel/touch scrolling without locking */}
          <motion.div
            className="w-full h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
            drag="x"
            dragDirectionLock={true}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const swipe = Math.abs(info.offset.x) > 35 || Math.abs(info.velocity.x) > 400;
              if (swipe && info.offset.x > 0) prevCard();
              else if (swipe && info.offset.x < 0) nextCard();
            }}
          >
            {ACHIEVEMENTS_DATA.map((item, index) => {
              // Calculate spatial offset relative to active card [-2, -1, 0, 1, 2]
              const length = ACHIEVEMENTS_DATA.length;
              let diff = (index - activeIndex + length) % length;
              if (diff > 2) diff -= length;

              const isActive = diff === 0;
              const isImmediateNeighbor = Math.abs(diff) === 1;

              // Spatial 3D calculations
              const xDesktop = diff === 0 ? 0 : diff === -1 ? "-68%" : diff === 1 ? "68%" : diff === -2 ? "-132%" : "132%";
              const xMobile = diff === 0 ? 0 : diff === -1 ? "-82%" : diff === 1 ? "82%" : diff === -2 ? "-160%" : "160%";
              const rotateY = diff === 0 ? 0 : diff === -1 ? 18 : diff === 1 ? -18 : diff === -2 ? 28 : -28;
              const scale = diff === 0 ? 1.07 : isImmediateNeighbor ? 0.90 : 0.76;
              const opacity = diff === 0 ? 1 : isImmediateNeighbor ? 0.82 : 0.45;
              const zIndex = diff === 0 ? 30 : isImmediateNeighbor ? 20 : 10;

              return (
                <motion.div
                  key={item.id}
                  className="absolute top-1/2 -translate-y-1/2 w-[85vw] sm:w-[370px] md:w-[390px] lg:w-[410px] will-change-transform cursor-pointer"
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                    touchAction: "pan-y",
                  }}
                  animate={{
                    x: typeof window !== "undefined" && window.innerWidth < 640 ? xMobile : xDesktop,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    playUiSound("switch");
                    setActiveIndex(index);
                  }}
                >
                  {/* The Pure Glass Achievement Card */}
                  <div
                    className={`relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 md:p-8 backdrop-blur-2xl transition-all duration-300 border overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-b from-white/98 via-white/92 to-sky-50/70 dark:from-slate-900/98 dark:via-slate-900/90 dark:to-slate-950/98 border-sky-400/80 dark:border-sky-500/80 shadow-[0_25px_60px_rgba(2,132,199,0.22)] dark:shadow-[0_25px_70px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/40"
                        : "bg-white/80 dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800/90 shadow-[0_12px_32px_rgba(15,23,42,0.06)] hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {/* Top Specular Rim Lighting Glint */}
                    <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/80 to-transparent pointer-events-none" />

                    {/* Top Row: 3D Squircle Icon + Badge Pill */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 ring-2 ring-white/60 dark:ring-sky-400/40"
                            : "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900"
                        }`}
                      >
                        {renderIcon(item.iconType, isActive)}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-tight transition-colors flex items-center gap-1.5 ${
                          item.badgeType === "award"
                            ? "bg-sky-100/90 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300/80"
                            : "bg-slate-100/90 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                        }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />}
                        <span>{locale === "vi" ? item.badge.vi : item.badge.en}</span>
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3
                      className={`text-lg sm:text-xl font-black tracking-tight leading-snug mb-1.5 transition-colors line-clamp-2 ${
                        isActive
                          ? "text-[var(--text-primary)]"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {locale === "vi" ? item.title.vi : item.title.en}
                    </h3>

                    {/* Organization / Location */}
                    <div className="text-xs sm:text-[13px] font-semibold text-[var(--text-secondary)] mb-4 line-clamp-1">
                      {locale === "vi" ? item.organization.vi : item.organization.en}
                    </div>

                    {/* Period Pill with Calendar Icon */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-4 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>{item.period}</span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3 font-normal">
                      {locale === "vi" ? item.summary.vi : item.summary.en}
                    </p>

                    {/* Bottom Action Footer */}
                    <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-sky-600/80 dark:text-sky-400/80 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                        <span>{item.scoreOrHonor || "VERIFIED"}</span>
                      </span>

                      {/* Interactive Next Card Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextCard();
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isActive
                            ? "bg-sky-50 dark:bg-sky-950/70 border border-sky-300/90 text-sky-600 dark:text-sky-400 hover:scale-110 hover:bg-sky-500 hover:text-white shadow-xs"
                            : "text-slate-400 opacity-60 hover:opacity-100"
                        }`}
                        title={locale === "vi" ? "Chuyển sang thành tích tiếp theo" : "Next achievement"}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* --- CAROUSEL PAGINATION PILLS --- */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {ACHIEVEMENTS_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                playUiSound("click");
                setActiveIndex(idx);
              }}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-sky-500 shadow-sm shadow-sky-500/30"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
