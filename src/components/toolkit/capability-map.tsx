"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import skillsData from "../../content/skills.json";
import projectsData from "../../content/projects.json";
import { usePortfolioInteraction } from "../portfolio/interaction-context";

export function CapabilityMap() {
  const { selectedSkillId, selectedProjectSlug, selectSkill, selectProject } = usePortfolioInteraction();

  const currentSkill =
    skillsData.find((s) => s.id === selectedSkillId) || skillsData[0];

  const matchedProjects = projectsData.filter((p) =>
    currentSkill.projectSlugs.includes(p.slug)
  );
  const selectedProject = projectsData.find((project) => project.slug === selectedProjectSlug);
  const relatedSkills = skillsData.filter((skill) => skill.projectSlugs.includes(selectedProjectSlug));

  return (
    <section
      id="toolkit"
      className="w-full min-w-0 py-20 lg:py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-border-subtle"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2.5 font-mono text-xs text-text-muted uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
            <span>03 // Interactive Technical Toolkit</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Capability Map<span className="text-accent-amber">.</span>
          </h2>
          <p className="text-sm md:text-base text-text-muted mt-2 max-w-2xl leading-relaxed">
            Skills mapped directly to verified code, developer workflows, and architecture.
            No inflated claims, percentage bars, or arbitrary skill meters.
          </p>
        </div>

        <div className="inline-flex items-center gap-4 text-xs font-mono text-text-muted flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Demonstrated in Project
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-amber"></span>
            Active Exploration
          </span>
        </div>
      </div>

      {/* Mobile/Tablet Compact Category Tab Strip */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {skillsData.map((skill) => {
          const isSelected = skill.id === selectedSkillId;
          const isRelated = skill.projectSlugs.includes(selectedProjectSlug);
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => selectSkill(skill.id)}
              aria-pressed={isSelected}
              aria-label={`${skill.name}${isRelated ? `, linked to ${selectedProject?.name}` : ""}`}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-mono text-xs font-medium transition-all duration-150 border focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                isSelected
                  ? "bg-surface-dark text-white border-surface-dark shadow-xs"
                  : isRelated
                  ? "bg-white text-text-primary border-emerald-500/60"
                  : "bg-white text-text-muted border-border-subtle hover:text-text-primary hover:border-text-primary/40"
              }`}
            >
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Category Selector & Evidence Deck */}
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
        {/* Left: Domain Category Cards (Desktop) */}
        <div className="hidden lg:flex lg:flex-col lg:col-span-4 space-y-3">
          {skillsData.map((skill) => {
            const isSelected = skill.id === selectedSkillId;
            const isRelatedToProject = Boolean(selectedProject && skill.projectSlugs.includes(selectedProject.slug));
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => selectSkill(skill.id)}
                aria-pressed={isSelected}
                className={`w-full text-left p-4 sm:p-4.5 rounded-xl border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring group ${
                  isSelected
                    ? "bg-white border-accent-amber shadow-sm translate-x-1"
                    : isRelatedToProject
                    ? "bg-white border-emerald-500/60 hover:border-emerald-600"
                    : "bg-surface-paper border-border-subtle hover:border-text-primary/30 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-semibold text-base text-text-primary group-hover:text-black transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface border border-border-subtle text-text-muted">
                    {skill.status.replace(/-/g, " ")}
                  </span>
                </div>
                {isRelatedToProject && (
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-wider text-emerald-700">
                    Linked to {selectedProject?.name}
                  </span>
                )}
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-2 font-sans">
                  {skill.description}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted/80 pt-2 border-t border-border-subtle/60">
                  <span className="text-accent-amber uppercase tracking-wider text-[10px] font-semibold">
                    {skill.category || "Domain"}
                  </span>
                  <span>{skill.skills ? skill.skills.length : skill.technologies.length} Tooling Items</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Evidence Inspection Deck */}
        <div className="col-span-1 min-w-0 lg:col-span-8 bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 md:p-9 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border-subtle gap-3">
            <div>
              <span className="font-mono text-[10px] text-accent-amber uppercase tracking-wider font-semibold block">
                DOMAIN INSPECTION // {currentSkill.category || "TECHNICAL SPECIFICATION"}
              </span>
              <h3 className="font-display font-bold text-2xl text-text-primary">
                {currentSkill.name}
              </h3>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-surface border border-border-subtle font-mono text-xs text-text-primary">
              Status: <strong className="text-accent-amber capitalize">{currentSkill.status.replace(/-/g, " ")}</strong>
            </span>
          </div>

          <p className="text-sm text-text-muted leading-relaxed mb-6 font-sans">
            {currentSkill.description}
          </p>

          {/* Verified Skills & Tooling in this Domain */}
          <div className="mb-8">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-3 font-semibold">
              Technologies &amp; Application Scope
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(currentSkill.skills || currentSkill.technologies.map((t) => ({ name: t, description: "" }))).map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-lg bg-surface border border-border-subtle hover:border-accent-amber/50 transition-colors"
                >
                  <div className="font-mono text-xs font-semibold text-text-primary mb-1 flex items-center justify-between">
                    <span>{s.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
                  </div>
                  {s.description && (
                    <p className="text-[11px] text-text-muted leading-relaxed font-sans">
                      {s.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connected Verified Projects */}
          <div className="pt-6 border-t border-border-subtle/80">
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider font-semibold">
                Demonstrated In Verified Projects
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                {matchedProjects.length} Connected {matchedProjects.length === 1 ? "Unit" : "Units"}
              </span>
            </div>
            {selectedProject && relatedSkills.some((skill) => skill.id === currentSkill.id) && (
              <p className="mb-3 font-mono text-[11px] text-emerald-700" role="status" aria-live="polite">
                {selectedProject.name} is linked to {currentSkill.name} in the portfolio data.
              </p>
            )}

            <div className="space-y-3">
              {matchedProjects.map((project) => (
                <div
                  key={project.slug}
                  className={`p-4 rounded-xl bg-surface-paper border flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors ${selectedProjectSlug === project.slug ? "border-accent-amber shadow-xs" : "border-border-subtle hover:border-accent-amber"}`}
                >
                  <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <button type="button" onClick={() => selectProject(project.slug)} aria-pressed={selectedProjectSlug === project.slug} className="text-left font-display font-bold text-sm text-text-primary hover:text-accent-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
                        {project.name}
                      </button>
                      <span className="font-mono text-[10px] text-accent-amber uppercase px-1.5 py-0.2 rounded bg-surface border border-border-subtle">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed font-sans mt-0.5">
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 pt-1 sm:pt-0">
                    {project.repositoryUrl && (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-text-primary hover:text-accent-amber font-semibold"
                      >
                        <span>Code</span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent-amber" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-accent-amber hover:underline font-semibold"
                      >
                        <span>Live</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle text-xs font-mono text-text-muted flex items-start gap-1.5">
            <span className="text-accent-amber font-semibold flex-shrink-0">Integrity Note:</span>
            <span className="leading-relaxed">{currentSkill.notes}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
