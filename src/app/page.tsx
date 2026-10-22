"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";
import { Preloader } from "@/components/ui/Preloader";
import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { DimensionalWarp } from "@/components/ui/DimensionalWarp";
import { CertificatesShowcase } from "@/components/sections/CertificatesShowcase";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { EducationAchievements } from "@/components/sections/EducationAchievements";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { GitHubRadar } from "@/components/sections/GitHubRadar";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const { setActiveSection } = usePortfolio();

  // Global Scroll Spy via GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = ["hero", "about", "work", "skills", "experience", "capabilities", "certificates", "contact"];
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [setActiveSection]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Preloader with HP Monogram & Core Boot Sequence */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Floating Pill Dock Navigation */}
      <Header />

      {/* 01: Hero Section ("The Living Device") */}
      <Hero />

      {/* 02: The Mindset of a Builder (Origins & Philosophy) */}
      <About />

      {/* 3D Dimensional Warp Portal (Traversing Dimensions Into the Builder Realm) */}
      <DimensionalWarp />

      {/* 03: Selected Projects Showcase (Featured Engineering) */}
      <SelectedProjects />

      {/* 04: Categorized Tech Stack (No % bars) */}
      <TechStack />

      {/* 05: Experience & Milestones Timeline */}
      <Experience />

      {/* 06: Education & Verified Honors */}
      <EducationAchievements />

      {/* 07: What I Do / What I Bring (Capabilities Accordion) */}
      <WhatIDo />

      {/* 08: Verified Credentials & Certificates Showcase (Digital Museum) */}
      <CertificatesShowcase />

      {/* 09: Open Source & Live GitHub Telemetry */}
      <GitHubRadar />

      {/* 10: Contact ("Let's Build Something") */}
      <Contact />

      {/* 11: Footer with Launch Back to Top & Konami Easter Egg */}
      <Footer />
    </main>
  );
}
