"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import { Briefcase, ChevronDown, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhatIDo() {
  const { locale, playUiSound } = usePortfolio();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-item-card",
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (idx: number) => {
    playUiSound("click");
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Briefcase className="w-4 h-4" />
          <span>07 · {locale === "vi" ? "Năng Lực Cốt Lõi" : "Engineering Capabilities"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "Chuyên Môn Thực Chiến." : "What I Bring."}
          </h2>
          <p className="text-sm font-mono text-[var(--text-secondary)] max-w-md">
            {locale === "vi"
              ? "Mô tả năng lực chuyên sâu của kỹ sư phần mềm, không phải bảng giá dịch vụ freelance."
              : "Technical competencies across mobile architecture, backend systems, and applied AI."}
          </p>
        </div>
      </div>

      <div ref={listRef} className="max-w-5xl mx-auto space-y-4">
        {portfolioData.capabilities.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={item.id}
              className={`capability-item-card rounded-[28px] border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[var(--bg-card)] border-[var(--border-strong)] shadow-xl"
                  : "bg-[var(--bg-card)]/50 border-[var(--border-color)] hover:border-[var(--border-strong)]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <span className="text-xl sm:text-2xl font-mono font-black text-[var(--accent-primary)]">
                    {item.index}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                    {locale === "vi" ? item.title.vi : item.title.en}
                  </h3>
                </div>

                <div
                  className={`w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-[var(--accent-primary)] text-black border-transparent" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 sm:px-8 pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl mb-6">
                    {locale === "vi" ? item.description.vi : item.description.en}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-xl bg-[var(--bg-base)] text-xs font-mono text-[var(--text-primary)] font-medium"
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
    </section>
  );
}
