import { Card, CardContent } from "@/components/ui/card";

export default function WordExplanationsLoading() {
  return (
    <div className="space-y-8">
      {/* Section Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-10 w-40 animate-pulse rounded bg-muted" />
      </div>

      {/* Accepted Explanation Skeleton */}
      <Card className="border-2 border-green-200 bg-green-50/50">
        <CardContent className="p-6">
          {/* Badges skeleton */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-32 animate-pulse rounded-full bg-green-200" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-yellow-200" />
          </div>

          {/* Content skeleton */}
          <div className="mb-4 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

            {/* Example skeleton */}
            <div className="rounded-lg border-l-4 border-primary bg-muted/50 p-4">
              <div className="mb-1 h-3 w-28 animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between border-t border-green-200 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                <div>
                  <div className="mb-1 h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-12 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              <div className="h-8 w-12 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Explanations Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="h-5 w-8 animate-pulse rounded-full bg-muted" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                {/* Header skeleton */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-8 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                </div>

                {/* Content skeleton */}
                <div className="mb-4 space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>

                {/* Footer skeleton */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
                      <div>
                        <div className="mb-1 h-4 w-20 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-8 w-12 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-10 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More Skeleton */}
      <div className="text-center">
        <div className="mx-auto h-10 w-48 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
