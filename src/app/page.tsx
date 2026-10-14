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
        <SiteHeader />
        <main className="min-w-0 flex-1 flex flex-col">
          <HeroSection />
          <ProjectShowcase />
          <CapabilityMap />
          <AboutSection />
        </main>
        <ContactSection />
        <CyberTerminal />
        <CommandPalette />
      </div>
    </PortfolioInteractionProvider>
  );
}
