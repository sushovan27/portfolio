import React from "react";

export function TelemetryPanel() {
  return (
    <div className="group relative rounded-lg border border-border-subtle p-6 bg-white shadow-sm">
      <h3 className="text-sm font-mono uppercase text-text-primary mb-4 font-semibold tracking-wider">
        ACTIVE TELEMETRY
      </h3>
      <div className="space-y-2 text-xs font-mono">
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">SYS / LAB</span>
          <span className="text-text-primary font-medium">RKMGEC CSE Student</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">FOCUS</span>
          <span className="text-text-primary">Web Engineering &amp; Systems</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">PRIMARY RUNTIME</span>
          <span className="text-text-primary">Next.js 16 / TypeScript</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">PROGRAMMING</span>
          <span className="text-text-primary">C, C++, Python, TypeScript</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">AGENTIC WORKFLOWS</span>
          <span className="text-text-primary">AI Coding Agents &amp; Tooling</span>
        </div>
        <div className="flex justify-between items-center py-1 border-b border-border-subtle/50">
          <span className="text-text-muted">SYSTEMS</span>
          <span className="text-text-primary">Linux &amp; CLI Environments</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-text-muted">VERIFICATION</span>
          <span className="text-emerald-600 font-semibold">Verified Repositories</span>
        </div>
      </div>
    </div>
  );
}