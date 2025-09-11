export default function WordHeaderDefault() {
  return (
    <section className="rounded-xl border bg-card p-8">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          {/* Title skeleton */}
          <div className="mb-3 h-10 w-48 animate-pulse rounded-lg bg-muted lg:h-12 lg:w-64" />

          {/* Context skeleton */}
          <div className="mb-4 rounded-lg bg-muted/50 p-4">
            <div className="mb-2 h-3 w-28 animate-pulse rounded bg-muted" />
            <div className="h-5 w-full max-w-md animate-pulse rounded bg-muted" />
          </div>

          {/* Stats skeleton */}
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-8 animate-pulse rounded bg-muted" />
                <div className="h-4 w-12 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="ml-4 flex items-start gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-9 w-9 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Tags and metadata skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tags skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>

        {/* User info skeleton */}
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </section>
  );
}
