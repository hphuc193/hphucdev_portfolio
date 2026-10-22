"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData, ProjectItem } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { IconGithub } from "@/components/ui/SocialIcons";
import {
  FolderGit2,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  ChevronRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SelectedProjects() {
  const { locale, playUiSound, modalProject, openProjectModal, closeProjectModal } = usePortfolio();

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP Horizontal Scroll Pinning
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only apply horizontal pin on desktop screens (>= 1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (!mediaQuery.matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const scrollDistance = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden py-24 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-[var(--accent-glow)] blur-[160px] pointer-events-none -z-10 opacity-40" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full mb-8 lg:mb-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>03 · {locale === "vi" ? "Dự Án Chọn Lọc" : "Selected Works"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
              {locale === "vi" ? "Sản Phẩm Đã Xây Dựng." : "Featured Engineering."}
            </h2>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-[var(--text-tertiary)]">
            <span>SCROLL HORIZONTALLY</span>
            <ArrowRight className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="overflow-x-auto lg:overflow-visible no-scrollbar px-4 md:px-8 lg:px-12">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full lg:w-max will-change-transform pb-6 lg:pb-0"
        >
          {portfolioData.projects.map((proj, idx) => {
            return (
              <SpotlightCard
                key={proj.id}
                className="w-full lg:w-[680px] p-6 sm:p-8 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between shrink-0 shadow-2xl transition-all duration-300 hover:border-[var(--accent-primary)] group"
                data-cursor="CASE STUDY"
              >
                <div>
                  {/* Top Header Tag row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-black text-[var(--accent-primary)]">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--border-color)] text-[var(--text-secondary)] uppercase">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] font-bold">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{proj.period}</span>
                  </div>

                  {/* Visual High-Fidelity UI Mockup Showcase */}
                  {proj.image && (
                    <div
                      onClick={() => {
                        playUiSound("click");
                        openProjectModal(proj);
                      }}
                      className="relative w-full h-[210px] sm:h-[260px] rounded-2xl overflow-hidden mb-6 border border-[var(--border-strong)] bg-black/50 group/img cursor-pointer transition-all duration-500 hover:border-[var(--accent-primary)] shadow-lg"
                    >
                      <img
                        src={`${proj.image}?v=20261012c`}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-75" />
                      
                      {/* Telemetry badge on mockup */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-[var(--accent-primary)] border border-white/10 flex items-center gap-1.5 font-bold shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                        <span>UI PROTOTYPE</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                        <span className="truncate drop-shadow-md font-semibold">{proj.title}</span>
                        <span className="text-[11px] text-[var(--accent-primary)] font-bold uppercase tracking-wider underline">
                          {locale === "vi" ? "Xem sơ đồ ↗" : "Inspect ↗"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors tracking-tight mb-2">
                    {proj.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 font-normal">
                    {locale === "vi" ? proj.tagline.vi : proj.tagline.en}
                  </p>

                  {/* Technical Highlights list */}
                  <div className="space-y-2 mb-5">
                    {proj.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        <span className="text-[var(--accent-primary)] mt-0.5 font-bold">✦</span>
                        <span>{locale === "vi" ? h.vi : h.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-base)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[var(--border-color)] mt-auto">
                  <button
                    onClick={() => {
                      playUiSound("click");
                      openProjectModal(proj);
                    }}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                  >
                    <span>{locale === "vi" ? "Xem Case Study & Sơ Đồ" : "View Case Study & Diagram"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    {proj.githubUrl ? (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        title="GitHub Repository"
                        data-cursor="GITHUB"
                      >
                        <IconGithub className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-tertiary)] px-2.5 py-1 rounded-full bg-[var(--border-color)]">
                        {proj.isComingSoon
                          ? locale === "vi"
                            ? "Sắp ra mắt"
                            : "Coming soon"
                          : "Private"}
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal with Interactive Architecture Diagram */}
      {modalProject && <ProjectModal project={modalProject} onClose={closeProjectModal} />}
    </section>
  );
}
