"use client";

import React, { useEffect, useRef, useState } from "react";

interface VelocityMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export function VelocityMarquee({
  children,
  baseVelocity = 1.2,
  className = "",
}: VelocityMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(1);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // Accelerate velocity on scroll
      velocityRef.current = 1 + Math.min(Math.abs(delta) * 0.12, 6);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        velocityRef.current = 1;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let currentPos = 0;
    const animate = () => {
      currentPos -= baseVelocity * velocityRef.current;
      if (currentPos <= -50) {
        currentPos = 0;
      }
      setOffset(currentPos);
      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [baseVelocity]);

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className="inline-flex items-center gap-8 will-change-transform"
        style={{ transform: `translate3d(${offset}%, 0, 0)` }}
      >
        <div className="flex items-center gap-8 shrink-0">{children}</div>
        <div className="flex items-center gap-8 shrink-0">{children}</div>
        <div className="flex items-center gap-8 shrink-0">{children}</div>
      </div>
    </div>
  );
}
