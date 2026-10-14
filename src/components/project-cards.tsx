import React from "react";
import projectData from "../project-data.json";

export function ProjectCards() {
  const projects = projectData;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight text-[--text-primary] mb-8">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group border border-border-subtle rounded-lg p-6 hover:border-accent-amber transition-colors bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-2">
                <span className="uppercase text-[10px] text-accent-amber font-semibold">
                  {project.category}
                </span>
                <span className="text-[10px] capitalize bg-surface px-2 py-0.5 rounded border border-border-subtle">
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{project.name}</h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-3">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-surface text-text-primary border border-border-subtle rounded px-2 py-0.5 text-[10px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle flex gap-4 text-xs font-mono">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-amber underline hover:text-[#e86b32]"
                >
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-primary underline hover:text-accent-amber"
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}