"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";
import { GitBranch, GitCommit, Star, ExternalLink, Activity } from "lucide-react";
import { IconGithub } from "@/components/ui/SocialIcons";
import fallbackContributionsData from "@/data/githubContributions.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GitHubUserStats {
  publicRepos: number;
  followers: number;
  avatarUrl: string;
  languages: { [key: string]: number };
  recentRepos: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    url: string;
    updatedAt: string;
  }[];
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function GitHubRadar() {
  const { locale } = usePortfolio();
  const [stats, setStats] = useState<GitHubUserStats>({
    publicRepos: 31,
    followers: 2,
    avatarUrl: "https://avatars.githubusercontent.com/u/108506041",
    languages: {
      Dart: 34,
      Kotlin: 22,
      Python: 18,
      JavaScript: 12,
      "C#": 8,
      Swift: 6,
    },
    recentRepos: [
      {
        name: "flood-warning-backend",
        description: "Backend microservice for AI Flood Early Warning System (Node.js, PostgreSQL, Docker)",
        language: "JavaScript",
        stars: 0,
        url: "https://github.com/hphuc193/flood-warning-backend",
        updatedAt: "2025",
      },
      {
        name: "cinema_ticket_tmovie",
        description: "Flutter mobile movie ticketing application with PayPal Sandbox & Firebase",
        language: "Dart",
        stars: 0,
        url: "https://github.com/hphuc193/cinema_ticket_tmovie",
        updatedAt: "2025",
      },
      {
        name: "XRayPrediction",
        description: "Chest X-ray prediction prototype in Python & Streamlit",
        language: "Python",
        stars: 0,
        url: "https://github.com/hphuc193/XRayPrediction",
        updatedAt: "2025",
      },
      {
        name: "Project_Hottel",
        description: "Hotel booking and management application built in Kotlin",
        language: "Kotlin",
        stars: 0,
        url: "https://github.com/hphuc193/Project_Hottel",
        updatedAt: "2024",
      },
      {
        name: "Hotelsys",
        description: "Hotel administrative reservation portal",
        language: "JavaScript",
        stars: 0,
        url: "https://github.com/hphuc193/Hotelsys",
        updatedAt: "2024",
      },
      {
        name: "MobileFrontend",
        description: "Cross-platform mobile UI experiments and components",
        language: "Dart",
        stars: 0,
        url: "https://github.com/hphuc193/MobileFrontend",
        updatedAt: "2024",
      },
    ],
  });

  const [contributions, setContributions] = useState<ContributionDay[]>(
    fallbackContributionsData.contributions as ContributionDay[]
  );
  const [totalContributions, setTotalContributions] = useState<number>(
    fallbackContributionsData.total?.lastYear || 274
  );

  const [loading, setLoading] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true);

        // 1. Fetch real contributions matrix from GitHub calendar
        try {
          const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/hphuc193?y=last");
          if (contribRes.ok) {
            const contribData = await contribRes.json();
            if (contribData?.contributions && Array.isArray(contribData.contributions)) {
              setContributions(contribData.contributions);
              if (contribData.total?.lastYear) {
                setTotalContributions(contribData.total.lastYear);
              }
            }
          }
        } catch (contribErr) {
          console.warn("Using real verified GitHub contribution fallback data:", contribErr);
        }

        // 2. Fetch user profile from GitHub API v3
        const userRes = await fetch("https://api.github.com/users/hphuc193");
        if (!userRes.ok) throw new Error("Rate limit / Network error");
        const userData = await userRes.json();

        const reposRes = await fetch(
          "https://api.github.com/users/hphuc193/repos?per_page=30&sort=updated"
        );
        if (!reposRes.ok) throw new Error("Rate limit on repos");
        const reposData = await reposRes.json();

        // Calculate language counts
        const langMap: { [key: string]: number } = {};
        reposData.forEach((r: { language: string | null }) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
          }
        });

        const formattedRepos = reposData.slice(0, 6).map((r: { name: string; description: string | null; language: string | null; stargazers_count: number; html_url: string; updated_at: string }) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          url: r.html_url,
          updatedAt: new Date(r.updated_at).toLocaleDateString(),
        }));

        setStats({
          publicRepos: userData.public_repos || 31,
          followers: userData.followers || 0,
          avatarUrl: userData.avatar_url || stats.avatarUrl,
          languages: langMap,
          recentRepos: formattedRepos,
        });
        setIsLiveApi(true);
      } catch {
        // Graceful fallback to verified metrics
        setIsLiveApi(false);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".github-animate-card",
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <IconGithub className="w-4 h-4" />
          <span>09 · {locale === "vi" ? "Mã Nguồn Mở & GitHub" : "Open Source & GitHub Telemetry"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === "vi" ? "Chỉ Số Hoạt Động Thật." : "Live GitHub Stream."}
          </h2>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveApi ? "bg-[var(--accent-primary)] animate-pulse" : "bg-sky-400"
              }`}
            />
            <span>
              {isLiveApi
                ? `LIVE GITHUB API (hphuc193) · ${totalContributions} CONTRIBUTIONS`
                : `VERIFIED GITHUB TELEMETRY (hphuc193) · ${totalContributions} CONTRIBUTIONS`}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Summary Metrics & Heatmap (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Stats Pill Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="github-animate-card p-6 rounded-2xl glass-panel text-center">
              <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--accent-primary)]">
                {stats.publicRepos}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Public Repositories</div>
            </div>

            <div className="github-animate-card p-6 rounded-2xl glass-panel text-center">
              <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--accent-primary)]">
                {totalContributions}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                {locale === "vi" ? "Đóng Góp Trong Năm" : "Annual Contributions"}
              </div>
            </div>

            <div className="github-animate-card p-6 rounded-2xl glass-panel text-center col-span-2 sm:col-span-1">
              <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--text-primary)]">
                6+
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Languages Used</div>
            </div>
          </div>

          {/* Activity Matrix / Real GitHub Calendar Heatmap */}
          <div className="github-animate-card p-6 rounded-[28px] glass-panel">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)] uppercase">
                <Activity className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>
                  {locale === "vi" ? "Ma Trận Đóng Góp Thật (GitHub Calendar)" : "Real Contribution Matrix"}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--accent-primary)] font-bold">
                {totalContributions} {locale === "vi" ? "hoạt động năm qua" : "contributions in last year"}
              </span>
            </div>

            {/* Real Heatmap Grid: 7 rows (Sunday - Saturday) for all 52 weeks */}
            <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2 scrollbar-thin [-webkit-overflow-scrolling:touch]">
              {contributions.slice(-364).map((day, i) => (
                <div
                  key={day.date || i}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={`w-3 h-3 rounded-sm transition-transform hover:scale-125 cursor-pointer ${
                    day.level === 4
                      ? "bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]"
                      : day.level === 3
                      ? "bg-[var(--accent-primary)]/85"
                      : day.level === 2
                      ? "bg-[var(--accent-primary)]/60"
                      : day.level === 1
                      ? "bg-[var(--accent-primary)]/30"
                      : "bg-[var(--border-color)]"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-tertiary)] mt-3 pt-3 border-t border-[var(--border-color)]">
              <span>{locale === "vi" ? "Ít hơn" : "Less"}</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[var(--border-color)]" title="0" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent-primary)]/30" title="1-3" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent-primary)]/60" title="4-6" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent-primary)]/85" title="7-9" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[var(--accent-primary)] shadow-[0_0_6px_var(--accent-glow)]" title="10+" />
              </div>
              <span>{locale === "vi" ? "Nhiều hơn" : "More"}</span>
            </div>
          </div>

          {/* Languages Breakdown */}
          <div className="github-animate-card p-6 rounded-[28px] glass-panel">
            <div className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase mb-4">
              {locale === "vi" ? "Phân Bố Ngôn Ngữ Chính" : "Primary Languages Distribution"}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.languages).map(([lang, count]) => (
                <div
                  key={lang}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-color)] flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                  <span className="font-bold">{lang}</span>
                  <span className="text-[var(--text-tertiary)]">({count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Repository Stream Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
            {locale === "vi" ? "DANH SÁCH REPO NỔI BẬT" : "FEATURED REPOSITORIES"}
          </div>

          {stats.recentRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-animate-card p-4 rounded-2xl glass-panel hover:border-[var(--accent-primary)] transition-all group block"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] flex items-center gap-1.5 truncate">
                  <GitBranch className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  {repo.name}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]" />
              </div>

              {repo.description && (
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mb-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-tertiary)]">
                {repo.language && (
                  <span className="text-[var(--text-secondary)]">{repo.language}</span>
                )}
                <span>·</span>
                <span>github.com/hphuc193</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
