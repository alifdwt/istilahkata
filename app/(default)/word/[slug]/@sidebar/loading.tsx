import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WordSidebarLoading() {
  return (
    <div className="space-y-6">
      {/* Quick Stats Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-5 w-20 animate-pulse rounded bg-muted" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>
          ))}

          {/* Generation badge skeleton */}
          <div className="border-t pt-2">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Words Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 h-5 w-20 animate-pulse rounded bg-muted" />
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-12 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-8 animate-pulse rounded bg-muted" />
                  </div>
                </div>
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}

          {/* View more skeleton */}
          <div className="py-2 text-center">
            <div className="mx-auto h-4 w-40 animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Ranking badge skeleton */}
              <div className="h-7 w-7 animate-pulse rounded-full bg-muted" />

              {/* Avatar skeleton */}
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />

              {/* User info skeleton */}
              <div className="flex-1">
                <div className="mb-1 h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-8 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}

          {/* Leaderboard link skeleton */}
          <div className="py-2 text-center">
            <div className="mx-auto h-4 w-36 animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Analytics Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-5 w-16 animate-pulse rounded bg-muted" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
