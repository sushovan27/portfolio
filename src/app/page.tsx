import React from "react";
import { SiteHeader } from "../components/layout/site-header";
import { HeroSection } from "../components/hero/hero-section";
import { ProjectShowcase } from "../components/projects/project-showcase";
import { CapabilityMap } from "../components/toolkit/capability-map";
import { AboutSection } from "../components/about/about-section";
import { ContactSection } from "../components/contact/contact-section";
import { CyberTerminal } from "../components/ui/cyber-terminal";
import { PortfolioInteractionProvider } from "../components/portfolio/interaction-context";
import { CommandPalette } from "../components/portfolio/command-palette";

export default function HomePage() {
  return (
    <PortfolioInteractionProvider>
    <div className="min-h-screen bg-surface flex flex-col selection:bg-accent-amber selection:text-white">
      {/* Floating Header */}
      <SiteHeader />

      {/* Main Content Landmark */}
      <main className="min-w-0 flex-1 flex flex-col">
        {/* 1. Cinematic Cyber-Editorial Hero with Centerpiece */}
        <HeroSection />

        {/* 2. Verified Project Engineering Showcase */}
        <ProjectShowcase />

        {/* 3. Interactive Technical Capability Map */}
        <CapabilityMap />

        {/* 4. Academic Grounding & Current Explorations */}
        <AboutSection />
      </main>

      {/* 5. Obsidian Contact & Footer */}
      <ContactSection />

      {/* 6. Interactive Cybernetic Systems Console */}
      <CyberTerminal />
      <CommandPalette />
    </div>
    </PortfolioInteractionProvider>
  );
}
