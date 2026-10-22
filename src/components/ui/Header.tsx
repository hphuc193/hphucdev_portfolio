"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { ScrambleText } from "@/hooks/useTextScramble";
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const {
    locale,
    toggleLocale,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    activeSection,
    playUiSound,
  } = usePortfolio();

  const { scrollTo: smoothScrollTo } = useSmoothScroll();
  const [timeStr, setTimeStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ho Chi Minh City Time Clock (GMT+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for backdrop intensification
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "work", en: "Work", vi: "Dự án" },
    { id: "about", en: "About", vi: "Giới thiệu" },
    { id: "certificates", en: "Certificates", vi: "Chứng chỉ" },
    { id: "skills", en: "Skills", vi: "Kỹ năng" },
    { id: "experience", en: "Experience", vi: "Kinh nghiệm" },
    { id: "contact", en: "Contact", vi: "Liên hệ" },
  ];

  const handleNavClick = (id: string) => {
    playUiSound("click");
    setMobileMenuOpen(false);
    smoothScrollTo(`#${id}`);
  };

  return (
    <>
      <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[var(--bg-card)] border border-[var(--border-strong)] shadow-2xl backdrop-blur-xl"
              : "bg-[var(--bg-card)] border border-[var(--border-color)] backdrop-blur-md"
          }`}
        >
          {/* Logo Monogram */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor="TOP"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-black flex items-center justify-center font-black font-mono text-xs transition-transform duration-300 group-hover:scale-105">
              HP
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-[var(--text-primary)]">
                HOANGPHUC
              </span>
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                v2026 · HCMC
              </span>
            </div>
          </button>

          {/* Nav links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors relative cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                  data-cursor="GO"
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[var(--border-color)] -z-10" />
                  )}
                  <ScrambleText text={locale === "vi" ? item.vi : item.en} />
                </button>
              );
            })}
          </div>

          {/* Right actions dock */}
          <div className="flex items-center gap-2 text-xs">
            {/* Live Clock HCM */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--border-color)] font-mono text-[11px] text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse" />
              <span>{timeStr || "13:21:00"}</span>
              <span className="text-[9px] text-[var(--text-tertiary)]">ICT</span>
            </div>

            {/* Language Switcher (EN | VI) with Scramble */}
            <button
              onClick={toggleLocale}
              className="px-2.5 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] font-mono text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 text-[var(--text-primary)]"
              title="Toggle English / Tiếng Việt"
              data-cursor="LANG"
            >
              <span className={locale === "en" ? "text-[var(--accent-primary)] font-bold" : "opacity-60"}>
                EN
              </span>
              <span className="opacity-30">|</span>
              <span className={locale === "vi" ? "text-[var(--accent-primary)] font-bold" : "opacity-60"}>
                VI
              </span>
            </button>

            {/* Theme Toggle (Dark / Light) with Ink Bleed Effect */}
            <button
              onClick={(e) => toggleTheme(e)}
              className="w-8 h-8 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] flex items-center justify-center text-[var(--text-primary)] transition-all cursor-pointer"
              title="Toggle Dark / Light Mode"
              data-cursor="THEME"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              )}
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              className="w-8 h-8 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] hidden sm:flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              title={soundEnabled ? "Mute audio" : "Enable tactile sound FX"}
              data-cursor="SOUND"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>

            {/* CTA "Let's Talk" */}
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-base)] font-semibold text-xs transition-transform hover:scale-105 cursor-pointer ml-1"
              data-cursor="TALK"
            >
              <span>{locale === "vi" ? "Liên hệ" : "Let's Talk"}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-16 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-5 text-2xl font-bold tracking-tight">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-baseline justify-between border-b border-[var(--border-color)] pb-3"
              >
                <span>{locale === "vi" ? item.vi : item.en}</span>
                <span className="font-mono text-xs text-[var(--text-tertiary)]">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 text-sm font-mono text-[var(--text-secondary)]">
            <div className="flex items-center justify-between">
              <span>HCMC LOCAL TIME:</span>
              <span className="text-[var(--text-primary)] font-bold">{timeStr} ICT</span>
            </div>
            <div className="flex items-center justify-between">
              <span>STATUS:</span>
              <span className="text-[var(--accent-primary)] font-bold">
                {locale === "vi" ? "Sẵn sàng nhận cơ hội" : "Open to opportunities"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
