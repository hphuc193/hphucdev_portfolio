"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  Layers,
  Cpu,
  Server,
  Database,
  Sparkles,
  Smartphone,
  Code2,
  ArrowRight,
  Terminal,
  Activity,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExplodedArchitecture() {
  const { locale, playUiSound } = usePortfolio();
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);

  const layers = [
    {
      id: "l1",
      number: "01",
      name: {
        en: "Client UI & Mobile Presentation Tier",
        vi: "Tầng Giao Diện Người Dùng & Di Động",
      },
      tag: "Flutter · Kotlin Android · SwiftUI",
      icon: Smartphone,
      color: "#38bdf8",
      description: {
        en: "Multi-platform client engineering focused on 60/120fps fluid responsiveness, declarative UI pipelines, gesture navigation, and native hardware optimization.",
        vi: "Phát triển giao diện di động đa nền tảng tối ưu phản hồi 60/120fps, pipeline giao diện khai báo, điều hướng cử chỉ và tối ưu phần cứng thiết bị.",
      },
      techs: ["Flutter", "Dart", "Kotlin", "SwiftUI", "Android SDK", "ViewBinding", "Media3"],
      telemetry: "RENDER: 120 FPS · UI THREAD: 0 DROPPED FRAMES",
    },
    {
      id: "l2",
      number: "02",
      name: {
        en: "Reactive State & Business Logic Core",
        vi: "Tầng Quản Lý Trạng Thái & Logic Nghiệp Vụ",
      },
      tag: "Provider · Coroutines · Combine",
      icon: Cpu,
      color: "#60a5fa",
      description: {
        en: "Atomic unidirectional state flow, memory-safe asynchronous execution, background thread dispatching, and offline-first persistence cache.",
        vi: "Luồng trạng thái một chiều nguyên tử, thực thi bất đồng bộ an toàn bộ nhớ, điều phối luồng nền và đồng bộ bộ nhớ đệm ngoại tuyến.",
      },
      techs: ["Provider", "Kotlin Coroutines", "Combine", "Realm", "State Machines"],
      telemetry: "STATE: REACIVE DISPATCH · DISPATCH DELAY: < 2ms",
    },
    {
      id: "l3",
      number: "03",
      name: {
        en: "Microservices & Real-Time Gateway",
        vi: "Tầng Microservices & Cổng API Thời Gian Thực",
      },
      tag: "Node.js · FastAPI · .NET REST · WebSocket",
      icon: Server,
      color: "#a855f7",
      description: {
        en: "High-throughput API routing and bidirectional WebSocket channels distributing real-time telemetry, live environmental hazard updates, and auth validation.",
        vi: "Định tuyến API thông lượng cao và kênh WebSocket hai chiều phát tín hiệu cảm biến thời gian thực, cảnh báo thiên tai và xác thực token.",
      },
      techs: ["Node.js", "Express", "FastAPI", "C# .NET API", "WebSocket", "Docker"],
      telemetry: "GATEWAY: WEBSOCKET ACTIVE · LATENCY: 24ms",
    },
    {
      id: "l4",
      number: "04",
      name: {
        en: "Spatial & Relational Persistence",
        vi: "Tầng Cơ Sở Dữ Liệu & Dữ Liệu Địa Không Gian",
      },
      tag: "PostgreSQL · PostGIS · SQL Server · Firestore",
      icon: Database,
      color: "#0284c7",
      description: {
        en: "Geospatial boundary indexing, flood contour polygon queries, ACID transaction guarantees, and distributed document synchronization.",
        vi: "Lập chỉ mục ranh giới địa không gian, truy vấn đa giác ngập lụt PostGIS, đảm bảo giao dịch ACID và đồng bộ dữ liệu đám mây.",
      },
      techs: ["PostgreSQL", "PostGIS", "SQL Server", "Cloud Firestore", "MongoDB"],
      telemetry: "POSTGIS: SPATIAL INDEX OK · BOUNDARY QUERY: 8ms",
    },
    {
      id: "l5",
      number: "05",
      name: {
        en: "AI Inference & Predictive Analytics",
        vi: "Tầng Trí Tuệ Nhân Tạo & Dự Báo Nguy Cơ",
      },
      tag: "Python · PyTorch · Scikit-Learn · ML Pipeline",
      icon: Sparkles,
      color: "#f59e0b",
      description: {
        en: "Real-time hazard classification, hydrological surge estimation, computer vision thoracic screening, and automated generative video dispatch.",
        vi: "Phân loại nguy cơ thời gian thực, ước tính dâng nước thủy văn, xử lý ảnh thị giác máy tính và điều phối sinh video AI.",
      },
      techs: ["Python", "Machine Learning", "Computer Vision", "AI API Integration"],
      telemetry: "INFERENCE WORKER: ACTIVE · CONFIDENCE: 91.2%",
    },
  ];

  const current = layers[selectedLayer];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Staggered tier tabs reveal
      gsap.fromTo(
        ".architecture-tier-btn",
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Deep inspector zoom reveal
      if (inspectorRef.current) {
        gsap.fromTo(
          inspectorRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="py-28 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Layers className="w-4 h-4" />
          <span>02 · {locale === "vi" ? "Kiến Trúc Kỹ Thuật Hệ Thống" : "System Architecture"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "5 Tầng Kiến Trúc Phần Mềm." : "5-Tier System Stack."}
          </h2>
          <p className="text-sm font-mono text-[var(--text-secondary)] max-w-md">
            {locale === "vi"
              ? "Cách tiếp cận có cấu trúc từ ứng dụng di động đến hạ tầng microservices và AI."
              : "Structured engineering blueprint from native mobile clients down to spatial databases and ML inference."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive Layer Selection Tabs (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === idx;
            const Icon = layer.icon;

            return (
              <SpotlightCard
                key={layer.id}
                onClick={() => {
                  playUiSound("click");
                  setSelectedLayer(idx);
                }}
                className={`architecture-tier-btn p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--bg-card)] border-[var(--border-strong)] shadow-xl ring-1 ring-[var(--accent-primary)]/40 scale-[1.01]"
                    : "bg-[var(--bg-card)]/50 border-[var(--border-color)] hover:border-[var(--border-strong)] opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: layer.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold" style={{ color: layer.color }}>
                        TIER {layer.number}
                      </div>
                      <div className="text-base font-extrabold text-[var(--text-primary)]">
                        {locale === "vi" ? layer.name.vi : layer.name.en}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "translate-x-1 text-[var(--accent-primary)]" : "opacity-30"
                    }`}
                  />
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Right Column: Deep Tier Technical Inspector (7 cols) */}
        <div ref={inspectorRef} className="lg:col-span-7">
          <SpotlightCard className="h-full p-8 sm:p-10 rounded-[32px] glass-panel border border-[var(--border-strong)] flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)] mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: current.color }}
                  />
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--text-primary)]">
                    TIER {current.number} SPECIFICATION
                  </span>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--border-color)] text-[var(--text-secondary)]">
                  {current.tag}
                </span>
              </div>

              {/* 3D Isometric Exploded View Blueprint Visual Asset */}
              <div className="relative w-full h-[200px] sm:h-[260px] rounded-2xl overflow-hidden mb-6 border border-[var(--border-strong)] bg-black/70 group shadow-xl">
                <Image
                  src="/images/architecture-layers.jpg"
                  alt="5-Tier Exploded Architecture Blueprint"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 750px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-[var(--accent-primary)] border border-white/10 flex items-center gap-2 font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-ping" />
                  <span>3D ISOMETRIC SYSTEM BLUEPRINT // TIER {current.number} ACTIVE</span>
                </div>
              </div>

              {/* Title & Narrative */}
              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-3 tracking-tight">
                {locale === "vi" ? current.name.vi : current.name.en}
              </h3>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
                {locale === "vi" ? current.description.vi : current.description.en}
              </p>

              {/* Tech Badges */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
                  {locale === "vi" ? "CÔNG NGHỆ CHÍNH" : "PRIMARY TECHNOLOGIES"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-color)] text-xs font-mono font-medium text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Telemetry Bar */}
            <div className="p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-tertiary)] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
                TELEMETRY:
              </span>
              <span className="font-bold text-[var(--accent-primary)]">
                {current.telemetry}
              </span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
