"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import {
  ArrowRight,
  Smartphone,
  Server,
  BrainCircuit,
  Layers,
  Cpu,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhatIDo() {
  const { locale, playUiSound, theme } = usePortfolio();
  const { scrollTo: smoothScrollTo } = useSmoothScroll();
  const isDark = theme === "dark";

  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-editorial-row",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExploreSkills = () => {
    playUiSound("click");
    if (smoothScrollTo) {
      smoothScrollTo("#skills");
    } else {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCapabilityIcon = (indexStr: string) => {
    switch (indexStr) {
      case "01":
        return <Smartphone className="w-5 h-5 text-sky-500" />;
      case "02":
        return <Server className="w-5 h-5 text-sky-500" />;
      case "03":
        return <BrainCircuit className="w-5 h-5 text-sky-500" />;
      case "04":
        return <Layers className="w-5 h-5 text-sky-500" />;
      case "05":
      default:
        return <Cpu className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden bg-[var(--bg-base)]"
    >
      {/* Background Subtle Gradient & Light Ring */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SOPHISTICATED EDITORIAL TRANSITION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200/80 dark:border-slate-800/80 mb-12 sm:mb-16">
          <div className="max-w-xl">
            {/* Small blue section identifier: | 05 — ABOUT ME */}
            <div className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 font-mono text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-1 h-3.5 bg-sky-500 rounded-full" />
              <span>{locale === "vi" ? "05 — NĂNG LỰC CỐT LÕI" : "05 — ABOUT ME"}</span>
            </div>

            {/* Large Bold Editorial Heading: What I Bring. */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
              {locale === "vi" ? "Chuyên Môn Thực Chiến" : "What I Bring"}
              <span className="text-sky-500">.</span>
            </h2>
          </div>

          {/* Right Supporting Description & Refined Explore My Skills CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 max-w-2xl">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md font-normal">
              {locale === "vi"
                ? "Sự kết hợp giữa năng lực kỹ thuật chuyên sâu, tư duy giải quyết vấn đề và đam mê kiến tạo sản phẩm giá trị."
                : "A blend of technical skills, problem-solving mindset, and a passion for building meaningful products."}
            </p>

            <button
              onClick={handleExploreSkills}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 hover:border-sky-500 dark:hover:border-sky-400 text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-sky-600 dark:hover:text-sky-400 shadow-xs hover:shadow-md transition-all duration-200 shrink-0 cursor-pointer group active:scale-95"
            >
              <span>{locale === "vi" ? "Khám Phá Kỹ Năng" : "Explore My Skills"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-sky-500" />
            </button>
          </div>
        </div>

        {/* --- REFINED EDITORIAL CAPABILITIES ACCORDION LIST --- */}
        <div ref={listRef} className="space-y-4 max-w-5xl mx-auto">
          {portfolioData.capabilities.map((item, idx) => {
            const isOpen = expandedIndex === idx;

            return (
              <div
                key={item.id}
                className={`capability-editorial-row rounded-[24px] sm:rounded-[26px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/95 dark:bg-slate-900/95 border-sky-400/60 dark:border-sky-500/60 shadow-[0_16px_40px_rgba(2,132,199,0.12)] ring-1 ring-sky-400/20"
                    : "bg-white/70 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/90"
                }`}
              >
                <button
                  onClick={() => {
                    playUiSound("click");
                    setExpandedIndex(isOpen ? -1 : idx);
                  }}
                  className="w-full p-6 sm:p-7 md:p-8 flex items-center justify-between text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                    {/* Index Number */}
                    <span className="text-lg sm:text-2xl font-mono font-black text-sky-600 dark:text-sky-400 min-w-[28px] sm:min-w-[36px]">
                      {item.index}
                    </span>

                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900 flex items-center justify-center shrink-0">
                      {getCapabilityIcon(item.index)}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                      {locale === "vi" ? item.title.vi : item.title.en}
                    </h3>
                  </div>

                  {/* Toggle indicator arrow */}
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-sky-500 text-white border-transparent shadow-xs"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-7 pt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">
                      {locale === "vi" ? item.description.vi : item.description.en}
                    </p>

                    {/* Tag Badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
