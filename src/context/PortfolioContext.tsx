"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { portfolioData, ProjectItem } from "@/data/portfolioData";

type Locale = "en" | "vi";
type Theme = "dark" | "light";

interface PortfolioContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (e?: React.MouseEvent | { clientX: number; clientY: number }) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  activeProject: ProjectItem | undefined;
  modalProject: ProjectItem | null;
  openProjectModal: (project: ProjectItem) => void;
  closeProjectModal: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playUiSound: (type?: "click" | "switch" | "boot" | "whoosh") => void;
  phoneLayerExploded: boolean;
  setPhoneLayerExploded: (exploded: boolean) => void;
  togglePhoneExplode: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setThemeState] = useState<Theme>("light");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [activeProjectId, setActiveProjectId] = useState<string>("flood-early-warning");
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [phoneLayerExploded, setPhoneLayerExploded] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize theme and locale from browser & localStorage
  useEffect(() => {
    setMounted(true);
    // Theme initialization
    const storedTheme = localStorage.getItem("hoangphuc_portfolio_theme") as Theme | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const initialTheme: Theme = "light";
      setThemeState(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }

    // Locale initialization
    const storedLocale = localStorage.getItem("hoangphuc_portfolio_locale") as Locale | null;
    if (storedLocale === "en" || storedLocale === "vi") {
      setLocaleState(storedLocale);
    } else {
      const browserLang = navigator.language?.toLowerCase() || "";
      if (browserLang.startsWith("vi")) {
        setLocaleState("vi");
      } else {
        setLocaleState("en");
      }
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("hoangphuc_portfolio_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    playUiSound("switch");
  };

  const toggleTheme = (e?: React.MouseEvent | { clientX: number; clientY: number }) => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    playUiSound("switch");

    let x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let y = 40;
    if (e && "clientX" in e && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    }

    const isViewTransitionSupported =
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isViewTransitionSupported) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          setThemeState(nextTheme);
          document.documentElement.setAttribute("data-theme", nextTheme);
        });
        localStorage.setItem("hoangphuc_portfolio_theme", nextTheme);
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          document.documentElement.animate(
            {
              clipPath: clipPath,
            },
            {
              duration: 700,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    } else {
      // DOM Ink Bleed Ripple Fallback
      if (typeof document !== "undefined") {
        const overlay = document.createElement("div");
        overlay.className = "ink-bleed-overlay";
        const circle = document.createElement("div");
        circle.className = "ink-bleed-circle";
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        const size = Math.hypot(window.innerWidth, window.innerHeight) * 2.2;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = nextTheme === "dark" ? "#07080c" : "#f8fafc";
        overlay.appendChild(circle);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
          circle.style.transform = "translate(-50%, -50%) scale(1)";
          circle.style.opacity = "1";
        });

        setTimeout(() => {
          setTheme(nextTheme);
        }, 320);

        setTimeout(() => {
          circle.style.opacity = "0";
          setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 350);
        }, 700);
      } else {
        setTheme(nextTheme);
      }
    }
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("hoangphuc_portfolio_locale", newLocale);
    playUiSound("switch");
  };

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "vi" : "en";
    setLocale(nextLocale);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
    if (!soundEnabled) {
      setTimeout(() => playUiSound("click"), 50);
    }
  };

  const togglePhoneExplode = () => {
    setPhoneLayerExploded((prev) => !prev);
    playUiSound("whoosh");
  };

  // Web Audio Synthesizer for tactile UX without external media files
  const playUiSound = (type: "click" | "switch" | "boot" | "whoosh" = "click") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === "switch") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "whoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "boot") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Audio context might be restricted before user interaction
    }
  };

  const openProjectModal = (project: ProjectItem) => {
    setModalProject(project);
    playUiSound("click");
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setModalProject(null);
    playUiSound("click");
    document.body.style.overflow = "unset";
  };

  const activeProject = portfolioData.projects.find((p) => p.id === activeProjectId) || portfolioData.projects[0];

  return (
    <PortfolioContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        theme,
        setTheme,
        toggleTheme,
        activeSection,
        setActiveSection,
        activeProjectId,
        setActiveProjectId,
        activeProject,
        modalProject,
        openProjectModal,
        closeProjectModal,
        soundEnabled,
        toggleSound,
        playUiSound,
        phoneLayerExploded,
        setPhoneLayerExploded,
        togglePhoneExplode,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
