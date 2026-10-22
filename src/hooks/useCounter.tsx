"use client";

import { useEffect, useState, useRef } from "react";

export function useCounter(end: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // Easing out cubic: 1 - pow(1 - progress, 3)
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, trigger]);

  return count;
}

export function CounterBadge({
  value,
  suffix = "",
  duration = 1800,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useCounter(value, duration, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
