// Individual skeleton card
function StatCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      {/* Number skeleton */}
      <div className="mx-auto mb-2 h-8 w-16 animate-pulse rounded bg-muted" />

      {/* Label skeleton */}
      <div className="mx-auto mb-1 h-4 w-20 animate-pulse rounded bg-muted" />

      {/* Description skeleton */}
      <div className="mx-auto h-3 w-16 animate-pulse rounded bg-muted" />
    </div>
  );
}

// Main skeleton component
export default function WordsStatsSkeleton() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}
