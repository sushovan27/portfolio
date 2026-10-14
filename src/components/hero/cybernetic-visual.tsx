"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CyberneticVisualProps {
  activeFocus: string;
  onFocusChange: (focusKey: string) => void;
}

export function CyberneticVisual({
  activeFocus,
  onFocusChange,
}: CyberneticVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformState, setTransformState] = useState({
    rotateX: 0,
    rotateY: 0,
    moveX: 0,
    moveY: 0,
    shadowX: 0,
    shadowScale: 1,
  });

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // 3D perspective rotations and spatial translations
      const rX = Math.max(-7, Math.min(7, -deltaY * 7));
      const rY = Math.max(-9, Math.min(9, deltaX * 9));
      const mX = Math.max(-12, Math.min(12, deltaX * 10));
      const mY = Math.max(-8, Math.min(8, deltaY * 7));

      setTransformState({
        rotateX: rX,
        rotateY: rY,
        moveX: mX,
        moveY: mY,
        shadowX: -mX * 0.45,
        shadowScale: 1 + Math.abs(deltaY) * 0.04,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hudNodes = [
    {
      id: "web",
      key: "hivetrace",
      label: "WEB ARCHITECTURE",
      code: "#01",
      top: "14%",
      right: "-10px",
      active: activeFocus === "hivetrace" || activeFocus === "web",
      zDepth: 45,
      svg: (
        <svg
          className="absolute -left-10 top-3 w-10 h-6 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <polyline
            className="hud-line"
            fill="none"
            points="40,3 10,3 0,16"
            stroke="#FF793D"
            strokeWidth="1.2"
          />
          <circle cx="0" cy="16" fill="#FF793D" r="2.5" />
        </svg>
      ),
    },
    {
      id: "forensics",
      key: "stegdetector",
      label: "AI & FORENSICS",
      code: "#02",
      top: "33%",
      left: "-16px",
      active: activeFocus === "stegdetector" || activeFocus === "forensics",
      zDepth: 55,
      svg: (
        <svg
          className="absolute -right-10 top-3 w-10 h-6 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <polyline
            className="hud-line"
            fill="none"
            points="0,3 25,3 36,16"
            stroke={
              activeFocus === "stegdetector" || activeFocus === "forensics"
                ? "#FF793D"
                : "#777A80"
            }
            strokeWidth="1.2"
          />
          <circle
            cx="36"
            cy="16"
            fill={
              activeFocus === "stegdetector" || activeFocus === "forensics"
                ? "#FF793D"
                : "#777A80"
            }
            r="2.5"
          />
        </svg>
      ),
    },
    {
      id: "crypto",
      key: "e2ee-messaging",
      label: "CRYPTOGRAPHY",
      code: "#03",
      bottom: "29%",
      right: "-12px",
      active: activeFocus === "e2ee-messaging" || activeFocus === "crypto",
      zDepth: 50,
      svg: (
        <svg
          className="absolute -left-12 top-3 w-12 h-6 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <polyline
            className="hud-line"
            fill="none"
            points="48,3 15,3 0,-8"
            stroke={
              activeFocus === "e2ee-messaging" || activeFocus === "crypto"
                ? "#FF793D"
                : "#777A80"
            }
            strokeWidth="1.2"
          />
          <circle
            cx="0"
            cy="-8"
            fill={
              activeFocus === "e2ee-messaging" || activeFocus === "crypto"
                ? "#FF793D"
                : "#777A80"
            }
            r="2.5"
          />
        </svg>
      ),
    },
    {
      id: "platform",
      key: "jyotirveda-gurukulam",
      label: "WEB PLATFORMS",
      code: "#04",
      bottom: "16%",
      left: "-10px",
      active:
        activeFocus === "jyotirveda-gurukulam" || activeFocus === "platform",
      zDepth: 40,
      svg: (
        <svg
          className="absolute -right-10 top-3 w-10 h-6 pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <polyline
            className="hud-line"
            fill="none"
            points="0,3 25,3 36,-10"
            stroke={
              activeFocus === "jyotirveda-gurukulam" ||
              activeFocus === "platform"
                ? "#FF793D"
                : "#777A80"
            }
            strokeWidth="1.2"
          />
          <circle
            cx="36"
            cy="-10"
            fill={
              activeFocus === "jyotirveda-gurukulam" ||
              activeFocus === "platform"
                ? "#FF793D"
                : "#777A80"
            }
            r="2.5"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[430px] mx-auto flex flex-col justify-end items-center h-full select-none"
      style={{ perspective: "1200px" }}
    >
      {/* 1. Backdrop Ambient Studio Rim Light (Gives 3D depth against background) */}
      <div
        className="absolute top-1/4 w-[360px] md:w-[420px] h-[360px] md:h-[420px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 121, 61, 0.11) 0%, rgba(255, 121, 61, 0.03) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* 2. 3D Holographic Pedestal / Ground Projection Calibration Plane */}
      <div
        className="absolute bottom-1 w-[380px] h-[130px] pointer-events-none flex items-center justify-center -z-10"
        style={{
          transform: "perspective(600px) rotateX(68deg)",
          transformStyle: "preserve-3d",
        }}
        aria-hidden="true"
      >
        {/* Outer concentric dashed ring */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-border-subtle/70 hud-line" />
        {/* Mid amber target circle */}
        <div className="absolute w-[260px] h-[260px] rounded-full border border-accent-amber/35" />
        {/* Center core target */}
        <div className="absolute w-[140px] h-[140px] rounded-full border border-border-subtle" />
        {/* Subtle radial ground illumination */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 121, 61, 0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* 3. Multi-Layer Realistic 3D Ground Contact Shadows */}
      {/* Tight ambient occlusion shadow */}
      <div
        className="absolute bottom-2 w-[280px] md:w-[320px] h-6 rounded-full pointer-events-none transition-transform duration-200"
        style={{
          background:
            "radial-gradient(50% 50%, rgba(17, 19, 23, 0.55) 0%, rgba(23, 24, 27, 0.25) 50%, transparent 80%)",
          filter: "blur(4px)",
          transform: `translate3d(${transformState.shadowX}px, 4px, 0) scale(${transformState.shadowScale})`,
        }}
        aria-hidden="true"
      />
      {/* Broad penumbra floor shadow */}
      <div
        className="absolute bottom-1 w-[360px] md:w-[410px] h-10 rounded-full pointer-events-none transition-transform duration-200"
        style={{
          background:
            "radial-gradient(60% 50%, rgba(17, 19, 23, 0.25) 0%, rgba(23, 24, 27, 0.1) 45%, transparent 75%)",
          filter: "blur(10px)",
          transform: `translate3d(${transformState.shadowX * 1.3}px, 6px, 0) scale(${transformState.shadowScale * 1.05})`,
        }}
        aria-hidden="true"
      />

      {/* 4. 3D Cybernetic Sculpture (Bust image seamlessly merged with #F3F2EF) */}
      <div
        className="relative w-full flex items-end justify-center pointer-events-auto transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1200px) rotateX(${transformState.rotateX}deg) rotateY(${transformState.rotateY}deg) translate3d(${transformState.moveX}px, ${transformState.moveY}px, 0px)`,
        }}
      >
        <div
          className="relative w-full flex items-end justify-center"
          style={{
            // Mask gradient guarantees 100% feathering at the bottom base into the contact shadow
            WebkitMaskImage:
              "linear-gradient(to bottom, black 86%, rgba(0,0,0,0.4) 95%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 86%, rgba(0,0,0,0.4) 95%, transparent 100%)",
          }}
        >
          <Image
            src="/images/cyber-bust.png"
            alt="Cybernetic robotics bust centerpiece"
            width={896}
            height={1200}
            priority
            className="bust-blend block w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[410px] h-auto max-h-[580px] lg:max-h-[640px] object-contain object-bottom select-none pointer-events-none"
            style={{
              mixBlendMode: "multiply",
              filter:
                "drop-shadow(0 24px 34px rgba(17, 19, 23, 0.18)) contrast(1.04)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          />
        </div>

        {/* 5. 4 Interactive 3D Floating HUD Nodes in Stereoscopic Z-Space */}
        {hudNodes.map((node) => {
          const nodeStyle: React.CSSProperties = {
            position: "absolute",
            top: node.top,
            bottom: node.bottom,
            left: node.left,
            right: node.right,
            transformStyle: "preserve-3d",
            transform: `translateZ(${node.zDepth}px)`,
          };

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onFocusChange(node.key)}
              style={nodeStyle}
              className={`hud-node pointer-events-auto cursor-pointer group text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                node.active ? "scale-105" : "hover:scale-102"
              }`}
              aria-label={`Select ${node.label} focus`}
            >
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded border shadow-xs transition-all duration-200 ${
                  node.active
                    ? "bg-white border-accent-amber shadow-md"
                    : "bg-white/95 backdrop-blur-md border-border-subtle group-hover:border-accent-amber/70"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    node.active
                      ? "bg-accent-amber animate-pulse"
                      : "bg-surface-dark group-hover:bg-accent-amber"
                  }`}
                />
                <span className="font-mono text-[10px] font-semibold tracking-wider text-text-primary uppercase">
                  {node.label}
                </span>
                <span className="font-mono text-[9px] text-text-muted">
                  {node.code}
                </span>
              </div>
              {node.svg}
            </button>
          );
        })}
      </div>
    </div>
  );
}
