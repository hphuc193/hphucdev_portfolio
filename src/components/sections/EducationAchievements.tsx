"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Maximize2,
} from "lucide-react";

interface AchievementItem {
  id: string;
  badge: { en: string; vi: string };
  badgeType: "award" | "certificate" | "fellowship" | "degree" | "scholarship";
  title: { en: string; vi: string };
  organization: { en: string; vi: string };
  period: string;
  summary: { en: string; vi: string };
  description: { en: string; vi: string };
  iconType: "code" | "globe" | "trophy" | "languages" | "award";
  credentialCode?: string;
  scoreOrHonor?: string;
  image?: string;
  signatories?: { name: string; title: string }[];
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
      vi: "Tốt nghiệp nền tảng chuyên sâu về Kỹ thuật Phần mềm và kiến trúc hệ thống.",
    },
    description: {
      en: "Rigorous academic curriculum covering software architecture, mobile systems development, distributed databases, cloud microservices, and AI integrations. Maintained excellent cumulative performance.",
      vi: "Chương trình đào tạo chuyên sâu về kiến trúc phần mềm, phát triển ứng dụng di động, cơ sở dữ liệu phân tán, vi dịch vụ đám mây và ứng dụng trí tuệ nhân tạo.",
    },
    iconType: "code",
    credentialCode: "UMT-IT-SE-2025",
    scoreOrHonor: "GPA: 3.23 / 4.0",
    image: "/images/certificates/cert-2-icpc-volunteer.png",
    signatories: [
      { name: "PGS. TS. Trần Đan Thư", title: "Trưởng Khoa Công nghệ UMT" },
      { name: "Huỳnh Thúy Phương", title: "Phó Hiệu trưởng UMT" },
    ],
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
    description: {
      en: "Selected for prestigious international academic-industrial exchange in Jakarta, Indonesia. Collaborated with international teams on real-time climate risk telemetry and smart city solutions.",
      vi: "Được tuyển chọn tham gia chương trình học bổng trao đổi quốc tế tại Jakarta, Indonesia. Hợp tác cùng các nhóm kỹ sư quốc tế giải quyết bài toán dữ liệu thiên tai và thành phố thông minh.",
    },
    iconType: "globe",
    credentialCode: "HP-CERT-03",
    scoreOrHonor: "Global Citizen Fellowship",
    image: "/images/certificates/cert-3-global-citizen-fellowship.png",
    signatories: [
      { name: "Andy Hadiyanto", title: "Vice Rector for Cooperation, Universitas Negeri Jakarta" },
      { name: "Huỳnh Thúy Phương", title: "Vice President, UMT Ho Chi Minh City" },
      { name: "Ignatius Hendrasmo", title: "President Director, Radio Republik Indonesia" },
    ],
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
    description: {
      en: "High-intensity innovation competition solving modern enterprise fintech and digital verification challenges on Amazon Web Services (AWS) infrastructure. Built an end-to-end intelligent customer intelligence platform.",
      vi: "Cuộc thi lập trình công nghệ cao giải quyết bài toán dữ liệu fintech và xác thực số trên nền tảng điện toán đám mây AWS. Đội thi VeraGuard xây dựng giải pháp phân tích tài chính thông minh.",
    },
    iconType: "trophy",
    credentialCode: "HP-CERT-01",
    scoreOrHonor: "Honor Recipient · Team VeraGuard",
    image: "/images/certificates/cert-1-vpbank-hackathon.png",
    signatories: [
      { name: "Wong Kok Seng Augustine", title: "Chief Information Officer, VPBank" },
      { name: "Tran Thi Diep Anh", title: "Chief Human Resources Officer, VPBank" },
      { name: "Eric Yeo", title: "Country Manager, AWS Vietnam" },
    ],
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
    description: {
      en: "Official VSTEP Level B1 (Score 5.5/10). Solid technical comprehension of software architecture documentation, engineering specifications, RFCs, and collaborative international teamwork.",
      vi: "Chứng chỉ ngoại ngữ quốc gia VSTEP điểm 5.5/10. Khả năng đọc hiểu tài liệu kỹ thuật, chuẩn RFC, phân tích kiến trúc phần mềm và làm việc hiệu quả trong môi trường công nghệ quốc tế.",
    },
    iconType: "languages",
    credentialCode: "VSTEP-B1-5.5",
    scoreOrHonor: "VSTEP Score: 5.5 / 10",
    image: "/images/certificates/cert-4-best-presentation-unj.png",
    signatories: [
      { name: "Hội đồng Khảo thí Ngoại ngữ Quốc gia", title: "Trung tâm Đánh giá Năng lực Ngoại ngữ" },
    ],
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
    description: {
      en: "Awarded the highly competitive 175,000,000 VNĐ UMT Maker Scholarship in recognition of creative technological potential, academic integrity, and dedicated software craftsmanship.",
      vi: "Được trao tặng Học bổng Maker danh giá trị giá 175.000.000 VNĐ nhờ tiềm năng sáng tạo công nghệ, thành tích học tập vượt trội và tinh thần phụng sự cộng đồng.",
    },
    iconType: "award",
    credentialCode: "HP-CERT-05",
    scoreOrHonor: "175M VNĐ Maker Scholarship",
    image: "/images/certificates/cert-5-icreal-member.png",
    signatories: [
      { name: "Lê Thị Ngọc Tú, PhD.", title: "Dean of Business & Technology School, UMT" },
      { name: "Hội đồng Học bổng UMT", title: "Ban Giám hiệu UMT" },
    ],
  },
];

