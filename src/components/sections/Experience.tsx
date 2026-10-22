"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Calendar, MapPin, Milestone, Building2, Globe2, Sparkles, Award } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Experience() {
  const { locale } = usePortfolio();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven vertical circuit line fill
      if (progressBarRef.current && timelineRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center+=80",
              end: "bottom center+=120",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Staggered card entrance + node illumination
      const items = gsap.utils.toArray<HTMLElement>(".experience-milestone-item");
      items.forEach((item) => {
        const card = item.querySelector(".experience-card");
        const node = item.querySelector(".experience-node-glow");
        const ping = item.querySelector(".experience-node-ping");

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        }

        if (node) {
          gsap.fromTo(
            node,
            { backgroundColor: "var(--border-strong)", scale: 0.8 },
            {
              backgroundColor: "var(--accent-primary)",
              scale: 1.25,
              boxShadow: "0 0 20px var(--accent-glow)",
              scrollTrigger: {
                trigger: item,
                start: "top center",
                end: "top center-=50",
                scrub: 0.3,
                onEnter: () => {
                  if (ping) ping.classList.remove("opacity-0");
                },
                onLeaveBack: () => {
                  if (ping) ping.classList.add("opacity-0");
                },
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case "internship":
        return Building2;
      case "fellowship":
        return Globe2;
      case "hackathon":
        return Award;
      default:
        return Milestone;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-28 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[var(--accent-glow)] blur-[160px] pointer-events-none -z-10 opacity-30" />

      {/* Section Header with mask-reveal styling */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Milestone className="w-4 h-4" />
          <span>05 · {locale === "vi" ? "Hành Trình & Kinh Nghiệm" : "Work & Milestones"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "Dấu Ấn Trải Nghiệm." : "Career Milestones."}
          </h2>
          <p className="text-sm font-mono text-[var(--text-secondary)] max-w-md">
            {locale === "vi"
              ? "Kinh nghiệm thực tập doanh nghiệp, học bổng trao đổi quốc tế và các cuộc thi công nghệ thực chiến."
              : "Enterprise software development, international technology fellowships, and competitive hackathons."}
          </p>
        </div>
      </div>

      {/* Vertical Interactive Scroll Timeline */}
      <div ref={timelineRef} className="max-w-4xl mx-auto relative pl-8 sm:pl-12">
        {/* Base Background Track */}
        <div className="absolute left-2 sm:left-3 top-0 bottom-0 w-[2px] bg-[var(--border-color)] rounded-full -translate-x-1/2" />

        {/* Scroll-Driven Animated Circuit Line */}
        <div
          ref={progressBarRef}
          className="absolute left-2 sm:left-3 top-0 w-[2px] bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-bright)] to-[var(--accent-violet)] rounded-full -translate-x-1/2 shadow-[0_0_12px_var(--accent-glow)] will-change-[height]"
          style={{ height: "0%" }}
        >
          {/* Animated Electron Beam Head */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--accent-primary)] shadow-[0_0_16px_var(--accent-glow)] ring-4 ring-[var(--accent-glow)]" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {portfolioData.experience.map((item, idx) => {
            const IconComponent = getMilestoneIcon(item.type);

            return (
              <div
                key={item.id}
                className="experience-milestone-item relative group will-change-transform"
              >
                {/* Node Connector Anchor on the Circuit Line */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-6 -translate-x-1/2 flex items-center justify-center z-10">
                  {/* Glowing Node Dot */}
                  <div className="experience-node-glow w-4 h-4 rounded-full bg-[var(--bg-base)] border-2 border-[var(--border-strong)] transition-all duration-300 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>

                  {/* Ping Aura */}
                  <span className="experience-node-ping opacity-0 absolute w-7 h-7 rounded-full bg-[var(--accent-primary)]/40 animate-ping pointer-events-none transition-opacity duration-300" />
                </div>

                {/* Milestone Spotlight Card */}
                <div className="experience-card">
                  <SpotlightCard className="p-7 sm:p-9 rounded-[32px] glass-panel border border-[var(--border-strong)] transition-all duration-300 hover:border-[var(--accent-primary)] shadow-xl group/card">
                    {/* Header Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono text-[var(--accent-primary)] flex items-center gap-1.5 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[var(--border-color)] text-[var(--text-secondary)] uppercase tracking-wider">
                          {item.type}
                        </span>
                        <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                          #0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-2 group-hover/card:text-[var(--accent-primary)] transition-colors">
                      {locale === "vi" ? item.role.vi : item.role.en}
                    </h3>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--text-secondary)] mb-6">
                      <span className="text-[var(--text-primary)] font-bold">
                        {locale === "vi" ? item.company.vi : item.company.en}
                      </span>
                      <span className="opacity-40">·</span>
                      <span className="flex items-center gap-1 text-xs font-mono text-[var(--text-tertiary)]">
                        <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        {locale === "vi" ? item.location.vi : item.location.en}
                      </span>
                    </div>

                    {/* Bullet points strictly from CV */}
                    <div className="space-y-3 mb-6">
                      {item.description.map((desc, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          <span className="text-[var(--accent-primary)] mt-1 font-bold text-xs">
                            ▹
                          </span>
                          <span>{locale === "vi" ? desc.vi : desc.en}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-xl bg-[var(--bg-base)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] font-medium transition-colors hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
