"use client";

import React from "react";
import { ArrowRight, Mail, Terminal, ExternalLink } from "lucide-react";
import { CyberneticVisual } from "./cybernetic-visual";
import { TechnicalPanel, ProjectSpec } from "./technical-panel";
import projectsData from "../../content/projects.json";
import { usePortfolioInteraction } from "../portfolio/interaction-context";

export function HeroSection() {
  const featuredProjects: ProjectSpec[] = (projectsData as ProjectSpec[]).filter((project) => project.featured);
  const { selectedProjectSlug, selectProject } = usePortfolioInteraction();

  const currentProject =
    (projectsData as ProjectSpec[]).find((p) => p.slug === selectedProjectSlug) ||
    featuredProjects[0];

  const handleFocusChange = (key: string) => {
    // Map HUD shortcuts to matching projects
    const map: Record<string, string> = {
      web: "hivetrace",
      forensics: "stegdetector",
      crypto: "e2ee-messaging",
      platform: "jyotirveda-gurukulam",
    };
    const target = map[key] || key;
    if (projectsData.some((project) => project.slug === target)) {
      selectProject(target);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[780px] lg:min-h-[860px] overflow-hidden flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-16 border-b border-border-subtle grid-lines-bg"
    >
      {/* Architectural Subtle Overlay Guides (Desktop) */}
      <div
        className="absolute inset-0 pointer-events-none max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-12 gap-6 z-0 opacity-20 hidden lg:grid"
        aria-hidden="true"
      >
        <div className="col-span-4 border-r border-border-subtle h-full" />
        <div className="col-span-4 border-r border-border-subtle h-full" />
        <div className="col-span-4 h-full" />
      </div>

      {/* Main 3-Column Hero Grid */}
      <div className="relative z-10 max-w-[1440px] w-full min-w-0 mx-auto grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 h-full items-stretch">
        {/* LEFT COLUMN: Identity, Typography, CTAs, and Selected Project Rail */}
        <div className="col-span-1 min-w-0 lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-2 z-20">
          <div>
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded bg-white/85 border border-border-subtle shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              <span className="font-mono text-[10.5px] text-text-muted tracking-wider uppercase font-medium">
                CSE STUDENT · BUILDER · RKMGEC
              </span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display text-[46px] sm:text-[62px] xl:text-[80px] leading-[0.92] font-bold tracking-tight text-text-primary mb-4 select-none">
              Sushovan
              <br />
              Halder<span className="text-accent-amber">.</span>
            </h1>

            {/* Primary Manifesto Statement */}
            <p className="font-display text-lg sm:text-xl text-text-primary font-medium leading-snug mb-2.5 max-w-lg">
              I build, break down, and improve ideas through code.
            </p>

            {/* Supporting Context */}
            <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed max-w-md mb-6">
              Computer Science and Engineering student at RKMGEC, learning by building
              practical projects across web engineering, Linux systems, automation, and
              security-minded software.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="tech-bracket group inline-flex items-center gap-2.5 px-6 py-3 bg-surface-dark text-white rounded-sm font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-black hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 text-accent-amber group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 border border-border-subtle bg-white/80 hover:bg-white text-text-primary rounded-sm font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <Mail className="w-3.5 h-3.5 text-text-muted" />
                <span>GET IN TOUCH</span>
              </a>
            </div>
          </div>

          {/* Hero Bottom: Interactive Project Index Rail */}
          <div className="pt-6 mt-6 lg:mt-auto border-t border-border-subtle/80">
            <div className="flex items-center justify-between pb-2 mb-2">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-amber inline-block" />
                Selected Project Index
              </span>
              <span className="font-mono text-[10px] text-text-muted">
                {featuredProjects.length} Verified Units
              </span>
            </div>

            <div className="space-y-1.5">
              {featuredProjects.map((project) => {
                const isSelected = project.slug === selectedProjectSlug;
                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => selectProject(project.slug)}
                    className={`w-full text-left p-2.5 rounded flex items-center justify-between transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                      isSelected
                        ? "border-l-[3px] border-l-accent-amber bg-white shadow-2xs"
                        : "border-l-[3px] border-l-transparent hover:bg-white/70"
                    }`}
                  >
                    <div>
                      <span className="font-display font-semibold text-xs sm:text-sm text-text-primary block">
                        {project.name}
                      </span>
                      <span
                        className="font-mono text-[10px] text-text-muted block truncate max-w-[280px]"
                        title={project.summary}
                      >
                        {project.category}
                      </span>
                    </div>
                    {isSelected ? (
                      <ArrowRight className="w-4 h-4 text-accent-amber flex-shrink-0 ml-2" />
                    ) : (
                      <span className="font-mono text-[10px] text-text-muted uppercase flex-shrink-0 ml-2">
                        View
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Cybernetic Sculpture Bust & Crosshairs */}
        <div className="col-span-1 min-w-0 lg:col-span-4 relative flex flex-col justify-end items-center min-h-[380px] lg:h-full select-none order-last lg:order-none">
          <CyberneticVisual
            activeFocus={selectedProjectSlug}
            onFocusChange={handleFocusChange}
          />
        </div>

        {/* RIGHT COLUMN: Telemetry & Project Inspector (Desktop/Tablet) */}
        <div className="col-span-1 min-w-0 lg:col-span-3 hidden md:flex flex-col justify-between h-full pl-0 lg:pl-2 z-20">
          <TechnicalPanel currentProject={currentProject} />
        </div>
      </div>
    </section>
  );
}
