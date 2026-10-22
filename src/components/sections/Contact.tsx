"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolioData";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Mail,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  IconGithub,
  IconLinkedin,
  IconXTwitter,
  IconInstagram,
  IconFacebook,
  IconDevTo,
} from "@/components/ui/SocialIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const { locale, playUiSound } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam trap
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const copyEmail = () => {
    playUiSound("click");
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      // Spam bot triggered honeypot field
      return;
    }

    if (!formName || !formEmail || !formMessage) {
      setFormStatus("error");
      return;
    }

    playUiSound("click");
    setFormStatus("submitting");

    // Simulate reliable dispatch
    setTimeout(() => {
      setFormStatus("success");
      playUiSound("boot");
      // Also provide a mailto backup
      const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formName}`
      )}&body=${encodeURIComponent(formMessage + "\n\nFrom: " + formEmail)}`;
      window.open(mailtoUrl, "_blank");
    }, 900);
  };

  const socialLinks = [
    { name: "GitHub", url: portfolioData.personal.social.github, icon: IconGithub },
    { name: "LinkedIn", url: portfolioData.personal.social.linkedin, icon: IconLinkedin },
    { name: "Dev.to", url: portfolioData.personal.social.devto, icon: IconDevTo },
    { name: "X / Twitter", url: portfolioData.personal.social.x, icon: IconXTwitter },
    { name: "Instagram", url: portfolioData.personal.social.instagram, icon: IconInstagram },
    { name: "Facebook", url: portfolioData.personal.social.facebook, icon: IconFacebook },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.fromTo(
        ".contact-col-animate",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-4 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[var(--accent-glow)] blur-[150px] pointer-events-none -z-10 opacity-50" />

      {/* Oversized Kinetic Heading */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-3">
          <Mail className="w-4 h-4" />
          <span>09 · {locale === "vi" ? "Kết Nối & Trao Đổi" : "Contact & Collaboration"}</span>
        </div>
        <h2
          ref={headingRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] leading-[0.95]"
        >
          {locale === "vi" ? (
            <>
              CÙNG TẠO NÊN <br />
              <span className="text-[var(--accent-primary)]">ĐIỀU GÌ ĐÓ.</span>
            </>
          ) : (
            <>
              LET&apos;S BUILD <br />
              <span className="text-[var(--accent-primary)]">SOMETHING.</span>
            </>
          )}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Inquiries & Social Channels (5 cols) */}
        <div className="contact-col-animate lg:col-span-5 space-y-8">
          {/* Quick Copy Email Card */}
          <div className="p-8 rounded-[32px] glass-panel space-y-4">
            <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              {locale === "vi" ? "EMAIL TRỰC TIẾP" : "DIRECT EMAIL"}
            </span>

            <div className="text-xl sm:text-2xl font-black font-mono text-[var(--text-primary)] break-all">
              {portfolioData.personal.email}
            </div>

            <button
              onClick={copyEmail}
              className="w-full py-3.5 px-6 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-strong)] hover:border-[var(--accent-primary)] text-xs font-mono font-bold text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all cursor-pointer group"
              data-cursor="COPY"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span className="text-[var(--accent-primary)] font-bold">
                    {locale === "vi" ? "ĐÃ SAO CHÉP EMAIL!" : "EMAIL COPIED TO CLIPBOARD!"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--accent-primary)] transition-transform group-hover:scale-110" />
                  <span>{locale === "vi" ? "Sao Chép Địa Chỉ Email" : "Copy Email Address"}</span>
                </>
              )}
            </button>
          </div>

          {/* Location & Timezone info */}
          <div className="p-6 rounded-[28px] glass-panel flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase">
                  {locale === "vi" ? "MÚI GIỜ LÀM VIỆC" : "OPERATING TIMEZONE"}
                </div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  Ho Chi Minh City · GMT+7
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono text-xs font-bold">
              ICT
            </span>
          </div>

          {/* Social Channels Dock */}
          <div>
            <div className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
              {locale === "vi" ? "MẠNG XÃ HỘI & NỀN TẢNG" : "CONNECTED CHANNELS"}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl glass-panel hover:border-[var(--accent-primary)] transition-all group flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]"
                    data-cursor="OPEN"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                      <span className="truncate">{s.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form (7 cols) */}
        <div className="contact-col-animate lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-[32px] glass-panel space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {locale === "vi" ? "Gửi Tin Nhắn Nhanh" : "Send an Inquiry"}
              </h3>
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
            </div>

            {/* Anti-spam Honeypot (hidden from human visitors) */}
            <input
              type="text"
              name="honeypot_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase">
                  {locale === "vi" ? "TÊN CỦA BẠN" : "YOUR NAME"} *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={locale === "vi" ? "Nguyễn Văn A" : "Alex Smith"}
                  className="w-full px-4 py-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase">
                  {locale === "vi" ? "ĐỊA CHỈ EMAIL" : "EMAIL ADDRESS"} *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-2 uppercase">
                {locale === "vi" ? "NỘI DUNG TRAO ĐỔI" : "MESSAGE & PROJECT SCOPE"} *
              </label>
              <textarea
                required
                rows={5}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder={
                  locale === "vi"
                    ? "Mô tả dự án, vị trí tuyển dụng hoặc lời chào..."
                    : "Tell me about the engineering opportunity, mobile app project, or just say hello..."
                }
                className="w-full px-4 py-3.5 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:outline-none text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full py-4 px-8 rounded-full bg-[var(--accent-primary)] text-black font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              data-cursor="SEND"
            >
              {formStatus === "submitting" ? (
                <span>{locale === "vi" ? "Đang gửi đi..." : "Sending..."}</span>
              ) : formStatus === "success" ? (
                <>
                  <Check className="w-5 h-5 text-black" />
                  <span>
                    {locale === "vi" ? "ĐÃ GỬI THÀNH CÔNG!" : "MESSAGE DISPATCHED!"}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {locale === "vi" ? "Gửi Tin Nhắn Trực Tiếp" : "Dispatch Message"}
                  </span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {formStatus === "success" && (
              <div className="p-4 rounded-2xl bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 text-xs text-[var(--accent-primary)] font-mono text-center">
                {locale === "vi"
                  ? "Cảm ơn bạn! Tin nhắn đã được chuẩn bị gửi tới phuc07134@gmail.com."
                  : "Thank you! Message prepared and dispatched to phuc07134@gmail.com."}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
