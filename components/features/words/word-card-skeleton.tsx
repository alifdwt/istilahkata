// Default card skeleton
export function WordCardSkeleton() {
  return (
    <div className="h-full rounded-lg border bg-card p-4">
      {/* Header with badges */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-3">
        <div className="h-7 w-32 animate-pulse rounded bg-muted" />
      </div>

      {/* Content */}
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />
      </div>

      {/* Author info */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-3 w-3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-8 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-6 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-8 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

// Compact card skeleton
export function WordCardCompactSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-5 w-20 animate-pulse rounded bg-muted" />
            <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
          </div>

          <div className="mb-2 space-y-1">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex gap-3">
            <div className="h-3 w-8 animate-pulse rounded bg-muted" />
            <div className="h-3 w-8 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="ml-2 h-4 w-4 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

// List card skeleton
export function WordCardListSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          </div>
        </div>

        <div className="mb-2 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-3 w-3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="h-3 w-8 animate-pulse rounded bg-muted" />
        <div className="h-3 w-6 animate-pulse rounded bg-muted" />
        <div className="h-3 w-8 animate-pulse rounded bg-muted" />
      </div>

      <div className="h-5 w-5 animate-pulse rounded bg-muted" />
    </div>
  );
}

// Featured card skeleton
export function WordCardFeaturedSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 bg-gradient-to-br from-muted/20 to-transparent p-6">
      {/* Featured badge */}
      <div className="absolute top-4 right-4">
        <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-muted/20" />
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-muted/10" />

      <div className="relative">
        {/* Badges */}
        <div className="mb-4 flex gap-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        </div>

        {/* Title */}
        <div className="mb-4 h-8 w-40 animate-pulse rounded bg-muted" />

        {/* Content */}
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

          <div className="mt-3 flex items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

// Grid of skeletons
export function WordCardsGridSkeleton({
  count = 9,
  variant = "default",
}: {
  count?: number;
  variant?: "default" | "compact" | "list" | "featured";
}) {
  const SkeletonComponent = {
    default: WordCardSkeleton,
    compact: WordCardCompactSkeleton,
    list: WordCardListSkeleton,
    featured: WordCardFeaturedSkeleton,
  }[variant];

  if (variant === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        variant === "compact"
          ? "grid-cols-1"
          : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
