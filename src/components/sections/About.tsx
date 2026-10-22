"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { CounterBadge } from "@/hooks/useCounter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Cpu,
  GraduationCap,
  Globe,
  Award,
  Terminal,
  Compass,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const { locale, playUiSound } = usePortfolio();
  const { personal } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Kinetic Header split fade-in
      gsap.fromTo(
        ".about-header-element",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Artistic Cards Staggered Parallax Entrance
      gsap.fromTo(
        ".about-artistic-card",
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background Subtle Grid & Ambient Glow */}
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-[var(--accent-glow)] blur-[170px] pointer-events-none -z-10 opacity-35" />

      {/* --- EDITORIAL ARTISTIC HEADER --- */}
      <div className="max-w-7xl mx-auto mb-16 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>01 · {locale === "vi" ? "Triết Lý & Bản Sắc Kiến Tạo" : "Origins & Engineering Philosophy"}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              10.82°N · 106.63°E
            </span>
            <span>·</span>
            <span>SAIGON, VIETNAM (GMT+7)</span>
          </div>
        </div>

        {/* Oversized Kinetic Typography Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
          <div className="lg:col-span-7 space-y-3 about-header-element">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold border border-[var(--accent-primary)]/20 inline-block">
              {locale === "vi" ? "TƯ DUY KỸ SƯ KIẾN TẠO" : "THE BUILDER MANIFESTO"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] leading-[1.05]">
              The Mindset <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-sky-200 to-[var(--text-primary)]">
                of a Builder.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4 about-header-element">
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              {locale === "vi"
                ? "Tôi không chỉ viết mã nguồn; tôi tỉ mỉ tạo nên những sản phẩm phần mềm kết hợp trải nghiệm di động chạm vuốt mượt mà, hệ thống backend chuẩn xác và công nghệ trí tuệ nhân tạo thực chiến."
                : "I build mobile applications and software products that bring together thoughtful user experiences, reliable backend systems, and applied machine learning."}
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-tertiary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span>CRAFTED WITH INTENT & ARCHITECTURAL DISCIPLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- ASYMMETRICAL 4-PILLAR ARTISTIC BENTO GRID --- */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* PILLAR 01: Core Architecture Philosophy (7 cols - Editorial Hero) */}
        <SpotlightCard className="about-artistic-card lg:col-span-7 p-8 sm:p-10 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-black font-mono font-black text-xs flex items-center justify-center">
                  01
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  PHILOSOPHY & CODE CRAFT
                </span>
              </div>
              <Cpu className="w-5 h-5 text-[var(--accent-primary)]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight leading-snug">
              {locale === "vi"
                ? "Kết nối Trải nghiệm Di động Tinh tế với Trí tuệ Nhân tạo."
                : "Bridging Tactile Mobile UX with Intelligent AI Systems."}
            </h3>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              {locale === "vi" ? personal.bioLong.vi : personal.bioLong.en}
            </p>
          </div>

          {/* Interactive Tech Architecture Stack Pills */}
          <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
            <div className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase">
              {locale === "vi" ? "TRỤ CỘT KỸ THUẬT NÒNG CỐT" : "CORE ENGINEERING PILLARS"}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Flutter (60/120 FPS)",
                "Kotlin Android SDK",
                "SwiftUI",
                "Media3",
                "Node.js & FastAPI",
                "PostgreSQL & PostGIS",
                "Applied ML",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-[var(--bg-base)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>

        {/* PILLAR 02: Academia & 175M Maker Scholarship (5 cols) */}
        <SpotlightCard className="about-artistic-card lg:col-span-5 p-8 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-black font-mono font-black text-xs flex items-center justify-center">
                  02
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  ACADEMIA & HONORS
                </span>
              </div>
              <GraduationCap className="w-5 h-5 text-[var(--text-tertiary)]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {locale === "vi"
                ? "Đại học UMT · Học bổng Maker 175 Triệu VNĐ"
                : "UMT Software Engineering · 175M Maker Scholarship"}
            </h3>

            {/* Official Badge Preview */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] shadow-md">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[var(--border-strong)] bg-black shadow-lg">
                <img
                  src="/images/badges/scholarship.jpg?v=20261012c"
                  alt="Maker Scholarship 175M"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase">
                  OFFICIAL ACADEMIC AWARD
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  Maker Scholarship 175M VNĐ
                </span>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  UMT · GPA 3.23 / 4.0 · 10/2022 – 07/2026
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {locale === "vi"
                ? "Chương trình Cử nhân Kỹ thuật Phần mềm (GPA tích lũy: 3.23/4.0 · Khá - Tốt). Đạt học bổng Maker danh giá 175 triệu VNĐ ghi nhận tiềm năng kỹ thuật và tư duy kiến tạo ứng dụng thực tiễn."
                : "Undergraduate Software Engineering curriculum (GPA: 3.23/4.0 · Good Standing). Recipient of the competitive 'Maker' scholarship recognized for hands-on technical potential."}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
            <span>BSc. IT · GPA 3.23/4.0</span>
            <span className="text-[var(--accent-primary)] font-bold">175,000,000 VNĐ</span>
          </div>
        </SpotlightCard>

        {/* PILLAR 03: Global Experience & Indonesia Fellowship (5 cols) */}
        <SpotlightCard className="about-artistic-card lg:col-span-5 p-8 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-black font-mono font-black text-xs flex items-center justify-center">
                  03
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  GLOBAL EXPERIENCE
                </span>
              </div>
              <Globe className="w-5 h-5 text-[var(--text-tertiary)]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {locale === "vi"
                ? "Học bổng Trao đổi Quốc tế UNJ Indonesia"
                : "UNJ Indonesia Fellowship · Industrial Immersion"}
            </h3>

            {/* Official Badge Preview */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] shadow-md">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[var(--border-strong)] bg-black shadow-lg">
                <img
                  src="/images/badges/fellowship.jpg?v=20261012c"
                  alt="UNJ Indonesia Fellowship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase">
                  GLOBAL CITIZEN FELLOWSHIP
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  Jakarta, Indonesia (06/2025)
                </span>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  UNJ · Indosat · NoLimit
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {locale === "vi"
                ? "Hoàn thành 2 tuần huấn luyện Industrial Immersion Camp tại Jakarta, Indonesia (06/2025) do UNJ, Indosat và Nolimit đồng tổ chức. Nhận chứng chỉ chính thức và giải Best Presentation."
                : "Completed intensive 2-week Global Citizen Fellowship in Jakarta, Indonesia (06/2025), jointly hosted by Universitas Negeri Jakarta, Indosat, and Nolimit Indonesia."}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
            <span>International Immersion</span>
            <span className="text-[var(--accent-primary)] font-bold">CERTIFIED 06/2025</span>
          </div>
        </SpotlightCard>

        {/* PILLAR 04: Competitive Hackathons & Cloud Velocity (7 cols) */}
        <SpotlightCard className="about-artistic-card lg:col-span-7 p-8 sm:p-10 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-black font-mono font-black text-xs flex items-center justify-center">
                  04
                </span>
                <span className="text-xs font-mono font-bold tracking-wider text-[var(--accent-primary)] uppercase">
                  COMPETITIVE ARENAS
                </span>
              </div>
              <Award className="w-5 h-5 text-[var(--accent-primary)]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight leading-snug">
              {locale === "vi"
                ? "Thí sinh VPBank Technology Hackathon 2025 (AWS Vietnam)"
                : "VPBank Technology Hackathon 2025 Participant (AWS Cloud)"}
            </h3>

            {/* Official Badge Preview */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] shadow-md">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[var(--border-strong)] bg-black shadow-lg">
                <img
                  src="/images/badges/hackathon.jpg?v=20261012c"
                  alt="VPBank Hackathon Medal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase">
                  FINTECH & CLOUD ARENA
                </span>
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  Team VeraGuard · VPBank & AWS Vietnam
                </span>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  August 02, 2025 · Verified
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              {locale === "vi"
                ? "Thí sinh tham gia cuộc thi công nghệ uy tín do VPBank và AWS Vietnam tổ chức (08/2025). Thử nghiệm nguyên mẫu thần tốc trên hạ tầng đám mây AWS với yêu cầu khắt khe về độ ổn định và kiến trúc phần mềm."
                : "Selected participant in the premier technology hackathon hosted by VPBank & AWS Vietnam (08/2025). Rapid prototyping on high-availability cloud infrastructure under strict time constraints."}
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-tertiary)]">
            <span>High-concurrency AWS Architecture</span>
            <span className="text-[var(--accent-primary)] font-bold">OFFICIAL PARTICIPANT</span>
          </div>
        </SpotlightCard>
      </div>

      {/* --- BOTTOM REAL METRICS DOCK (100% Truthful CV & GitHub Telemetry) --- */}
      <div className="max-w-7xl mx-auto mt-10 p-6 rounded-[28px] glass-panel border border-[var(--border-color)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--accent-primary)]">
            <CounterBadge value={31} />
          </div>
          <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">Public Repos (GitHub)</div>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--text-primary)]">
            <CounterBadge value={175} suffix="M" />
          </div>
          <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">Maker Award (UMT)</div>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--accent-primary)]">
            3.23
          </div>
          <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">GPA / 4.0 (UMT)</div>
        </div>

        <div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--text-primary)]">
            B1 · 5.5
          </div>
          <div className="text-xs font-mono text-[var(--text-secondary)] mt-1">VSTEP English</div>
        </div>
      </div>
    </section>
  );
}
