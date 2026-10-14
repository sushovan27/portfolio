"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import projects from "@/content/projects.json";
import skills from "@/content/skills.json";

type InteractionContextValue = {
  selectedProjectSlug: string;
  selectedSkillId: string;
  selectProject: (slug: string) => void;
  selectSkill: (id: string) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

const InteractionContext = createContext<InteractionContextValue | null>(null);

export function PortfolioInteractionProvider({ children }: { children: ReactNode }) {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(projects[0].slug);
  const [selectedSkillId, setSelectedSkillId] = useState(skills[0].id);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const selectProject = (slug: string) => {
    if (!projects.some((project) => project.slug === slug)) return;
    setSelectedProjectSlug(slug);
    setSelectedSkillId((currentId) => {
      const currentSkill = skills.find((skill) => skill.id === currentId);
      if (currentSkill?.projectSlugs.includes(slug)) return currentId;
      return skills.find((skill) => skill.projectSlugs.includes(slug))?.id ?? currentId;
    });
  };

  const selectSkill = (id: string) => {
    const skill = skills.find((entry) => entry.id === id);
    if (!skill) return;
    setSelectedSkillId(id);
    if (!skill.projectSlugs.includes(selectedProjectSlug) && skill.projectSlugs[0]) {
      setSelectedProjectSlug(skill.projectSlugs[0]);
    }
  };

  return (
    <InteractionContext.Provider value={{
      selectedProjectSlug,
      selectedSkillId,
      selectProject,
      selectSkill,
      paletteOpen,
      setPaletteOpen,
    }}>
      {children}
    </InteractionContext.Provider>
  );
}

export function usePortfolioInteraction() {
  const context = useContext(InteractionContext);
  if (!context) throw new Error("Portfolio interactions require PortfolioInteractionProvider.");
  return context;
}
