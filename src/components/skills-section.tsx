import React from "react";
import skillsJson from "../../skills.json";

export function SkillsSection() {
  const categories = skillsJson.categories;

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight text-[--text-primary] mb-6">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, i) => (
          <div key={i} className="p-4 rounded border border-border-subtle bg-white">
            <h3 className="text-xl font-semibold mb-3 text-text-primary">{category.name}</h3>
            <ul className="space-y-2">
              {category.skills.map((skill, j) => (
                <li key={j} className="text-sm">
                  <span className="font-medium text-text-primary">{skill.label}</span>:{" "}
                  <span className="text-text-muted text-xs">{skill.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}