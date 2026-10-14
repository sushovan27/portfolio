"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import projects from "@/content/projects.json";
import skills from "@/content/skills.json";
import { CONTACT_EMAIL } from "@/lib/contact";
import { usePortfolioInteraction } from "./interaction-context";

type CommandItem = {
  id: string;
  title: string;
  description: string;
  group: string;
  keywords: string;
  run: () => void;
};

const sections = [
  { id: "hero", title: "Home", keywords: "start top" },
  { id: "projects", title: "Projects", keywords: "work explorer" },
  { id: "toolkit", title: "Capability Map", keywords: "skills toolkit" },
  { id: "about", title: "About", keywords: "story education" },
  { id: "contact", title: "Contact", keywords: "email reach" },
];

export function CommandPalette() {
  const {
    paletteOpen,
    setPaletteOpen,
    selectProject,
    selectSkill,
  } = usePortfolioInteraction();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const items = useMemo<CommandItem[]>(() => {
    const navigateTo = (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      window.history.pushState(null, "", `#${id}`);
    };

    return [
      ...sections.map((section) => ({
        id: `section-${section.id}`,
        title: `Go to ${section.title}`,
        description: `Navigate to the ${section.title.toLowerCase()} section`,
        group: "Sections",
        keywords: section.keywords,
        run: () => navigateTo(section.id),
      })),
      ...projects.map((project) => ({
        id: `project-${project.slug}`,
        title: project.name,
        description: `${project.category} · ${project.status}`,
        group: "Projects",
        keywords: `${project.category} ${project.technologies.join(" ")} ${project.summary}`,
        run: () => {
          selectProject(project.slug);
          navigateTo("projects");
        },
      })),
      ...skills.map((skill) => ({
        id: `skill-${skill.id}`,
        title: skill.name,
        description: skill.description,
        group: "Capabilities",
        keywords: `${skill.category} ${skill.technologies.join(" ")} ${skill.status}`,
        run: () => {
          selectSkill(skill.id);
          navigateTo("toolkit");
        },
      })),
      {
        id: "github-builds",
        title: "GitHub · sushovanbuilds",
        description: "Open development-focused GitHub profile",
        group: "Profiles",
        keywords: "github repository code",
        run: () => { window.open("https://github.com/sushovanbuilds", "_blank", "noopener,noreferrer"); },
      },
      {
        id: "github-projects",
        title: "GitHub · sushovan27",
        description: "Open projects and experiments profile",
        group: "Profiles",
        keywords: "github repository code",
        run: () => { window.open("https://github.com/sushovan27", "_blank", "noopener,noreferrer"); },
      },
      {
        id: "contact-section",
        title: "Open contact section",
        description: "Jump to the contact form",
        group: "Contact",
        keywords: "email message form",
        run: () => navigateTo("contact"),
      },
      {
        id: "contact-email",
        title: "Email Sushovan",
        description: CONTACT_EMAIL,
        group: "Contact",
        keywords: "mailto contact email",
        run: () => { window.location.href = `mailto:${CONTACT_EMAIL}`; },
      },
    ];
  }, [selectProject, selectSkill]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;
    return items.filter((item) =>
      `${item.title} ${item.description} ${item.keywords} ${item.group}`
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [items, query]);

  const close = useCallback(() => setPaletteOpen(false), [setPaletteOpen]);

  const runActive = useCallback(() => {
    const item = filteredItems[activeIndex];
    if (!item) return;
    item.run();
    close();
  }, [activeIndex, close, filteredItems]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement && (
        target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      );
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k" && !isEditing) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      wasOpen.current = true;
      setQuery("");
      setActiveIndex(0);
      const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(focusFrame);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      const restoreTarget = previousFocus.current && previousFocus.current !== document.body
        ? previousFocus.current
        : document.getElementById("mobile-menu-toggle");
      restoreTarget?.focus();
    }
  }, [paletteOpen]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(0, filteredItems.length - 1)));
  }, [filteredItems.length]);

  if (!paletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/45 px-4 pt-[12vh] backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in duration-150"
      onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-border-dark bg-surface-dark text-white shadow-2xl"
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); close(); }
          if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => (index + 1) % Math.max(filteredItems.length, 1)); }
          if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => (index - 1 + filteredItems.length) % Math.max(filteredItems.length, 1)); }
          if (event.key === "Enter") { event.preventDefault(); runActive(); }
          if (event.key === "Tab") {
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled])');
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
          }
        }}
      >
        <div className="flex items-center gap-3 border-b border-border-dark px-4">
          <span aria-hidden="true" className="font-mono text-accent-amber">⌕</span>
          <label id="command-palette-title" className="sr-only" htmlFor="command-palette-search">Search portfolio commands</label>
          <input
            ref={inputRef}
            id="command-palette-search"
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
            placeholder="Search sections, projects, capabilities…"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="command-palette-results"
            aria-activedescendant={filteredItems[activeIndex] ? `command-option-${filteredItems[activeIndex].id}` : undefined}
            className="h-14 min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-zinc-500"
          />
          <kbd className="hidden rounded border border-border-dark px-1.5 py-1 font-mono text-[10px] text-zinc-400 sm:inline">ESC</kbd>
        </div>
        <div id="command-palette-results" role="listbox" aria-label="Portfolio commands" className="max-h-[min(60vh,480px)] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <p className="px-3 py-8 text-center font-mono text-xs text-zinc-400">No matching commands.</p>
          ) : filteredItems.map((item, index) => (
            <button
              id={`command-option-${item.id}`}
              key={item.id}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => { item.run(); close(); }}
              className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors motion-reduce:transition-none ${index === activeIndex ? "bg-white/10 text-white" : "text-zinc-300 hover:bg-white/5"}`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{item.title}</span>
                <span className="block truncate font-mono text-[10px] text-zinc-400">{item.description}</span>
              </span>
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-accent-amber">{item.group}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border-dark px-4 py-2 font-mono text-[10px] text-zinc-500">
          <span>↑ ↓ navigate · Enter select</span>
          <span><kbd>Ctrl</kbd>/<kbd>⌘</kbd> + K</span>
        </div>
      </div>
    </div>
  );
}
