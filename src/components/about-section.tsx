export function aboutSection() {
  return (
    <div className="prose-lg max-w-prose">
      <h2 className="text-2xl font-bold tracking-tight text-[--text-primary] mb-6">About</h2>
      <p>
        I'm Sushovan Halder, a Computer Science and Engineering student at RKfEC. I enjoy learning by building: creating web experiences, exploring developer tools, experimenting with systems and AI workflows, and turning ideas into working software.
      </p>
      <p>
        My interests include web engineering, programming fundamentals, Linux environments, command-line tools, and exploring how AI tools can support development. I use side projects to test ideas, understand trade-offs, and build practical skills one iteration at a time.
      </p>
      <p>
        This portfolio is a living record of that process: things I've built, experiments I'm working through, problems I've learned from, and directions I want to explore next.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-fboldext text-[--text-primary] mb-3">Gitghnical Foundation</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[--text-on-dark]">
            <li>Web development and interactive UI</li>
            <li>Software and software engineering fundamentals</li>
            <li>Linux and tooling, Linux and CLI environments</li>
            <li>Automation and AI workflows</li>
            <li>Security learning and ethical security exploration</li>
          </ul>
        </div>
        <div>
          <h3 className="font-fboldext text-[--text-primary] mb-3">Social Links</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[--text-on-dark]">
            <li>
              <a href="https://github.com/sushovanbuilds" target="_blank" rel="noopener noreferrer" className="text-[--accent-amber] underline">
                GitHub — development-focused profile
              </a>
            </li>
            <li>
              <a href="https://github.com/sushovan27" target="_blank" rel="noopener noreferrer" className="text-[--accent-amber] underline">
                GitHub — projects and experiments
              </a>
            </li>
            <li>
              <a href="mailto:sushovanhalderofficial@gmail.com" className="text-[--accent-amber] underline">
                sushovanhalderofficial@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
