"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Menu, X, Terminal, Command } from "lucide-react";
import { usePortfolioInteraction } from "../portfolio/interaction-context";

interface SiteHeaderProps {
  initialSection?: string;
}

export function SiteHeader({ initialSection = "hero" }: SiteHeaderProps) {
  const { setPaletteOpen } = usePortfolioInteraction();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(initialSection);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isClickNavigating = useRef(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const navItems = [
    { label: "Home", href: "#hero", sectionId: "hero" },
    { label: "Projects", href: "#projects", sectionId: "projects" },
    { label: "Capability Map", href: "#toolkit", sectionId: "toolkit" },
    { label: "Story", href: "#about", sectionId: "about" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ];

  // Helper to update indicator position from active section element
  const updateIndicator = useCallback(() => {
    const activeItem = navItems.find((i) => i.sectionId === activeSection) || navItems[0];
    const el = itemRefs.current[activeItem.href];
    const nav = navRef.current;

    if (el && nav) {
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const left = elRect.left - navRect.left;
      const width = elRect.width;

      setIndicatorStyle({
        left,
        width,
        opacity: 1,
      });
    }
  }, [activeSection]);

  // Recalculate on section change
  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // Keep indicator aligned on window resize & container resize
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (navRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateIndicator();
      });
      resizeObserver.observe(navRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [updateIndicator]);

  // Handle direct hash navigation on initial load and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navItems.some((i) => i.sectionId === hash)) {
        setActiveSection(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash, { passive: true });
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Track scrolled state for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, []);

  // IntersectionObserver to sync active section during manual scrolling
  useEffect(() => {
    const sectionIds = navItems.map((i) => i.sectionId);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isClickNavigating.current) return;

      // Find the entry that has the highest intersection ratio or is in view
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by distance to top or intersection ratio
        visibleEntries.sort((a, b) => {
          const aTop = Math.abs(a.boundingClientRect.top);
          const bTop = Math.abs(b.boundingClientRect.top);
          return aTop - bTop;
        });
        const currentId = visibleEntries[0].target.id;
        if (currentId && currentId !== activeSection) {
          setActiveSection(currentId);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -40% 0px",
      threshold: [0.1, 0.3, 0.6],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);

    // Lock observer temporarily while smooth scrolling
    isClickNavigating.current = true;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      targetEl.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      if (history.pushState) {
        history.pushState(null, "", href);
      }
    }

    clickTimeout.current = setTimeout(() => {
      isClickNavigating.current = false;
    }, 800);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 pointer-events-none px-4 sm:px-6 md:px-12 transition-[padding] duration-300 ease-out ${scrolled ? "py-2.5" : "py-4"}`}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Monogram Insignia */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero", "hero")}
          className={`group relative flex items-center gap-3 px-3.5 py-2 bg-white/90 backdrop-blur-md border border-border-subtle rounded-xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${scrolled ? "shadow-md" : "shadow-xs"}`}
          aria-label="Sushovan Halder Portfolio Home"
        >
          <div           className="w-7 h-7 rounded bg-surface-dark text-white flex items-center justify-center font-display font-bold text-xs tracking-wider transition-[background-color,transform] duration-300 group-hover:rotate-3 group-hover:bg-accent-amber">
            SH
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[11px] font-semibold text-text-primary leading-tight">
              HALDER
            </span>
            <span className="font-mono text-[9px] text-text-muted leading-none">
              CSE // RKMGEC
            </span>
          </div>
        </a>

        {/* Central Floating Pill Navbar with Fluid Sliding Indicator (Desktop) */}
        <nav
          ref={navRef}
          className={`relative hidden md:flex items-center bg-white/95 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-border-subtle transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 ${scrolled ? "shadow-md" : "shadow-xs"}`}
          aria-label="Main Navigation"
        >
          {/* Animated Sliding Pill Highlight */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-surface-dark transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none pointer-events-none"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
            aria-hidden="true"
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.href}
                ref={(el) => {
                  itemRefs.current[item.href] = el;
                }}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-[color,transform] duration-200 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                  isActive
                    ? "text-white"
                    : "text-text-muted hover:text-text-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side: Status Beacon & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden lg:flex items-center gap-2 rounded-full border border-border-subtle bg-white/95 px-3 py-2 font-mono text-[10px] text-text-muted shadow-xs transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent-amber hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Open command palette, Control K or Command K"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span>COMMANDS</span>
            <kbd className="rounded border border-border-subtle px-1 py-0.5 text-[9px]">Ctrl+K / Cmd+K</kbd>
          </button>
          {/* Status Live Beacon */}
          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 bg-white/95 backdrop-blur-md border border-border-subtle rounded-full text-xs font-mono text-text-primary shadow-xs">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-amber opacity-75 motion-reduce:animate-none"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-amber"></span>
            </span>
            <span className="tracking-tight text-[11px] font-medium">
              Open to opportunities
            </span>
          </div>

          {/* Quick Terminal Contact Link */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact", "contact")}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/90 border border-border-subtle text-text-primary shadow-xs transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Direct contact"
          >
            <Terminal className="w-4 h-4 text-text-primary" />
          </a>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/90 border border-border-subtle text-text-primary shadow-xs transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-text-primary" />
            ) : (
              <Menu className="w-4 h-4 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mt-2 max-w-[420px] mx-auto origin-top bg-white/95 backdrop-blur-lg border border-border-subtle rounded-2xl p-4 shadow-lg animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href, item.sectionId);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-mono font-medium flex items-center justify-between transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 ${
                    isActive
                      ? "bg-surface-dark text-white"
                      : "text-text-primary hover:bg-surface"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-accent-amber" : "text-text-muted"}`} />
                </a>
              );
            })}
          </nav>
          <button type="button" onClick={() => { setMobileMenuOpen(false); setPaletteOpen(true); }} className="mt-3 flex w-full items-center justify-between rounded-xl border border-border-subtle bg-surface-paper px-4 py-3 text-left font-mono text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            <span>Open command palette</span><kbd className="text-[10px] text-text-muted">Ctrl+K / Cmd+K</kbd>
          </button>
          <div className="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
              Sushovan Halder · RKMGEC
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
