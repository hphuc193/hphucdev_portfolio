"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  X,
  ExternalLink,
  Cpu,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Database,
  Smartphone,
  Server,
  Bell,
  ArrowRight,
} from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";

interface ModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ModalProps) {
  const { locale, playUiSound } = usePortfolio();
  const [activeArchNode, setActiveArchNode] = useState<string>("mobile");

  // Interactive Architecture Diagram Nodes for Flood Warning AI
  const floodArchitectureNodes = [
    {
      id: "mobile",
      label: "Flutter Mobile Client",
      sub: "OpenStreetMap · WebSockets",
      icon: Smartphone,
      color: "#38bdf8",
      detail: {
        en: "Cross-platform mobile client displaying live inundation polygons, sensor gauge status, and dispatching urgent local evacuation pushes.",
        vi: "Ứng dụng di động hiển thị đa giác ngập lụt trực tiếp, trạng thái trạm cảm biến và nhận cảnh báo khẩn cấp tức thời.",
      },
    },
    {
      id: "gateway",
      label: "Node.js API Gateway",
      sub: "Express · WebSocket Bus",
      icon: Server,
      color: "#a855f7",
      detail: {
        en: "High-throughput API gateway routing sensor telemetry, client auth tokens, and multiplexing bidirectional WebSocket event channels.",
        vi: "Cổng API xử lý lưu lượng lớn, tiếp nhận dữ liệu đo đạc, xác thực người dùng và phân phối luồng WebSocket 2 chiều.",
      },
    },
    {
      id: "db",
      label: "PostgreSQL & PostGIS",
      sub: "Spatial Indexing · Telemetry",
      icon: Database,
      color: "#0284c7",
      detail: {
        en: "Spatial relational database storing historical flood contour boundaries, telemetry time-series, and executing PostGIS boundary queries.",
        vi: "Cơ sở dữ liệu quan hệ không gian lưu trữ đường biên ngập lụt, chuỗi thời gian quan trắc và truy vấn địa không gian PostGIS.",
      },
    },
    {
      id: "ai",
      label: "Python ML Inference",
      sub: "Hazard Classifier · Forecast",
      icon: Cpu,
      color: "#f59e0b",
      detail: {
        en: "Machine learning evaluation service computing water level surge probabilities based on rainfall rates and river station metrics.",
        vi: "Dịch vụ tính toán học máy phân tích xác suất dâng nước dựa trên lượng mưa và lưu lượng trạm thủy văn.",
      },
    },
    {
      id: "notify",
      label: "Alert Dispatch Service",
      sub: "Push Notifications · Warning",
      icon: Bell,
      color: "#ef4444",
      detail: {
        en: "Automated event trigger generating targeted push notifications to users located inside designated high-risk flood polygons.",
        vi: "Bộ kích hoạt tự động gửi thông báo đẩy đến cư dân nằm trong vùng ranh giới nguy cơ ngập lụt nghiêm trọng.",
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-[32px] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-6 sm:p-8 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)] text-black font-bold uppercase">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">{project.period}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1 tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => {
              playUiSound("click");
              onClose();
            }}
            className="w-10 h-10 rounded-full border border-[var(--border-color)] hover:border-[var(--accent-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Visual Showcase Banner */}
          {project.image && (
            <div className="relative w-full h-56 sm:h-72 md:h-88 rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-black/60 group">
              <img
                src={`${project.image}?v=20261012c`}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                  UI PROTOTYPE · INTERACTIVE PREVIEW
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300">
                  {project.period}
                </span>
              </div>
            </div>
          )}

          {/* Subtitle / Tagline */}
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {locale === "vi" ? project.tagline.vi : project.tagline.en}
          </p>

