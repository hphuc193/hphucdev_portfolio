"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789_#*~+<>[]";

export function useTextScramble(text: string, enabled: boolean = true) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length * 2.5;

    const animate = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration / 2.5) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration <= maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [text]);

  useEffect(() => {
    if (enabled) {
      trigger();
    } else {
      setDisplayText(text);
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, enabled, trigger]);

  return { displayText, trigger };
}

export function ScrambleText({
  text,
  className = "",
  triggerOnHover = true,
}: {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}) {
  const { displayText, trigger } = useTextScramble(text);

  return (
    <span
      className={className}
      onMouseEnter={triggerOnHover ? trigger : undefined}
    >
      {displayText}
    </span>
  );
}
