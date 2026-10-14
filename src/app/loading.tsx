export default function Loading() {
  return (
    <main
      className="min-h-screen bg-surface px-4 py-6 sm:px-8"
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1440px] flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-white/90 px-3.5 py-2 shadow-xs">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-surface-dark font-display text-xs font-bold tracking-wider text-white">
              SH
            </div>
            <div className="space-y-1">
              <div className="h-2.5 w-14 animate-pulse rounded bg-neutral-200" />
              <div className="h-2 w-20 animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
          <div className="hidden h-10 w-72 animate-pulse rounded-full border border-border-subtle bg-white/80 md:block" />
          <div className="h-9 w-9 animate-pulse rounded-full border border-border-subtle bg-white/80" />
        </div>

        <div className="flex flex-1 items-center py-20">
          <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-7">
              <div className="h-3 w-44 animate-pulse rounded bg-accent-amber/30" />
              <div className="space-y-3">
                <div className="h-12 w-full max-w-2xl animate-pulse rounded-lg bg-neutral-200 sm:h-16" />
                <div className="h-12 w-4/5 max-w-xl animate-pulse rounded-lg bg-neutral-200 sm:h-16" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full max-w-lg animate-pulse rounded bg-neutral-200" />
                <div className="h-3 w-4/5 max-w-md animate-pulse rounded bg-neutral-200" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-32 animate-pulse rounded-lg bg-surface-dark/90" />
                <div className="h-10 w-28 animate-pulse rounded-lg border border-border-subtle bg-white" />
              </div>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center lg:col-span-5">
              <div className="absolute inset-8 animate-pulse rounded-full border border-accent-amber/30" />
              <div className="absolute inset-16 rounded-full border border-border-subtle bg-white shadow-xs" />
              <div className="h-24 w-24 animate-pulse rounded-2xl bg-surface-dark" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border-subtle pt-4 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-accent-amber motion-reduce:animate-none" />
          <span>Initializing systems lab</span>
        </div>
      </div>
    </main>
  );
}
