"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrambleText } from "@/hooks/useTextScramble";
import { Cpu, Check, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TechStack() {
  const { locale, playUiSound } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-category-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
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
  }, [activeCategory]);

  const categories = portfolioData.skills;

  const handleFilter = (catId: string) => {
    playUiSound("click");
    setActiveCategory(catId);
  };

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-[var(--accent-glow)] blur-[150px] pointer-events-none -z-10 opacity-30" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Cpu className="w-4 h-4" />
          <span>04 · {locale === "vi" ? "Bộ Kỹ Năng & Công Cụ" : "Engineering Skills"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "Năng Lực Công Nghệ." : "Stack & Tooling."}
          </h2>
          <p className="text-sm font-mono text-[var(--text-secondary)] max-w-md">
            {locale === "vi"
              ? "Tổ chức theo 8 lĩnh vực thực tế trong CV. Tuyệt đối không dùng thanh phần trăm mang tính giả định."
              : "Grouped by 8 concrete engineering domains. Strictly zero arbitrary percentage progress bars."}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar [-webkit-overflow-scrolling:touch]">
        <button
          onClick={() => handleFilter("all")}
          className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeCategory === "all"
              ? "bg-[var(--accent-primary)] text-black shadow-lg scale-105"
              : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          {locale === "vi" ? "Tất Cả (8 Nhóm)" : "All Categories (8 Groups)"}
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-[var(--accent-primary)] text-black shadow-lg scale-105"
                : "bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {locale === "vi" ? cat.title.vi : cat.title.en}
          </button>
        ))}
      </div>

      {/* Categorized Skills Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <SpotlightCard
            key={category.id}
            className="tech-category-card p-7 rounded-[28px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent-primary)] group"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-4">
                <h3 className="font-extrabold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {locale === "vi" ? category.title.vi : category.title.en}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--border-color)] text-[var(--text-tertiary)]">
                  {category.skills.length} items
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-color)] text-xs font-mono font-medium text-[var(--text-primary)] transition-all duration-200 hover:scale-105 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
