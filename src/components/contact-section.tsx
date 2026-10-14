export function contactSection() {
  return (
    <div className="max-w-md space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-[--text-primary] mb-4">Contact</h2>
      <div className="flex items-center gap-2">
        <a
          href="mailto:sushovanhalderofficial@gmail.com"
          className="text-[--text-primary] hover:underline"
        >
          sushovanhalderofficial@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sushovanbuilds" target="_blank" rel="noopener noreferrer"
          className="text-[--text-primary] hover:underline"
        >
          GitHub: sushovanbuilds
        </a>
      </div>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/sushovan27" target="_blank" rel="noopener noreferrer"
          className="text-[--text-primary] hover:underline"
        >
          GitHub: sushovan27
        </a>
      </div>
    </div>
  );
}
