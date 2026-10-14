"use client";

import { ArrowRight } from "lucide-react";

export interface ProjectSpec {
  slug: string;
  name: string;
  category: string;
  summary: string;
  technologies: string[];
  telemetry: string;
  specBadge: string;
  repositoryUrl?: string | null;
  liveUrl?: string | null;
  status?: string;
  notes?: string;
  featured?: boolean;
}

interface TechnicalPanelProps {
  currentProject: ProjectSpec;
}

export function TechnicalPanel({ currentProject }: TechnicalPanelProps) {
  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <div className="w-full rounded-xl border border-border-dark bg-surface-dark p-5 text-white shadow-md transition-colors duration-200 motion-reduce:transition-none">
        <div className="mb-3 flex items-center justify-between border-b border-border-dark/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-amber" aria-hidden="true" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-text-on-dark-muted">Project Context</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">PORTFOLIO // CATALOG</span>
        </div>
        <dl className="space-y-3">
          <div className="flex items-start justify-between gap-3 font-mono text-xs">
            <dt className="shrink-0 text-zinc-400">Focus</dt>
            <dd className="text-right text-[11px] font-medium leading-snug text-accent-amber" title={currentProject.telemetry}>{currentProject.telemetry}</dd>
          </div>
          <div className="flex items-start justify-between gap-3 font-mono text-xs">
            <dt className="shrink-0 text-zinc-400">Technologies</dt>
            <dd className="max-w-[68%] break-words text-right font-medium text-zinc-100">{currentProject.technologies.slice(0, 4).join(" · ")}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border-dark/60 pt-1.5 font-mono text-xs">
            <dt className="text-zinc-400">Development</dt>
            <dd className="capitalize text-zinc-100">{currentProject.status ?? "Not specified"}</dd>
          </div>
          <p className="border-t border-border-dark/60 pt-2 font-sans text-[11px] leading-relaxed text-zinc-300">{currentProject.notes || currentProject.summary}</p>
        </dl>
      </div>
      <div className="flex w-full flex-col justify-between rounded-xl border border-border-subtle bg-white p-5 shadow-xs transition-colors duration-200 motion-reduce:transition-none">
        <div>
          <div className="mb-2.5 flex items-center justify-between gap-2 border-b border-border-subtle/80 pb-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{currentProject.category}</span>
            <span className="shrink-0 font-mono text-[10px] font-semibold text-accent-amber">{currentProject.specBadge}</span>
          </div>
          <h3 className="mb-1.5 font-display text-base font-bold text-text-primary">{currentProject.name}</h3>
          <p className="mb-3.5 font-sans text-xs leading-relaxed text-text-muted">{currentProject.summary}</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {currentProject.technologies.slice(0, 4).map((technology) => <span key={technology} className="rounded border border-border-subtle bg-surface px-2 py-0.5 font-mono text-[10px] text-text-primary">{technology}</span>)}
          </div>
        </div>
        <a href="#projects" className="group inline-flex items-center justify-between border-t border-border-subtle/70 pt-2.5 font-mono text-xs font-medium text-text-primary transition-colors hover:text-accent-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          <span>Inspect Project Specification</span>
          <ArrowRight className="h-3.5 w-3.5 text-accent-amber transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
