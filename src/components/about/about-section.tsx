"use client";

import React from "react";
import { GraduationCap, Compass, Terminal, Shield, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../ui/icons";
import profileData from "../../content/profile.json";

export function AboutSection() {
  const explorations = [
    {
      title: "Systems & Linux Engineering",
      badge: "Active Focus",
      icon: <Terminal className="w-5 h-5 text-accent-amber" />,
      desc: "Delving into Debian distribution architecture, live-boot environments, and unprivileged namespace isolation for sandboxed code execution.",
      question: "How minimal can an unprivileged Linux live environment be while remaining complete for developers?",
    },
    {
      title: "Security & Cryptography",
      badge: "Learning",
      icon: <Shield className="w-5 h-5 text-accent-amber" />,
      desc: "Investigating end-to-end encrypted protocol handshakes, forward secrecy guarantees, and digital steganography statistical triage.",
      question: "What deterministic indicators reliably identify tampering or hidden data before applying ML models?",
    },
    {
      title: "Full-Stack Web Engineering",
      badge: "Building",
      icon: <Compass className="w-5 h-5 text-accent-amber" />,
      desc: "Building reactive, high-performance web applications with Next.js, TypeScript, and clean modular component systems.",
      question: "How can zero-runtime CSS patterns and server-side pipelines maximize real-world rendering throughput?",
    },
    {
      title: "Local AI & Automation",
      badge: "Exploring",
      icon: <GraduationCap className="w-5 h-5 text-accent-amber" />,
      desc: "Experimenting with local inference engines like Ollama for offline forensic analysis and automated developer workflow tooling.",
      question: "How effectively can localized small language models assist in deterministic security auditing?",
    },
  ];

  return (
    <section
      id="about"
      className="w-full min-w-0 py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-border-subtle"
    >
      <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-start mb-20">
        {/* Left Column: Monogram & Philosophy */}
        <div className="col-span-1 min-w-0 lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
            <span>04 // Beyond the Interface</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Curious about what makes things work<span className="text-accent-amber">.</span>
          </h2>

          <p className="text-base text-text-primary font-medium leading-relaxed">
            I'm Sushovan Halder, a Computer Science and Engineering student at RKMGEC who
            learns best by experimenting with real projects.
          </p>

          <p className="text-sm text-text-muted leading-relaxed">
            I enjoy moving between the visible side of software—interfaces, websites, and
            user experiences—and the underlying systems, protocols, and developer tools
            that power them. This portfolio is a living record of that process: things I've
            built, experiments I'm testing, and technical directions I'm learning.
          </p>

          {/* Dual GitHub Identity Cards */}
          <div className="pt-2 space-y-3">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider block font-semibold">
              Verified GitHub Profiles
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://github.com/sushovanbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white border border-border-subtle hover:border-text-primary transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-text-primary flex items-center gap-1.5">
                    <GithubIcon className="w-4 h-4 text-accent-amber" />
                    sushovanbuilds
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-amber transition-colors" />
                </div>
                <span className="text-[11px] text-text-muted leading-snug">
                  Development builds, systems utilities, &amp; core projects.
                </span>
              </a>

              <a
                href="https://github.com/sushovan27"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white border border-border-subtle hover:border-text-primary transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-text-primary flex items-center gap-1.5">
                    <GithubIcon className="w-4 h-4 text-accent-amber" />
                    sushovan27
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-amber transition-colors" />
                </div>
                <span className="text-[11px] text-text-muted leading-snug">
                  Labs, security experiments, OS distributions, &amp; prototypes.
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Education & Approach */}
        <div className="col-span-1 min-w-0 lg:col-span-7 bg-white rounded-2xl border border-border-subtle p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <span className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent-amber" />
              Academic Grounding
            </span>
            <span className="font-mono text-xs text-text-muted">
              Status: <strong className="text-text-primary">Undergraduate Student</strong>
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl text-text-primary mb-1">
              Ramkrishna Mahato Government Engineering College (RKMGEC)
            </h3>
            <span className="font-mono text-xs text-accent-amber font-semibold">
              B.Tech in Computer Science and Engineering
            </span>
          </div>

          <div className="space-y-4 text-sm text-text-muted leading-relaxed">
            <p>
              My coursework and self-directed engineering emphasize programming
              fundamentals, data structures &amp; algorithms, operating systems, and
              network architectures.
            </p>
            <p>
              I prioritize verified implementation over superficial credentials. Rather
              than claiming premature production readiness, every project in this
              portfolio specifies its exact scope, tested assumptions, and real
              technologies.
            </p>
          </div>

          <div className="p-4 bg-surface rounded-xl border border-border-subtle/80 font-mono text-xs text-text-primary">
            <span className="text-[10px] text-accent-amber uppercase tracking-wider block mb-1 font-semibold">
              ENGINEERING PHILOSOPHY
            </span>
            "Build things from the bottom up to truly understand how they behave when
            something breaks."
          </div>
        </div>
      </div>

      {/* Current Research & Explorations Section */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider block">
              Active Inquiries
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
              Current Technical Explorations<span className="text-accent-amber">.</span>
            </h3>
          </div>
          <span className="font-mono text-xs text-text-muted">
            4 Focus Vectors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {explorations.map((exp) => (
            <div
              key={exp.title}
              className="bg-white rounded-xl p-5 border border-border-subtle shadow-2xs flex flex-col justify-between hover:border-accent-amber transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded bg-surface border border-border-subtle group-hover:border-accent-amber transition-colors">
                    {exp.icon}
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-text-muted px-2 py-0.5 rounded bg-surface border border-border-subtle">
                    {exp.badge}
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-text-primary mb-2">
                  {exp.title}
                </h4>

                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {exp.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle/60">
                <span className="font-mono text-[9px] text-accent-amber uppercase tracking-wider block mb-1 font-semibold">
                  Core Question
                </span>
                <p className="font-mono text-[11px] text-text-primary italic leading-snug">
                  "{exp.question}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
