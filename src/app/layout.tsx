import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HOANGPHUC (Lê Công Hoàng Phúc) — Software & Mobile Engineer",
  description:
    "Official portfolio of HOANGPHUC (Hoàng Phúc), Software & Mobile Engineer based in Ho Chi Minh City, Vietnam. Specializing in Flutter, Kotlin Android, SwiftUI, backend microservices, and AI-powered software.",
  keywords: [
    "HOANGPHUC",
    "Hoàng Phúc",
    "Lê Công Hoàng Phúc",
    "Software Engineer",
    "Mobile Engineer",
    "Flutter Developer",
    "Android Kotlin",
    "SwiftUI",
    "AI Software",
    "Ho Chi Minh City",
    "Portfolio",
  ],
  authors: [{ name: "HOANGPHUC", url: "https://github.com/hphuc193" }],
  creator: "HOANGPHUC",
  openGraph: {
    title: "HOANGPHUC — Software & Mobile Engineer",
    description:
      "Crafting thoughtful mobile applications and AI-powered software products with Flutter, Kotlin, SwiftUI, and scalable backends.",
    url: "https://github.com/hphuc193",
    siteName: "HOANGPHUC Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOANGPHUC — Software & Mobile Engineer",
    description: "Mobile Applications · AI-Powered Software · Full-stack Engineering",
    creator: "@Hphuc193",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} ${syne.variable} h-full antialiased`}
    >
      <head>
        {/* Anti-flicker inline script for instant theme application */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('hoangphuc_portfolio_theme');
                  var theme = storedTheme || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* JSON-LD Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "HOANGPHUC",
              alternateName: "Lê Công Hoàng Phúc",
              jobTitle: "Software & Mobile Engineer",
              email: "phuc07134@gmail.com",
              url: "https://github.com/hphuc193",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ho Chi Minh City",
                addressCountry: "VN",
              },
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "University of Management and Technology (UMT)",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "Universitas Negeri Jakarta (UNJ)",
                },
              ],
              sameAs: [
                "https://github.com/hphuc193",
                "https://www.linkedin.com/in/hphucit193",
                "https://dev.to/hphuc193",
                "https://x.com/Hphuc193",
                "https://www.instagram.com/hphuc_193/",
                "https://www.facebook.com/hoang.phuc.226590/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-[var(--accent-primary)] selection:text-black">
        <PortfolioProvider>
          <SmoothScrollProvider>
            {/* Subtle noise grain texture */}
            <div className="grain-overlay" />
            <ScrollProgressBar />
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
