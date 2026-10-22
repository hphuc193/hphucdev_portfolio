"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";
import { Compass, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DimensionalWarp() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.0012);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));

    // --- 1. HYPERSPACE PARTICLE TUNNEL ---
    const particleCount = isMobile ? 850 : 2400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorSky = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xf8fafc);
    const colorDeep = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount; i++) {
      // Cylinder tunnel distribution
      const radius = 60 + Math.random() * 260;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 1600;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(theta);
      positions[i * 3 + 2] = z;

      // Color variation between ice sky blue and diamond white
      const c = Math.random() > 0.4 ? colorSky : Math.random() > 0.5 ? colorWhite : colorDeep;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 1.5 + Math.random() * 3.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Point cloud material
    const pointMaterial = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, pointMaterial);
    scene.add(particles);

    // --- 2. CONCENTRIC DIMENSIONAL WARP RINGS ---
    const ringsGroup = new THREE.Group();
    const ringCount = isMobile ? 9 : 18;
    const ringGeometry = new THREE.TorusGeometry(140, 0.75, 8, isMobile ? 24 : 48);

    for (let i = 0; i < ringCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x38bdf8 : 0x7dd3fc,
        transparent: true,
        opacity: 0.12 + (i / ringCount) * 0.25,
        wireframe: true,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMat);
      ring.position.z = -700 + i * (isMobile ? 160 : 85);
      ring.scale.set(1 + i * 0.05, 1 + i * 0.05, 1);
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    // --- 3. FLOATING GEOMETRIC ARTIFACTS ---
    const artifactsGroup = new THREE.Group();
    const polyGeo = new THREE.IcosahedronGeometry(22, 0);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    for (let i = 0; i < (isMobile ? 3 : 6); i++) {
      const mesh = new THREE.Mesh(polyGeo, polyMat);
      const angle = (i / (isMobile ? 3 : 6)) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 180, Math.sin(angle) * 180, (i - 2) * 150);
      artifactsGroup.add(mesh);
    }
    scene.add(artifactsGroup);

    // --- MOUSE PARALLAX TRACKING (DESKTOP ONLY) ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 80;
      targetMouseY = -y * 80;
    };

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // --- GSAP SCROLLTRIGGER WARP SPEED DIVE ---
    const warpState = {
      speed: 1.0,
      cameraZ: 400,
      rotationZ: 0,
      fov: 65,
    };

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        // As user scrolls through section: accelerate into the wormhole
        const progress = self.progress; // 0 to 1
        warpState.cameraZ = 400 - progress * 950;
        warpState.rotationZ = progress * Math.PI * 2.5;
        warpState.speed = 1.0 + Math.sin(progress * Math.PI) * 5.0; // speed peaks in middle
        warpState.fov = 65 + Math.sin(progress * Math.PI) * 25; // dolly zoom distortion
      },
    });

    // --- ANIMATION LOOP (PAUSED WHEN OFF-SCREEN VIA INTERSECTIONOBSERVER) ---
    let animationFrameId = 0;
    let clock = new THREE.Clock();
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.position.z = warpState.cameraZ;
      camera.fov = warpState.fov;
      camera.updateProjectionMatrix();

      camera.lookAt(0, 0, warpState.cameraZ - 300);

      // Tunnel particle rotation & movement
      particles.rotation.z += 0.002 * warpState.speed;
      ringsGroup.rotation.z += 0.003 * warpState.speed;
      artifactsGroup.rotation.x += 0.005;
      artifactsGroup.rotation.y += 0.008;

      // Cycle ring positions to create endless tunnel illusion
      ringsGroup.children.forEach((ring) => {
        ring.rotation.z += 0.004;
      });

      renderer.render(scene, camera);
    };

    // Viewport IntersectionObserver to freeze WebGL loop when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        if (isVisible && !wasVisible) {
          clock.start();
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
          }
        } else if (!isVisible && wasVisible) {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = 0;
          }
        }
      },
      { rootMargin: "180px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (!isTouch) window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstance.kill();
      geometry.dispose();
      pointMaterial.dispose();
      ringGeometry.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] overflow-hidden bg-[#07080c] flex items-center justify-center my-8 select-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Top & Bottom Atmospheric Vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent z-10 pointer-events-none" />

      {/* Center Cinematic Scrollytelling Portal Header */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-[var(--border-strong)] text-[11px] font-mono text-[var(--accent-primary)] uppercase tracking-widest shadow-2xl">
          <Sparkles className="w-3.5 h-3.5 animate-spin duration-3000" />
          <span>{locale === "vi" ? "CHIỀU KHÔNG GIAN SỐ · 3D SCROLL WARP" : "DIMENSIONAL WARP · 3D SCROLL TRANSFORM"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">
          {locale === "vi" ? (
            <>
              Bước Qua Biên Giới <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-sky-200 to-[var(--accent-bright)]">
                Vào Không Gian Kiến Tạo.
              </span>
            </>
          ) : (
            <>
              Traversing Dimensions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-sky-200 to-[var(--accent-bright)]">
                Into the Builder Realm.
              </span>
            </>
          )}
        </h2>

        {/* Dynamic Velocity Telemetry Pill */}
        <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[var(--accent-primary)] animate-pulse" />
            WARP VECTOR: 0, 0, -1
          </span>
          <span>·</span>
          <span>SYSTEM DEPTH: 100% REAL</span>
          <span>·</span>
          <span>PARTICLES: 2,400+</span>
        </div>
      </div>
    </div>
  );
}