          {/* Role & Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)]">
            <div>
              <div className="text-[11px] font-mono text-[var(--text-tertiary)] uppercase">
                {locale === "vi" ? "VAI TRÒ THỰC HIỆN" : "ENGINEERING ROLE"}
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)]">
                {locale === "vi" ? project.role.vi : project.role.en}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)] text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 transition-all"
                >
                  <IconGithub className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)]" />
                </a>
              ) : (
                <span className="px-4 py-2 rounded-full border border-[var(--border-color)] text-xs font-mono text-[var(--text-tertiary)]">
                  {project.isComingSoon
                    ? locale === "vi"
                      ? "Mã nguồn sắp công bố"
                      : "Repository Coming Soon"
                    : "Private Codebase"}
                </span>
              )}
            </div>
          </div>

          {/* Interactive System Architecture Diagram for Flood Warning AI */}
          {project.id === "flood-early-warning" && (
            <div className="p-6 rounded-3xl border border-sky-500/30 bg-sky-950/20 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold uppercase">
                  <Layers className="w-4 h-4" />
                  <span>
                    {locale === "vi"
                      ? "SƠ ĐỒ KIẾN TRÚC HỆ THỐNG TƯƠNG TÁC"
                      : "INTERACTIVE SYSTEM ARCHITECTURE DIAGRAM"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Click node to inspect</span>
              </div>

              {/* Node Sequence Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
                {floodArchitectureNodes.map((node) => {
                  const isNodeActive = activeArchNode === node.id;
                  const NodeIcon = node.icon;
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        playUiSound("click");
                        setActiveArchNode(node.id);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        isNodeActive
                          ? "bg-zinc-900 border-sky-400 shadow-lg scale-102"
                          : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-black mb-2"
                        style={{ backgroundColor: node.color }}
                      >
                        <NodeIcon className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-white truncate">{node.label}</div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate">{node.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Detail Pane */}
              {(() => {
                const cur = floodArchitectureNodes.find((n) => n.id === activeArchNode);
                if (!cur) return null;
                return (
                  <div className="p-4 rounded-2xl bg-zinc-900/90 border border-sky-500/30 flex items-start gap-3">
                    <span className="text-sky-400 text-lg">✦</span>
                    <div>
                      <div className="text-xs font-mono font-bold text-sky-300 uppercase">
                        {cur.label}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                        {locale === "vi" ? cur.detail.vi : cur.detail.en}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Academic Evaluation Metrics (with confirm disclaimer) */}
          {project.academicMetrics && (
            <div className="p-6 rounded-3xl border border-amber-500/30 bg-amber-950/15">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  {locale === "vi"
                    ? "CHỈ SỐ ĐÁNH GIÁ ĐỒ ÁN HỌC THUẬT"
                    : "ACADEMIC THESIS EVALUATION METRICS"}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-black font-mono text-amber-400">
                    {project.academicMetrics.accuracy}
                  </div>
                  <div className="text-xs text-zinc-400">Historical Accuracy</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-black font-mono text-white">
                    {project.academicMetrics.recall}
                  </div>
                  <div className="text-xs text-zinc-400">Emergency Recall</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-black font-mono text-amber-400">
                    {project.academicMetrics.observations}
                  </div>
                  <div className="text-xs text-zinc-400">Observations (2010-23)</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <div className="text-2xl font-black font-mono text-white">
                    {project.academicMetrics.stations} Stations
                  </div>
                  <div className="text-xs text-zinc-400">12 Provinces</div>
                </div>
              </div>

              {/* Required Academic Disclaimer */}
              <div className="text-xs text-amber-300/80 italic flex items-center gap-2">
                <span>ℹ</span>
                <span>
                  {locale === "vi"
                    ? project.academicMetrics.disclaimer.vi
                    : project.academicMetrics.disclaimer.en}
                </span>
              </div>
            </div>
          )}

          {/* Deep Narrative Sections: Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)]">
              <h4 className="text-sm font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3">
                {locale === "vi" ? "01 · BÀI TOÁN ĐẶT RA" : "01 · THE PROBLEM"}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === "vi" ? project.problem.vi : project.problem.en}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)]">
              <h4 className="text-sm font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3">
                {locale === "vi" ? "02 · GIẢI PHÁP KỸ THUẬT" : "02 · THE SOLUTION"}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === "vi" ? project.solution.vi : project.solution.en}
              </p>
            </div>
          </div>

          {/* Technical Architecture */}
          <div>
            <div className="p-6 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)]">
              <h4 className="text-sm font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-3">
                {locale === "vi" ? "03 · KIẾN TRÚC & TRIỂN KHAI" : "03 · ARCHITECTURE & IMPLEMENTATION"}
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {locale === "vi" ? project.architecture.vi : project.architecture.en}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
              {locale === "vi" ? "CÔNG NGHỆ ÁP DỤNG" : "TECHNOLOGY STACK"}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.extendedStack && project.extendedStack.confirm && (
                <span className="px-3 py-1 rounded-full border border-dashed border-[var(--border-strong)] text-xs font-mono text-[var(--text-tertiary)]">
                  + Extended Modules [Thesis Evaluated]
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