export function EducationAchievements() {
  const { locale, playUiSound, theme } = usePortfolio();
  const isDark = theme === "dark";

  // Center card (VPBank Hackathon) is active by default
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [modalItem, setModalItem] = useState<AchievementItem | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      if (modalItem) {
        if (e.key === "Escape") setModalItem(null);
        return;
      }
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalItem, prevCard, nextCard]);

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
      {/* --- BACKGROUND 3D CRYSTAL TROPHY & ORBITAL ACCENTS --- */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[540px] md:w-[680px] lg:w-[820px] h-[480px] sm:h-[600px] pointer-events-none select-none overflow-visible -z-0 opacity-90 dark:opacity-75">
        <CrystalTrophyBackdrop />
      </div>

      {/* Ambient background soft light flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER WITH EDITORIAL TAG & ARROW CONTROLS --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
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
          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              onClick={prevCard}
              aria-label="Previous achievement card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm font-mono font-bold text-[var(--text-secondary)] shadow-xs min-w-[58px] text-center">
              {activeIndex + 1} / {ACHIEVEMENTS_DATA.length}
            </div>

            <button
              onClick={nextCard}
              aria-label="Next achievement card"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500 hover:text-sky-600 dark:hover:border-sky-400 dark:hover:text-sky-400 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL REFINED STATS PANEL (GPA · VSTEP · SCHOLARSHIP) --- */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 md:gap-8 p-3 sm:p-4 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-sm max-w-full">
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
          className="relative w-full h-[450px] sm:h-[480px] md:h-[510px] flex items-center justify-center select-none"
          style={{ perspective: 1300 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Luminous blue pedestal glow under center card */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] md:w-[480px] h-12 pointer-events-none -z-0">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-sky-500/35 to-transparent blur-xl" />
            <div className="absolute bottom-2 inset-x-12 h-1 rounded-full bg-sky-400/70 blur-xs" />
          </div>

          {/* Drag container for mouse & touch swipe */}
          <motion.div
            className="w-full h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipe = Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 450;
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
              const isFar = Math.abs(diff) === 2;

              // Spatial 3D calculations
              const xDesktop = diff === 0 ? 0 : diff === -1 ? "-68%" : diff === 1 ? "68%" : diff === -2 ? "-132%" : "132%";
              const xMobile = diff === 0 ? 0 : diff === -1 ? "-82%" : diff === 1 ? "82%" : diff === -2 ? "-160%" : "160%";
              const rotateY = diff === 0 ? 0 : diff === -1 ? 16 : diff === 1 ? -16 : diff === -2 ? 26 : -26;
              const scale = diff === 0 ? 1.05 : isImmediateNeighbor ? 0.91 : 0.78;
              const opacity = diff === 0 ? 1 : isImmediateNeighbor ? 0.8 : 0.42;
              const zIndex = diff === 0 ? 30 : isImmediateNeighbor ? 20 : 10;

              return (
                <motion.div
                  key={item.id}
                  className="absolute top-1/2 -translate-y-1/2 w-[82vw] sm:w-[360px] md:w-[390px] lg:w-[410px] will-change-transform"
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
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
                    if (isActive) {
                      playUiSound("click");
                      setModalItem(item);
                    } else {
                      playUiSound("switch");
                      setActiveIndex(index);
                    }
                  }}
                >
                  {/* The Achievement Glass Card */}
                  <div
                    className={`relative rounded-[26px] sm:rounded-[28px] p-6 sm:p-7 md:p-8 backdrop-blur-2xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white/95 dark:bg-slate-900/95 border-sky-400/80 dark:border-sky-500/80 shadow-[0_20px_50px_rgba(2,132,199,0.22)] dark:shadow-[0_20px_60px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/30"
                        : "bg-white/80 dark:bg-slate-900/80 border-slate-200/90 dark:border-slate-800/90 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-slate-300"
                    }`}
                  >
                    {/* Top Row: Icon + Badge Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25"
                            : "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900"
                        }`}
                      >
                        {renderIcon(item.iconType, isActive)}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-tight transition-colors ${
                          item.badgeType === "award"
                            ? "bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300/60"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                        }`}
                      >
                        {locale === "vi" ? item.badge.vi : item.badge.en}
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
                    <div className="text-xs sm:text-[13px] font-medium text-[var(--text-secondary)] mb-4 line-clamp-1">
                      {locale === "vi" ? item.organization.vi : item.organization.en}
                    </div>

                    {/* Period Pill with Calendar Icon */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-4 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>{item.period}</span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">
                      {locale === "vi" ? item.summary.vi : item.summary.en}
                    </p>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
                        {item.credentialCode || "VERIFIED"}
                      </span>

                      {/* Interactive View Button for active card */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playUiSound("click");
                          setModalItem(item);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-sky-50 dark:bg-sky-950/70 border border-sky-300/80 text-sky-600 dark:text-sky-400 hover:scale-110 hover:bg-sky-500 hover:text-white"
                            : "text-slate-400 opacity-60"
                        }`}
                        title={locale === "vi" ? "Xem chi tiết chứng chỉ" : "View certificate details"}
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

      {/* --- CERTIFICATE / ACHIEVEMENT DETAIL MODAL --- */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalItem(null)}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 font-mono text-[10px] font-bold uppercase mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    <span>VERIFIED ACADEMIC RECORD</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    {locale === "vi" ? modalItem.title.vi : modalItem.title.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {locale === "vi" ? modalItem.organization.vi : modalItem.organization.en}
                  </p>
                </div>

                <button
                  onClick={() => setModalItem(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Official Certificate Image Preview */}
                {modalItem.image && (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/5 dark:bg-black/50 aspect-16/10 flex items-center justify-center">
                    <img
                      src={modalItem.image}
                      alt={modalItem.title.en}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Key Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DATE CONFERRED</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {modalItem.period}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">CLASSIFICATION</div>
                    <div className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                      {modalItem.scoreOrHonor || "Good Standing"}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">RECORD ID</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                      {modalItem.credentialCode || "VERIFIED"}
                    </div>
                  </div>
                </div>

                {/* Comprehensive Description */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                    {locale === "vi" ? "Chi Tiết Chứng Nhận" : "Credentials & Scope"}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {locale === "vi" ? modalItem.description.vi : modalItem.description.en}
                  </p>
                </div>

                {/* Signatories */}
                {modalItem.signatories && modalItem.signatories.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
                      {locale === "vi" ? "Cơ Quan & Lãnh Đạo Ký Xác Nhận" : "Accredited Signatories"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {modalItem.signatories.map((sig, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                        >
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {sig.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {sig.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500" />
                  <span>Officially Verified Archive</span>
                </span>

                <button
                  onClick={() => {
                    setModalItem(null);
                    document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>{locale === "vi" ? "Xem Trong Bảo Tàng Số" : "Explore In Museum"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// =========================================================================
// 3D CRYSTAL TROPHY & ORBITAL VECTOR BACKDROP COMPONENT
// =========================================================================
function CrystalTrophyBackdrop() {
  return (
    <svg
      viewBox="0 0 680 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_20px_50px_rgba(2,132,199,0.18)]"
    >
      <defs>
        {/* Crystal Facet Gradients */}
        <linearGradient id="facetTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id="facetTopRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0.65" />
        </linearGradient>

        <linearGradient id="facetCenterGlint" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="facetBaseFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="sphereGrad" x1="30%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#E0F2FE" stopOpacity="1" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
        </linearGradient>

        {/* Radiant Star Glow Filter */}
        <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="sphereShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0284C7" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* --- ORBITAL VECTOR ELLIPSES --- */}
      {/* Outer subtle orbital line */}
      <ellipse
        cx="410"
        cy="260"
        rx="230"
        ry="85"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeDasharray="8 6"
        transform="rotate(-16 410 260)"
      />

      {/* Inner glowing orbital arc */}
      <ellipse
        cx="410"
        cy="260"
        rx="210"
        ry="72"
        stroke="#38BDF8"
        strokeWidth="1"
        strokeOpacity="0.5"
        transform="rotate(-16 410 260)"
      />

      {/* --- 3D FACETED CRYSTAL TROPHY / OBELISK --- */}
      <g transform="translate(60, 10)">
        {/* Crystal Base Pedestal Shards */}
        <polygon points="340,380 430,340 450,420 360,450" fill="url(#facetBaseFront)" />
        <polygon points="260,390 340,380 360,450 280,440" fill="#0284C7" fillOpacity="0.45" />

        {/* Main Crystal Prism Facets */}
        {/* Upper Left Apex Facet */}
        <polygon points="350,60 270,180 345,210" fill="url(#facetTopLeft)" />

        {/* Upper Right Apex Facet */}
        <polygon points="350,60 345,210 440,160" fill="url(#facetTopRight)" />

        {/* Mid Left Body Facet */}
        <polygon points="270,180 250,330 330,370 345,210" fill="url(#facetCenterGlint)" />

        {/* Mid Right Body Facet */}
        <polygon points="345,210 330,370 420,330 440,160" fill="url(#facetTopLeft)" />

        {/* Lower Left Facet */}
        <polygon points="250,330 270,410 340,430 330,370" fill="#0284C7" fillOpacity="0.75" />

        {/* Lower Right Facet */}
        <polygon points="330,370 340,430 425,380 420,330" fill="#0369A1" fillOpacity="0.7" />

        {/* Crystal Facet Specular Highlight Lines */}
        <polyline
          points="350,60 345,210 330,370 340,430"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        <line x1="350" y1="60" x2="270" y2="180" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="350" y1="60" x2="440" y2="160" stroke="#BAE6FD" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="270" y1="180" x2="345" y2="210" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="440" y1="160" x2="345" y2="210" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.7" />

        {/* --- RADIANT INNER 4-POINT STAR GLINT --- */}
        <g transform="translate(345, 185) scale(0.9)" filter="url(#starGlow)">
          <path
            d="M 0 -45 Q 0 0 -45 0 Q 0 0 0 45 Q 0 0 45 0 Q 0 0 0 -45 Z"
            fill="#FFFFFF"
          />
          {/* Central tiny star core */}
          <circle cx="0" cy="0" r="5" fill="#E0F2FE" />
        </g>
      </g>

      {/* --- FLOATING 3D GLOSSY BLUE SPHERES --- */}
      {/* Left glossy sphere */}
      <g filter="url(#sphereShadow)">
        <circle cx="150" cy="280" r="16" fill="url(#sphereGrad)" />
        {/* Specular highlight */}
        <ellipse cx="145" cy="275" rx="5" ry="3" fill="#FFFFFF" fillOpacity="0.85" />
      </g>

      {/* Right glossy sphere */}
      <g filter="url(#sphereShadow)">
        <circle cx="560" cy="200" r="20" fill="url(#sphereGrad)" />
        <ellipse cx="554" cy="194" rx="6" ry="4" fill="#FFFFFF" fillOpacity="0.85" />
      </g>

      {/* Small ambient glossy pearl */}
      <circle cx="360" cy="90" r="7" fill="url(#sphereGrad)" />
      <circle cx="358" cy="88" r="2" fill="#FFFFFF" fillOpacity="0.9" />
    </svg>
  );
}
