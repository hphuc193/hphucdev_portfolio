"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { usePortfolio } from "@/context/PortfolioContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowUp, Heart, Sparkles, Terminal } from "lucide-react";

export function Footer() {
  const { locale, playUiSound, toggleTheme } = usePortfolio();
  const { scrollTo: smoothScrollTo } = useSmoothScroll();
  const [konamiProgress, setKonamiProgress] = useState(0);

  // Smooth Back to Top
  const scrollToTop = () => {
    playUiSound("whoosh");
    smoothScrollTo(0);
  };

  // Easter Egg trigger
  const triggerEasterEgg = () => {
    playUiSound("boot");
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#7c5cff", "#0284c7", "#f43f5e"],
    });
  };

  // Konami Code detector: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiSequence[konamiProgress].toLowerCase()) {
        const next = konamiProgress + 1;
        if (next === konamiSequence.length) {
          triggerEasterEgg();
          toggleTheme();
          setKonamiProgress(0);
        } else {
          setKonamiProgress(next);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [konamiProgress, toggleTheme]);

  return (
    <footer className="pt-20 pb-12 px-4 md:px-8 lg:px-12 border-t border-[var(--border-color)] bg-[var(--bg-base)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 mb-12">
        {/* Monogram branding */}
        <div className="flex items-center gap-3">
          <div
            onClick={triggerEasterEgg}
            className="w-10 h-10 rounded-2xl bg-[var(--accent-primary)] text-black flex items-center justify-center font-mono font-black text-sm cursor-pointer hover:rotate-12 transition-transform shadow-lg"
            title="Click for Easter Egg 🎆"
            data-cursor="SURPRISE"
          >
            HP
          </div>
          <div>
            <div className="font-bold text-sm text-[var(--text-primary)]">
              HOANGPHUC · Lê Công Hoàng Phúc
            </div>
            <div className="text-xs font-mono text-[var(--text-tertiary)]">
              Software & Mobile Engineer · v2026
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)] text-xs font-mono font-bold text-[var(--text-primary)] transition-all cursor-pointer group shadow-md"
          data-cursor="LAUNCH"
        >
          <span>{locale === "vi" ? "LÊN ĐẦU TRANG" : "BACK TO TOP"}</span>
          <ArrowUp className="w-4 h-4 text-[var(--accent-primary)] transition-transform group-hover:-translate-y-1" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-tertiary)]">
        <div>
          © 2026 HOANGPHUC. CRAFTED WITH NEXT.JS & TAILWIND CSS.
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={triggerEasterEgg}
            className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>KONAMI EASTER EGG</span>
          </button>
          <span>·</span>
          <span>HO CHI MINH CITY, VN</span>
        </div>
      </div>
    </footer>
  );
}
