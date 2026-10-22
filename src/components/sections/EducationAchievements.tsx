"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Award,
  CheckCircle2,
  Trophy,
  GraduationCap,
  Languages,
  Globe,
  Sparkles,
  FileCheck2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EducationAchievements() {
  const { locale } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".education-metric-pill",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".education-badge-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardIcon = (id: string) => {
    switch (id) {
      case "umt-degree":
        return <GraduationCap className="w-5 h-5" />;
      case "english-proficiency":
        return <Languages className="w-5 h-5" />;
      case "unj-fellowship":
        return <Globe className="w-5 h-5" />;
      case "vpbank-hackathon":
        return <Trophy className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-20 md:py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-10 md:mb-14">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Trophy className="w-4 h-4" />
          <span>06 · {locale === "vi" ? "Học Vấn & Thành Tích" : "Education & Honors"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "Minh Bạch. Xác Thực." : "Honors & Badges."}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[var(--text-secondary)] max-w-md">
            {locale === "vi"
              ? "Bản ghi học vấn chính thức, chứng chỉ ngoại ngữ quốc tế và các giải thưởng học thuật được đối chiếu xác minh."
              : "Verified academic standing, international language certification, and competitive engineering fellowship credentials."}
          </p>
        </div>

        {/* --- TOP KEY CREDENTIALS STRIP (GPA 3.23 / 4.0 · ENGLISH B1 VSTEP 5.5 · MAKER SCHOLARSHIP) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {/* Metric 1: GPA 3.23 / 4.0 */}
          <div className="education-metric-pill p-4 rounded-2xl glass-panel border border-[var(--border-strong)] flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                {locale === "vi" ? "HỌC LỰC TÍCH LŨY" : "CUMULATIVE GPA"}
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-[var(--accent-primary)] leading-tight">
                3.23 / 4.0
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {locale === "vi" ? "Xếp loại Khá - Tốt" : "Good Standing (UMT)"}
              </div>
            </div>
          </div>

          {/* Metric 2: English B1 (VSTEP 5.5) */}
          <div className="education-metric-pill p-4 rounded-2xl glass-panel border border-[var(--border-strong)] flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                {locale === "vi" ? "NGOẠI NGỮ QUỐC TẾ" : "LANGUAGE PROFICIENCY"}
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-[var(--text-primary)] leading-tight">
                B1 · VSTEP 5.5
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {locale === "vi" ? "Chứng chỉ VSTEP (Bậc 3/6)" : "CEFR B1 Equivalent"}
              </div>
            </div>
          </div>

          {/* Metric 3: Maker Scholarship */}
          <div className="education-metric-pill p-4 rounded-2xl glass-panel border border-[var(--border-strong)] flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                {locale === "vi" ? "HỌC BỔNG TÀI NĂNG" : "SCHOLARSHIP HONOR"}
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-[var(--text-primary)] leading-tight">
                175M VNĐ
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {locale === "vi" ? "Học bổng Maker UMT" : "Maker Scholarship"}
              </div>
            </div>
          </div>

          {/* Metric 4: Fellowship */}
          <div className="education-metric-pill p-4 rounded-2xl glass-panel border border-[var(--border-strong)] flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                {locale === "vi" ? "TRAO ĐỔI QUỐC TẾ" : "GLOBAL FELLOWSHIP"}
              </div>
              <div className="text-lg sm:text-xl font-mono font-black text-[var(--text-primary)] leading-tight">
                UNJ Jakarta
              </div>
              <div className="text-[11px] font-semibold text-[var(--text-secondary)]">
                {locale === "vi" ? "Indonesia · Indosat Camp" : "Global Citizen Camp"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOUR DETAILED ACADEMIC CARDS --- */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {portfolioData.education.map((item) => {
          return (
            <SpotlightCard
              key={item.id}
              className="education-badge-card p-6 sm:p-7 rounded-[28px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-primary)] group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center font-bold">
                    {getCardIcon(item.id)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--border-color)] text-[var(--text-tertiary)] font-semibold">
                    {item.period}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                  {locale === "vi" ? item.degree.vi : item.degree.en}
                </h3>

                <div className="text-xs font-semibold text-[var(--text-secondary)] mb-3">
                  {locale === "vi" ? item.school.vi : item.school.en}
                </div>

                {/* Specific GPA / Score Callout Pill if available */}
                {item.gpa && (
                  <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 font-mono text-xs font-bold">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>
                      {item.id === "english-proficiency"
                        ? `VSTEP Score: ${item.gpa}`
                        : `GPA: ${item.gpa}`}
                    </span>
                  </div>
                )}

                {item.honor && (
                  <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-xs font-mono font-bold text-[var(--accent-primary)] mb-4">
                    {locale === "vi" ? item.honor.vi : item.honor.en}
                  </div>
                )}

                <div className="space-y-2">
                  {item.details.map((d, i) => (
                    <p key={i} className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {locale === "vi" ? d.vi : d.en}
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
                <span>{locale === "vi" ? item.location.vi : item.location.en}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
