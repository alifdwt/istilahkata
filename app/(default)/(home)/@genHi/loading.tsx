import { Users } from "lucide-react";

export default function GenerationHighlightLoading() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Antar Generasi</h2>
        </div>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border bg-background p-4"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-gray-200"></div>
                <div>
                  <div className="mb-1 h-4 w-16 rounded bg-gray-200"></div>
                  <div className="h-3 w-12 rounded bg-gray-200"></div>
                </div>
              </div>
              <div className="h-5 w-16 rounded bg-gray-200"></div>
            </div>

            {/* Top words */}
            <div className="mb-3 space-y-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-4 w-full rounded bg-gray-200"></div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="h-3 w-12 rounded bg-gray-200"></div>
              <div className="h-3 w-12 rounded bg-gray-200"></div>
            </div>

            {/* Description */}
            <div className="mt-2 h-3 w-3/4 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
