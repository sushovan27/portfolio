# Architecture Notes

This is a recommended architecture, not an instruction to migrate an existing repository automatically. First inspect the current codebase and reuse its framework if viable.

## Recommended stack (if starting from scratch)

- Next.js App Router + TypeScript.
- Tailwind CSS or the existing styling approach, with shared CSS variables.
- Motion: CSS transitions for routine micro-interactions; add Framer Motion only if the existing project benefits from it.
- 3D: React Three Fiber / Three.js only if a suitable model and performance budget are available. Start with an optimized static asset fallback.
- Icons: one consistent icon set such as Lucide.
- Content: TypeScript or JSON data under `src/content/`.
- Hosting: choose based on existing domain/workflow; do not assume a deployment platform is configured.

## Suggested structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    projects/
      [slug]/
        page.tsx
  components/
    layout/
      site-header.tsx
      site-footer.tsx
      section-heading.tsx
    hero/
      hero-section.tsx
      cybernetic-visual.tsx
      focus-selector.tsx
      technical-panel.tsx
    projects/
      project-feature.tsx
      project-list.tsx
      project-case-study.tsx
    toolkit/
      capability-map.tsx
      capability-details.tsx
    about/
      about-section.tsx
      timeline.tsx
    contact/
      contact-section.tsx
      contact-form.tsx
    motion/
      reveal.tsx
  content/
    profile.ts
    projects.json
    skills.json
  lib/
    github.ts
    motion.ts
public/
  images/
  models/
```

Adapt these names to the repository’s existing framework and conventions. Avoid unnecessary component fragmentation.

## Profile and project data

Keep the site content data-driven. Content records should be validated and be easy to update without editing large JSX components.

Projects should use explicit fields:
- `slug`
- `name`
- `summary`
- `category`
- `status`
- `technologies`
- `repositoryUrl`
- `liveUrl`
- `previewImage`
- `featured`
- `verified`
- `notes`

Do not put secrets or tokens in client-side code.

## Optional GitHub integration

Prefer a build-time or server-side public GitHub API fetch with caching when live metadata is useful. Public portfolio rendering must not require an authenticated token. If a token is used server-side, store it in environment variables and never expose it to the browser.

For reliability, static curated project data is acceptable. Do not depend on live API calls for the main page to render. GitHub stats widgets are optional and should not be a central design component.

## Contact form

Do not create a form that pretends to send messages without a backend. Either:
- implement a real endpoint/provider with environment configuration and validation, or
- use a mailto link and clearly label it as email contact.

Never add API keys to client code.

## 3D asset strategy

1. Use the included hero image or a properly licensed original model.
2. Always provide a responsive static image fallback.
3. Load heavy 3D code only when appropriate.
4. Respect reduced motion and mobile performance.
5. Keep controls accessible; the core meaning of the page must not depend on 3D.
