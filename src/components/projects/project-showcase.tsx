"use client";

import React, { useState } from "react";
import {
  Code,
  ExternalLink,
  Shield,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  Lock,
  Cpu,
  FileCode,
  Sparkles,
  BookOpen,
  ArrowRight,
  Calculator,
  RefreshCw,
} from "lucide-react";
import projectsData from "../../content/projects.json";
import { formatArithmeticResult } from "@/lib/arithmetic";
import { usePortfolioInteraction } from "../portfolio/interaction-context";

export function ProjectShowcase() {
  const allProjects = projectsData;
  const { selectedProjectSlug, selectProject } = usePortfolioInteraction();
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const selectedProject = allProjects.find((project) => project.slug === selectedProjectSlug) ?? allProjects[0];
  const categories = Array.from(new Set(allProjects.map((project) => project.category)));
  const visibleProjects = allProjects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const searchText = `${project.name} ${project.category} ${project.summary} ${project.technologies.join(" ")}`.toLowerCase();
    return matchesCategory && searchText.includes(projectSearch.trim().toLowerCase());
  });
  const visibleArchiveProjects = visibleProjects.filter((project) => !project.featured);

  // Interactive states for projects to make them fun and engaging
  // 1. HiveTrace interactive batch selector
  const [selectedBatch, setSelectedBatch] = useState<"HC-2026-00124" | "HC-2026-00281" | "HC-ADULTERATED">(
    "HC-2026-00124"
  );

  // 2. StegDetector interactive bit-plane slicer
  const [activeBitPlane, setActiveBitPlane] = useState<"lsb0" | "lsb1" | "msb7" | "entropy" | "ascii">("lsb0");

  // 3. E2EE Messaging live encryption simulator
  const [plaintextInput, setPlaintextInput] = useState("Confidential Dispatch");
  const [cipherOutput, setCipherOutput] = useState<{
    ephPub: string;
    nonce: string;
    ciphertext: string;
    authTag: string;
    timestamp: string;
  }>({
    ephPub: "4a8b9e1c5f3d7a2b0c9e8f1a4d6b3c2e",
    nonce: "7f83b1657ff1fc53b92dc181",
    ciphertext: "a9f82d1c7e4b901a5d6e2f8c0b1a4d9e",
    authTag: "3c7b9e0f1a4d8c2e",
    timestamp: "Just now",
  });

  const handleSimulateEncrypt = () => {
    const hex = (len: number) =>
      Array.from({ length: len }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    setCipherOutput({
      ephPub: hex(16),
      nonce: hex(12),
      ciphertext: hex(Math.max(12, plaintextInput.length * 2)),
      authTag: hex(8),
      timestamp: "Just now",
    });
  };

  // 4. Jyotirveda Gurukulam interactive curriculum track selector
  const [activeCurriculumTrack, setActiveCurriculumTrack] = useState<"intro" | "intermediate" | "advanced">("intro");

  // 5. CLI Calculator interactive in-card REPL
  const [calcInput, setCalcInput] = useState("(14 + 6) * 3 / 2");
  const [calcResult, setCalcResult] = useState<string>("= 30");

  const handleEvaluateCalc = (expr: string) => {
    setCalcInput(expr);
    setCalcResult(formatArithmeticResult(expr));
  };

  return (
    <section
      id="projects"
      className="w-full min-w-0 py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-border-subtle"
    >
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-2 font-mono text-xs text-text-muted uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
          <span>02 // Verified Engineering Showcase</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
          Selected Projects<span className="text-accent-amber">.</span>
        </h2>
        <p className="text-sm md:text-base text-text-muted mt-2 max-w-2xl leading-relaxed">
          Real software systems, security tools, and developer experiments built from
          scratch. Inspected directly from public repositories without fabricated metrics.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-border-subtle bg-surface-paper p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div suppressHydrationWarning>
            <label htmlFor="project-search" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-muted">Search projects and technologies</label>
            <input id="project-search" type="search" suppressHydrationWarning value={projectSearch} onChange={(event) => setProjectSearch(event.target.value)} placeholder="Try Python, React, parser…" className="w-full rounded-lg border border-border-subtle bg-white px-3 py-2 font-mono text-xs text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-amber focus-visible:ring-2 focus-visible:ring-focus-ring sm:w-80" />
          </div>
          <div suppressHydrationWarning>
            <label htmlFor="project-category" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-muted">Category</label>
            <select id="project-category" suppressHydrationWarning value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full rounded-lg border border-border-subtle bg-white px-3 py-2 font-mono text-xs text-text-primary outline-none focus:border-accent-amber focus-visible:ring-2 focus-visible:ring-focus-ring sm:min-w-64">
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Project results">
          {visibleProjects.map((project) => {
            const isSelected = project.slug === selectedProjectSlug;
            return (
              <button key={project.slug} type="button" onClick={() => selectProject(project.slug)} aria-pressed={isSelected} className={`rounded-lg border px-3 py-2 text-left transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${isSelected ? "border-accent-amber bg-surface-dark text-white" : "border-border-subtle bg-white text-text-primary hover:border-accent-amber"}`}>
                <span className="block font-display text-xs font-semibold">{project.name}</span>
                <span className={`block font-mono text-[9px] ${isSelected ? "text-zinc-300" : "text-text-muted"}`}>{project.category}</span>
              </button>
            );
          })}
          {visibleProjects.length === 0 && <p className="py-3 font-mono text-xs text-text-muted" role="status">No projects match those filters.</p>}
        </div>
        <p className="sr-only" role="status" aria-live="polite">{visibleProjects.length} projects match the current filters.</p>
      </div>

      <article key={selectedProject.slug} className="mb-10 grid grid-cols-1 gap-6 rounded-2xl border border-border-subtle bg-white p-5 shadow-xs transition-[opacity,transform] duration-200 motion-safe:animate-in motion-safe:fade-in sm:p-7 lg:grid-cols-12 motion-reduce:transition-none">
        <div className="flex min-h-48 flex-col justify-between rounded-xl border border-border-dark bg-surface-dark p-5 text-white lg:col-span-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Project visual record</span>
          <div>
            <p className="font-display text-xl font-bold">{selectedProject.name}</p>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-accent-amber">{selectedProject.telemetry}</p>
          </div>
          <span className="font-mono text-[10px] text-zinc-400">No screenshot asset is available for this project.</span>
        </div>
        <div className="min-w-0 lg:col-span-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{selectedProject.category}</span>
            <span className="rounded bg-surface px-2 py-1 font-mono text-[10px] capitalize text-text-primary">{selectedProject.status}</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-text-primary">{selectedProject.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{selectedProject.summary}</p>
          {selectedProject.notes && <p className="mt-3 border-l-2 border-accent-amber pl-3 text-xs leading-relaxed text-text-primary"><span className="font-mono uppercase tracking-wide text-text-muted">Project note · </span>{selectedProject.notes}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedProject.technologies.map((technology) => <span key={technology} className="rounded border border-border-subtle bg-surface-paper px-2 py-1 font-mono text-[10px] text-text-primary">{technology}</span>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-border-subtle pt-4 font-mono text-xs">
            {selectedProject.repositoryUrl && <a href={selectedProject.repositoryUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-text-primary underline-offset-4 hover:text-accent-amber hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">Repository ↗</a>}
            {selectedProject.liveUrl && <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-amber underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">Live project ↗</a>}
            {!selectedProject.repositoryUrl && !selectedProject.liveUrl && <span className="text-text-muted">No public links are listed for this project.</span>}
          </div>
        </div>
      </article>

      {/* Dynamic Showcase Container */}
      <div className="bg-white rounded-2xl border border-border-subtle shadow-xs overflow-hidden p-6 sm:p-8 md:p-10 transition-all">
        {/* 1. HIVETRACE PANEL */}
        {selectedProjectSlug === "hivetrace" && (
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 items-start animate-in fade-in duration-200">
            <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-amber-soft border border-accent-amber/30 text-accent-amber font-mono text-xs font-semibold uppercase">
                  Traceability Protocol
                </span>
                <span className="font-mono text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Deployed on Vercel
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  HiveTrace
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  A honey supply-chain provenance system designed for Indian apiaries.
                  Provides role-based interfaces for beekeepers, certified testing
                  laboratories, processors, and distributors, linked together with consumer
                  QR verification.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border-subtle/80 text-xs">
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Problem Solved
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Conventional supply chain demos confuse immutability with authenticity.
                    HiveTrace strictly separates certified laboratory purity analysis from
                    tamper-evident batch lifecycle events.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    What Was Built
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Next.js 16 App Router application with role-based auth, dynamic QR
                    scanning at `/scan`, mock batch state transitions, and responsive
                    consumer verification dashboards.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-2 font-semibold">
                  Verified Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js 16",
                    "React 19",
                    "TypeScript",
                    "Tailwind 4",
                    "Prisma",
                    "PostgreSQL",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-surface border border-border-subtle text-xs font-mono text-text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="https://github.com/sushovanbuilds/HiveTrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-dark text-white rounded font-mono text-xs font-medium hover:bg-black transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://hivetrace-indol.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent-amber transition-colors font-semibold"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* HiveTrace Right Mockup / Interactive Batch Deck */}
            <div className="col-span-1 min-w-0 lg:col-span-7 bg-surface-paper border border-border-subtle rounded-xl p-6 md:p-8 font-sans">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-border-subtle gap-3">
                <div className="font-mono text-xs text-text-muted flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>hivetrace-indol.vercel.app/verify</span>
                </div>

                {/* Interactive Batch Switcher Buttons */}
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-text-muted text-[10px] uppercase mr-1">Batch:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch("HC-2026-00124")}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      selectedBatch === "HC-2026-00124"
                        ? "bg-surface-dark text-white border-surface-dark font-semibold"
                        : "bg-white text-text-muted border-border-subtle hover:text-text-primary"
                    }`}
                  >
                    HC-00124
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch("HC-2026-00281")}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      selectedBatch === "HC-2026-00281"
                        ? "bg-surface-dark text-white border-surface-dark font-semibold"
                        : "bg-white text-text-muted border-border-subtle hover:text-text-primary"
                    }`}
                  >
                    HC-00281
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBatch("HC-ADULTERATED")}
                    className={`px-2.5 py-1 rounded border transition-colors ${
                      selectedBatch === "HC-ADULTERATED"
                        ? "bg-red-700 text-white border-red-700 font-semibold"
                        : "bg-white text-red-600 border-red-200 hover:bg-red-50"
                    }`}
                  >
                    Simulate Flag
                  </button>
                </div>
              </div>

              {selectedBatch === "HC-ADULTERATED" ? (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-red-900 uppercase">
                        ADULTERATION TAMPER ALERT
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-200 text-red-800 font-bold">
                        HASH MISMATCH
                      </span>
                    </div>
                    <p className="text-xs text-red-800 leading-relaxed">
                      Certificate payload failed cryptographic integrity check. The C4 sugar
                      isotope ratio violates verified laboratory thresholds.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded border border-red-200 font-mono text-xs text-red-700">
                    Expected Hash: 0x8a92f0c1b... <br />
                    Observed Hash: 0x4f1b88e9d... [REJECTED BY CONTRACT]
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 bg-white rounded-lg border border-border-subtle shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-text-primary uppercase">
                        {selectedBatch === "HC-2026-00124"
                          ? "Origin: Sundarbans Mangrove Reserve"
                          : "Origin: Green Valley Mustard Apiary"}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold">
                        Tamper-Evident Hash Sealed
                      </span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {selectedBatch === "HC-2026-00124"
                        ? "Harvested by Green Valley Apiary cooperative. Lab certified at NBB regional testing facility with 100% floral pollen consistency."
                        : "Harvested by Anand Apiary group. Purity assay confirmed with low HMF and zero corn-syrup additives."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 bg-surface rounded border border-border-subtle">
                      <span className="text-text-muted text-[10px] block">MOISTURE CONTENT</span>
                      <span className="font-semibold text-text-primary text-sm">
                        {selectedBatch === "HC-2026-00124" ? "17.2%" : "18.1%"} (Norm &lt; 20%)
                      </span>
                    </div>
                    <div className="p-3 bg-surface rounded border border-border-subtle">
                      <span className="text-text-muted text-[10px] block">HMF ANALYSIS</span>
                      <span className="font-semibold text-text-primary text-sm">
                        {selectedBatch === "HC-2026-00124" ? "14.8 mg/kg" : "11.2 mg/kg"}
                      </span>
                    </div>
                  </div>

                  {/* Ledger vs Lab status */}
                  <div className="bg-surface-dark text-zinc-300 p-4 rounded-lg font-mono text-xs border border-border-dark space-y-2">
                    <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-1 border-b border-border-dark">
                      <span>SEPARATION OF CLAIMS ARCHITECTURE</span>
                      <span className="text-accent-amber">Tamper Proofing</span>
                    </div>
                    <div className="text-[11px] space-y-1">
                      <p className="text-zinc-200">
                        • <strong className="text-white">Tamper Evident:</strong> SHA-256 seal guarantees historic logs cannot be altered unnoticed.
                      </p>
                      <p className="text-zinc-200">
                        • <strong className="text-white">Product Authenticity:</strong> Explicitly accredited to accredited laboratory spectroscopy.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. STEGDETECTOR PANEL */}
        {selectedProjectSlug === "stegdetector" && (
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 items-start animate-in fade-in duration-200">
            <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-amber-soft border border-accent-amber/30 text-accent-amber font-mono text-xs font-semibold uppercase">
                  Image Forensics &amp; AI
                </span>
                <span className="font-mono text-xs text-text-muted">Working Prototype</span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  StegDetector
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  A triage web tool for detecting hidden steganographic payloads inside
                  digital images. Combines deterministic mathematical analysis with
                  optional LLM-powered forensic summaries.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border-subtle/80 text-xs">
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Techniques Implemented
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Least Significant Bit (LSB) plane extraction, Shannon entropy
                    gradient calculations, chi-square statistical distribution analysis,
                    and ASCII string recovery.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Dual Architecture
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Graceful fallback: executes 100% offline using deterministic OpenCV &amp;
                    NumPy forensics if external LLM providers or local Ollama instances
                    are unreachable.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-2 font-semibold">
                  Verified Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Python 3", "Flask", "OpenCV", "NumPy", "SciPy", "Ollama LLM"].map(
                    (t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-surface border border-border-subtle text-xs font-mono text-text-primary"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="pt-3">
                <a
                  href="https://github.com/sushovan27/stegdetector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-dark text-white rounded font-mono text-xs font-medium hover:bg-black transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* StegDetector Interactive Slicer Terminal Deck */}
            <div className="col-span-1 min-w-0 lg:col-span-7 bg-surface-dark text-zinc-200 border border-border-dark rounded-xl p-6 md:p-8 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-border-dark text-zinc-400 gap-2">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-amber animate-pulse"></span>
                  stegdetector // Interactive Forensics Slicer
                </span>
                <span className="text-[11px] text-zinc-500">PYTHON 3.10</span>
              </div>

              {/* Interactive Bit-Plane Slicer Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {[
                  { id: "lsb0", label: "Plane 0 (LSB)" },
                  { id: "lsb1", label: "Plane 1" },
                  { id: "msb7", label: "Plane 7 (MSB)" },
                  { id: "entropy", label: "Entropy Curve" },
                  { id: "ascii", label: "Recovered ASCII" },
                ].map((plane) => (
                  <button
                    key={plane.id}
                    type="button"
                    onClick={() => setActiveBitPlane(plane.id as any)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                      activeBitPlane === plane.id
                        ? "bg-accent-amber text-white font-bold"
                        : "bg-[#17181B] text-zinc-400 border border-border-dark hover:text-white"
                    }`}
                  >
                    {plane.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Slicer Visual View */}
              <div className="p-4 bg-[#17181B] rounded border border-border-dark space-y-3">
                {activeBitPlane === "lsb0" && (
                  <div>
                    <div className="text-accent-amber font-bold text-xs mb-1">
                      [BIT-PLANE 0 INSPECTION: LSB SLICE]
                    </div>
                    <p className="text-zinc-300 text-[11px] mb-2 leading-relaxed">
                      High-frequency bit randomness observed. Unlike natural continuous camera gradients,
                      LSB Plane 0 displays pseudorandom noise characteristic of sequential payload injection.
                    </p>
                    <div className="p-2.5 bg-[#0D0E11] rounded font-mono text-[10px] text-emerald-400">
                      01010000 01001011 00000011 00000100 00010100 00000000 ... [MAGIC: ZIP PK]
                    </div>
                  </div>
                )}

                {activeBitPlane === "lsb1" && (
                  <div>
                    <div className="text-zinc-200 font-bold text-xs mb-1">
                      [BIT-PLANE 1 INSPECTION]
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Plane 1 retains standard spatial visual luminance boundaries. Payload is isolated exclusively within Plane 0.
                    </p>
                  </div>
                )}

                {activeBitPlane === "msb7" && (
                  <div>
                    <div className="text-zinc-200 font-bold text-xs mb-1">
                      [BIT-PLANE 7 INSPECTION: MSB SLICE]
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Most Significant Bit retains primary visual outlines and macroscopic scene shapes. High visual fidelity preserved.
                    </p>
                  </div>
                )}

                {activeBitPlane === "entropy" && (
                  <div>
                    <div className="text-accent-amber font-bold text-xs mb-1">
                      [SHANNON ENTROPY DISTRIBUTION]
                    </div>
                    <div className="space-y-1 text-zinc-300 text-[11px]">
                      <div>• Channel Red Entropy: <span className="text-white">7.994 bits/pixel</span> (Near random limit 8.0)</div>
                      <div>• Channel Green Entropy: <span className="text-white">7.989 bits/pixel</span></div>
                      <div>• Chi-Square p-value: <span className="text-accent-amber">p &lt; 0.0001 [HIGH ANOMALY]</span></div>
                    </div>
                  </div>
                )}

                {activeBitPlane === "ascii" && (
                  <div>
                    <div className="text-emerald-400 font-bold text-xs mb-1">
                      [RECOVERED EMBEDDED STRING FRAGMENTS]
                    </div>
                    <div className="p-2.5 bg-[#0D0E11] rounded text-[11px] text-emerald-300 font-mono">
                      "PK\x03\x04\x14\x00\x00\x00\x08\x00 payload_flag.txt [Archive Detected]"
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. E2EE MESSAGING PANEL */}
        {selectedProjectSlug === "e2ee-messaging" && (
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 items-start animate-in fade-in duration-200">
            <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-amber-soft border border-accent-amber/30 text-accent-amber font-mono text-xs font-semibold uppercase">
                  Cryptography Protocol
                </span>
                <span className="font-mono text-xs text-text-muted">Network Protocol</span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  E2EE Messaging
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Terminal-based, peer-to-peer end-to-end encrypted messaging system.
                  Features forward secrecy through ephemeral key generation and
                  authenticated encryption with AES-256-GCM.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border-subtle/80 text-xs">
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Security Design
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Uses persistent X25519 identity keys for participant registration and
                    fresh ephemeral X25519 key pairs per message for forward secrecy.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Zero-Knowledge Relay Server
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    The central Python socket server acts purely as an offline ciphertext
                    buffer. Verified with Wireshark packet capture that plaintext never hits
                    the wire.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-2 font-semibold">
                  Verified Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "Cryptography lib",
                    "X25519 (ECDH)",
                    "AES-256-GCM",
                    "Wireshark Verified",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-surface border border-border-subtle text-xs font-mono text-text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <a
                  href="https://github.com/sushovan27/e2ee-messaging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-dark text-white rounded font-mono text-xs font-medium hover:bg-black transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* E2EE Interactive Encryption Deck */}
            <div className="col-span-1 min-w-0 lg:col-span-7 bg-surface-paper border border-border-subtle rounded-xl p-6 md:p-8 font-mono text-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle text-text-muted">
                <span className="flex items-center gap-2 font-semibold text-text-primary">
                  <Lock className="w-4 h-4 text-accent-amber" />
                  Interactive Cryptographic Handshake Simulator
                </span>
                <span className="text-[10px] uppercase text-accent-amber font-bold">X25519 + AES-GCM</span>
              </div>

              {/* Interactive Payload Input Bar */}
              <div className="space-y-3 mb-4">
                <label className="block text-[11px] text-text-muted uppercase font-semibold">
                  Test Plaintext Message:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={plaintextInput}
                    onChange={(e) => setPlaintextInput(e.target.value)}
                    className="flex-1 bg-white border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-amber"
                  />
                  <button
                    type="button"
                    onClick={handleSimulateEncrypt}
                    className="px-3.5 py-2 bg-surface-dark text-white rounded-lg hover:bg-black transition-colors flex items-center gap-1.5 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3 text-accent-amber" />
                    <span>Encrypt Live</span>
                  </button>
                </div>
              </div>

              {/* Real-time Handshake Packet Simulation Box */}
              <div className="bg-surface-dark text-zinc-300 p-4 rounded-lg border border-border-dark space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between text-zinc-400 border-b border-border-dark pb-1.5">
                  <span className="text-emerald-400 font-bold">● WIRE PROTOCOL TRANSMISSION</span>
                  <span className="text-[10px] text-zinc-500">WIRESHARK VERIFIED</span>
                </div>

                <div className="space-y-1.5 font-mono">
                  <div>
                    <span className="text-zinc-500">1. Ephemeral PubKey (X25519):</span>{" "}
                    <span className="text-accent-amber">0x{cipherOutput.ephPub}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">2. AES-GCM 96-bit Nonce:</span>{" "}
                    <span className="text-zinc-300">0x{cipherOutput.nonce}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">3. Encrypted Payload (Hex):</span>{" "}
                    <span className="text-emerald-300 font-bold break-all">0x{cipherOutput.ciphertext}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">4. 128-bit Auth Tag:</span>{" "}
                    <span className="text-zinc-300">0x{cipherOutput.authTag}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border-dark/80 text-[10px] text-zinc-400 flex items-center justify-between">
                  <span>Server Relay View: Ciphertext only</span>
                  <span className="text-emerald-400 font-semibold">Zero Plaintext Leakage</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. JYOTIRVEDA GURUKULAM PLATFORM PANEL */}
        {selectedProjectSlug === "jyotirveda-gurukulam" && (
          <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 items-start animate-in fade-in duration-200">
            <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-amber-soft border border-accent-amber/30 text-accent-amber font-mono text-xs font-semibold uppercase">
                  Web Engineering Platform
                </span>
                <span className="font-mono text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Deployed on Vercel
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
                  Jyotirveda Gurukulam Platform
                </h3>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  A production-deployed educational platform architected with TypeScript,
                  Next.js, and modern component systems. Provides structured curriculum
                  navigation, interactive study tracks, and clean editorial presentation.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-border-subtle/80 text-xs">
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    System Architecture
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Built with modular Next.js routing, custom responsive layout patterns,
                    zero cumulative layout shift (CLS), and mobile-first touch navigation.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-text-muted uppercase tracking-wider text-[11px] block mb-1">
                    Platform Features
                  </span>
                  <p className="text-text-primary leading-relaxed">
                    Interactive course track viewers, lesson bookmarking, responsive typography,
                    and performant static page prerendering on Vercel.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider block mb-2 font-semibold">
                  Verified Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {["TypeScript", "Next.js", "React", "Tailwind CSS", "Vercel Deploy"].map(
                    (t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded bg-surface border border-border-subtle text-xs font-mono text-text-primary"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="https://github.com/sushovan27/Jyotirveda-Gurukulam-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-dark text-white rounded font-mono text-xs font-medium hover:bg-black transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://jyotirveda-gurukulam-platform.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent-amber transition-colors font-semibold"
                >
                  <span>Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Jyotirveda Right Deck with Interactive Syllabus Inspector */}
            <div className="col-span-1 min-w-0 lg:col-span-7 bg-surface-paper border border-border-subtle rounded-xl p-6 md:p-8 font-mono text-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle text-text-muted">
                <span className="flex items-center gap-2 font-semibold text-text-primary">
                  <BookOpen className="w-4 h-4 text-accent-amber" />
                  jyotirveda-gurukulam-platform.vercel.app
                </span>
                <span className="text-emerald-600 font-semibold">● PRODUCTION ACTIVE</span>
              </div>

              {/* Interactive Track Switcher */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-text-muted text-[10px] uppercase">Curriculum:</span>
                {[
                  { id: "intro", label: "Foundations" },
                  { id: "intermediate", label: "Core Lessons" },
                  { id: "advanced", label: "Applied Practicum" },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveCurriculumTrack(track.id as any)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeCurriculumTrack === track.id
                        ? "bg-surface-dark text-white font-bold"
                        : "bg-white border border-border-subtle text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>

              {/* Curriculum Track Cards */}
              <div className="p-4 bg-white rounded-lg border border-border-subtle shadow-xs space-y-3">
                {activeCurriculumTrack === "intro" && (
                  <div>
                    <h5 className="font-display font-bold text-sm text-text-primary mb-1">
                      Track 01: Foundational Principles &amp; Epistemology
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed mb-2 font-sans">
                      Introductory module covering historical timeline taxonomy, textual lineage,
                      and terminology indexing.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono">
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">4 Core Modules</span>
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">12 Audio Guides</span>
                    </div>
                  </div>
                )}

                {activeCurriculumTrack === "intermediate" && (
                  <div>
                    <h5 className="font-display font-bold text-sm text-text-primary mb-1">
                      Track 02: Analytical Calculations &amp; Chart Systems
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed mb-2 font-sans">
                      Structured algorithms for celestial coordination, planetary coordinates, and
                      computational chart generators.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono">
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">Algorithmic Tables</span>
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">Interactive Graphs</span>
                    </div>
                  </div>
                )}

                {activeCurriculumTrack === "advanced" && (
                  <div>
                    <h5 className="font-display font-bold text-sm text-text-primary mb-1">
                      Track 03: Applied Synthesis &amp; Case Studies
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed mb-2 font-sans">
                      Advanced comparative analysis combining classical manuscripts with structured
                      data visualizations.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-mono">
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">Verified Sandbox</span>
                      <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">Peer Review</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Verified Projects Archive (with Interactive C Parser Sandbox) */}
      <div className="mt-16 pt-12 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
              Additional Public Repositories &amp; Platforms
            </span>
            <h3 className="font-display text-2xl font-bold text-text-primary">
              Project Archive &amp; Practical Tools
            </h3>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {visibleArchiveProjects.length} Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleArchiveProjects.map((p) => (
            <div
              key={p.slug}
              className="bg-white rounded-xl p-6 border border-border-subtle shadow-2xs flex flex-col justify-between hover:border-text-primary transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
                  <span className="uppercase text-[10px] text-accent-amber font-semibold">
                    {p.category}
                  </span>
                  <span className="text-[10px] capitalize bg-surface px-2 py-0.5 rounded">
                    {p.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-text-primary mb-2">
                  {p.name}
                </h4>
                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {p.summary}
                </p>

                {/* Interactive live calculator REPL for CLI Calculator */}
                {p.slug === "cli-expression-calculator" && (
                  <div className="mb-4 p-3 rounded-lg bg-surface-dark text-white font-mono text-xs space-y-2 border border-border-dark">
                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calculator className="w-3 h-3 text-accent-amber" />
                        <span>Interactive Parser Sandbox</span>
                      </span>
                      <span className="text-emerald-400">C99 AST</span>
                    </div>
                    <div className="flex items-center gap-1.5" suppressHydrationWarning>
                      <span className="text-accent-amber">&gt;</span>
                      <input
                        type="text"
                        suppressHydrationWarning
                        autoComplete="off"
                        data-form-type="other"
                        data-lpignore="true"
                        value={calcInput}
                        maxLength={256}
                        aria-label={`${p.name} calculator expression`}
                        onChange={(e) => handleEvaluateCalc(e.target.value)}
                        className="bg-transparent text-white font-mono text-xs flex-1 focus:outline-none"
                      />
                    </div>
                    <div
                      className={`font-bold ${calcResult.startsWith("Error:") ? "text-red-400" : "text-emerald-400"}`}
                      role="status"
                      aria-live="polite"
                    >
                      {calcResult}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-surface border border-border-subtle font-mono text-[10px] text-text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
                {p.repositoryUrl ? (
                  <a
                    href={p.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent-amber font-semibold transition-colors"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                    <span>Live Deployment</span>
                  </span>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-accent-amber hover:underline font-semibold"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
