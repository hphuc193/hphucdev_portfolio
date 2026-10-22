"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        const text = interactiveEl.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isClickable = target.closest("a, button, input, textarea, [role='button']");
        setIsHovered(!!isClickable);
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth lerp follower loop
  useEffect(() => {
    if (isTouchDevice) return;

    const followLoop = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      requestRef.current = requestAnimationFrame(followLoop);
    };

    requestRef.current = requestAnimationFrame(followLoop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Tiny sharp center dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 0 : 1})`,
        }}
      />

      {/* Smooth trailing ring with optional label */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          cursorText
            ? "w-20 h-20 bg-[var(--accent-primary)] text-black border-none"
            : isHovered
            ? "w-14 h-14 border border-[var(--accent-primary)] bg-[var(--accent-glow)] scale-110"
            : "w-8 h-8 border border-[var(--accent-primary)] opacity-70"
        }`}
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
