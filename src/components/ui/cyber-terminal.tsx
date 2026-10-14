"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft, Maximize2, Minimize2 } from "lucide-react";
import { formatArithmeticResult } from "@/lib/arithmetic";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import { usePortfolioInteraction } from "../portfolio/interaction-context";

interface LogEntry {
  id?: number;
  type: "input" | "output" | "system" | "error" | "success";
  text: string;
}

export function CyberTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: 1,
      type: "system",
      text: "Sushovan Halder // Systems Lab Terminal v2.4 (RKMGEC)",
    },
    {
      id: 2,
      type: "output",
      text: "Type 'help' to see available commands or 'whoami' for credentials.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nextLogId = useRef(3);
  const { selectProject } = usePortfolioInteraction();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100);
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        window.clearTimeout(focusTimer);
        window.removeEventListener("keydown", handleEscape);
      };
    }
    return undefined;
  }, [isOpen]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Backtick toggles the terminal; Ctrl/Cmd+K is reserved for the command palette.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (rawCmd: string) => {
    if (rawCmd.length > 512) {
      setHistory((current) => [...current, { id: nextLogId.current++, type: "error", text: "Command is too long (maximum 512 characters)." }]);
      setInputVal("");
      return;
    }
    const cmd = rawCmd.trim();
    if (!cmd) return;

    const newHistory: LogEntry[] = [...history, { type: "input", text: `sys@halder:~$ ${cmd}` }];
    const parts = cmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Available commands:
  about              : Display profile and academic status
  github             : Show both GitHub profiles
  project <slug>     : Select a catalog project
  • whoami             : Display profile credentials and academic status
  • projects           : List verified engineering units
  • skills             : Inspect technical capability matrix
  • calc <expression>  : Infix arithmetic parsing engine (e.g. calc 3 + 4 * (12 / 2))
  • verify-batch <id>  : Run cryptographic batch verification (try: verify-batch HC-2026-00124)
  • crypto-sim <text>  : Simulate X25519 Diffie-Hellman + AES-256-GCM encryption
  • contact            : Jump to contact dispatch
  • clear              : Clear terminal buffer
  • exit               : Close this console`,
        });
        break;

      case "about":
      case "whoami":
        newHistory.push({
          type: "output",
          text: `IDENTITY: Sushovan Halder
STATUS: Computer Science & Engineering Student at RKMGEC
FOCUS: Web Engineering, Systems, Automation, Security
GITHUB:
  • https://github.com/sushovanbuilds
  • https://github.com/sushovan27
CREED: "I build, break down, and improve ideas through code."`,
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: projectsData.map((project) => `  ${project.slug} · ${project.name} [${project.status}]`).join("\n"),
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: skillsData.map((skill) => `  ${skill.id} · ${skill.name} [${skill.status}]`).join("\n"),
        });
        break;

      case "github":
        newHistory.push({ type: "output", text: "GitHub profiles:\n  https://github.com/sushovanbuilds\n  https://github.com/sushovan27" });
        break;

      case "project": {
        const project = projectsData.find((item) => item.slug === args);
        if (!project) {
          newHistory.push({ type: "error", text: "Usage: project <catalog-slug>. Run 'projects' to list available slugs." });
        } else {
          selectProject(project.slug);
          newHistory.push({ type: "success", text: `Selected ${project.name}. Opening project explorer.` });
          window.location.hash = "#projects";
          setIsOpen(false);
        }
        break;
      }

      case "calc":
        if (!args) {
          newHistory.push({
            type: "error",
            text: "Usage: calc <expression>  (e.g., calc (14 + 6) * 3 / 2)",
          });
        } else {
          newHistory.push({
            type: "success",
            text: formatArithmeticResult(args),
          });
        }
        break;

      case "verify-batch":
        {
          const batchId = args || "HC-2026-00124";
          newHistory.push({
            type: "success",
            text: `[TAMPER-EVIDENT VERIFICATION: ${batchId}]
• Status: SEALED & TAMPER-EVIDENT
• Origin: Sundarbans Mangrove Reserve (Green Valley Apiary)
• Lab Assay: NBB Analytical Facility -> Moisture 17.2%, Purity Verified
• Cryptographic Anchor: SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`,
          });
        }
        break;

      case "crypto-sim":
        {
          const textToEncrypt = args || "Confidential Payload";
          const mockPub = Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
          ).join("");
          const mockCipher = Array.from({ length: textToEncrypt.length }, () =>
            Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
          ).join("");
          const mockTag = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * 256).toString(16).padStart(2, "0")
          ).join("");

          newHistory.push({
            type: "success",
            text: `[SIMULATING X25519 + AES-256-GCM]
• Plaintext: "${textToEncrypt}"
• Ephemeral PubKey: 0x${mockPub}
• AES-GCM Cipher:  0x${mockCipher}
• Auth Tag:        0x${mockTag}
• Wire Status: Verified with Wireshark // Zero Plaintext Leakage`,
          });
        }
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: "Opening contact section...",
        });
        window.location.hash = "#contact";
        setIsOpen(false);
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        break;

      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${command}'. Type 'help' for recognized commands.`,
        });
        break;
    }

    setHistory(newHistory.map((entry) => entry.id === undefined
      ? { ...entry, id: nextLogId.current++ }
      : entry));
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    }
  };

  return (
    <>
      {/* Floating HUD Terminal Toggle Pill (Bottom Right) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-surface-dark text-white px-3.5 py-2 rounded-full border border-border-dark shadow-xl hover:border-accent-amber hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group font-mono text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        aria-label="Toggle Systems Command Console"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-amber opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-amber"></span>
        </span>
        <Terminal className="w-3.5 h-3.5 text-accent-amber" />
        <span className="font-semibold tracking-wide">HUD Console</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-[#1A1C21] text-zinc-400 rounded border border-border-dark">
          `
        </kbd>
      </button>

      {/* Terminal Drawer / Modal Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Systems Command Console"
          ref={dialogRef}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
              'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }}
          className={`fixed z-50 transition-all duration-200 bg-surface-dark border border-border-dark shadow-2xl rounded-2xl flex flex-col font-mono text-xs overflow-hidden ${
            isExpanded
              ? "inset-4 sm:inset-10"
              : "bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[540px] h-[440px]"
          }`}
        >
          {/* Header Bar */}
          <div className="bg-[#17181B] px-4 py-3 border-b border-border-dark flex items-center justify-between text-zinc-300">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent-amber" />
              <span className="font-bold text-[11px] tracking-wider text-white">
                HALDER_SYS // INTERACTIVE HUD CONSOLE
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:text-white rounded hover:bg-[#282B32] transition-colors"
                aria-label={isExpanded ? "Collapse console" : "Expand console"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-accent-amber rounded hover:bg-[#282B32] transition-colors"
                aria-label="Close console"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#0F1014] text-zinc-300 selection:bg-accent-amber selection:text-white"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {history.map((entry) => (
              <div
                key={entry.id}
                className={`whitespace-pre-wrap break-words leading-relaxed ${
                  entry.type === "input"
                    ? "text-accent-amber font-semibold"
                    : entry.type === "system"
                    ? "text-zinc-500 text-[10px] uppercase tracking-wider"
                    : entry.type === "error"
                    ? "text-red-400"
                    : entry.type === "success"
                    ? "text-emerald-400"
                    : "text-zinc-200"
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Command Input Bar */}
          <div className="bg-[#17181B] px-4 py-2.5 border-t border-border-dark flex items-center gap-2">
            <span className="text-accent-amber font-bold">sys@halder:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              maxLength={512}
              aria-label="Terminal command"
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'calc 3+4*2', or 'projects'..."
              className="min-w-0 flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none font-mono text-xs"
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1 text-zinc-400 hover:text-accent-amber transition-colors"
              aria-label="Submit command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
