import React from "react";
import { TelemetryPanel } from "./components/telemetry-panel";
import { SkillsSection } from "./components/skills-section";
import { ProjectCards } from "./components/project-cards";
import { aboutSection } from "./components/about-section";
import { contactSection } from "./components/contact-section";
import "./app/globals.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      <header className="sticky top-0 z-20 bg-white border-b border-border-subtle">
        <nav className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-surface border border-border-subtle flex items-center justify-center">
              <span className="text-text-primary font-mono font-bold">SH</span>
            </div>
            <span className="text-lg font-bold text-text-primary">Sushovan Halder</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs">
            <a href="#work" className="text-text-muted hover:text-accent-amber transition-colors">Work</a>
            <a href="#skills" className="text-text-muted hover:text-accent-amber transition-colors">Skills</a>
            <a href="#about" className="text-text-muted hover:text-accent-amber transition-colors">About</a>
            <a href="#contact" className="text-text-muted hover:text-accent-amber transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      <section className="relative py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight mb-4">
            I build, break down, and improve ideas through code.
          </h1>
          <p className="text-base text-text-muted max-w-2xl mx-auto mb-8">
            Computer Science and Engineering student at RKMGEC exploring software, systems, and the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/sushovanbuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent-amber px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e86b32]"
            >
              EXPLORE PROJECTS
            </a>
            <a
              href="mailto:sushovanhalderofficial@gmail.com"
              className="rounded-md bg-white border border-border-subtle px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>

        <div className="mt-12 max-w-md mx-auto">
          <TelemetryPanel />
        </div>
      </section>

      <section id="work" className="py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <ProjectCards />
        </div>
      </section>

      <section id="skills" className="py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <SkillsSection />
        </div>
      </section>

      <section id="about" className="py-12 border-t border-border-subtle bg-surface-paper">
        <div className="max-w-7xl mx-auto px-6">
          {aboutSection()}
        </div>
      </section>

      <section id="contact" className="py-12 border-t border-border-subtle">
        <div className="max-w-xl mx-auto px-6">
          {contactSection()}
        </div>
      </section>
    </main>
  );
}