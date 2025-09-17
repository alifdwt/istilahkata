import { StarIcon } from "lucide-react";

export default function DailyWordsLoading() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarIcon className="h-6 w-6 text-accent" />
          <h3 className="text-2xl font-bold">Kata-kata Hari Ini</h3>
        </div>
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="h-6 w-24 rounded bg-gray-200"></div>
              <div className="h-5 w-16 rounded bg-gray-200"></div>
            </div>

            <div className="mb-4 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            </div>

            <div className="mb-4 flex gap-2">
              <div className="h-6 w-20 rounded bg-gray-200"></div>
              <div className="h-6 w-24 rounded bg-gray-200"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                <div className="space-y-1">
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                  <div className="h-3 w-12 rounded bg-gray-200"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-4 w-8 rounded bg-gray-200"></div>
                <div className="h-4 w-8 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
