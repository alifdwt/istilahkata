import { Activity, MessageSquare, User, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getRecentActivities } from "@/lib/db/queries/homepage";
import { formatRelativeTime } from "@/lib/utils";

export default async function ActivitiesSlot() {
  // Fetch recent activities from database
  const recentActivities = await getRecentActivities(6); // Get 6 recent activities

  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Activity className="h-5 w-5 text-secondary" />
        Aktivitas Terbaru
      </h4>

      {recentActivities.length === 0 ? (
        <div className="py-8 text-center">
          <Activity className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Belum ada aktivitas terbaru
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      )}

      <Link
        href="/activities"
        className="mt-4 block w-full text-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        Lihat Semua Aktivitas
      </Link>
    </section>
  );
}

// Activity Item Component
const ActivityItem = ({
  activity,
  index,
}: {
  activity: Awaited<ReturnType<typeof getRecentActivities>>[0];
  index: number;
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "explanation":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "vote":
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBorderColor = (index: number) => {
    const colors = [
      "border-blue-500",
      "border-green-500",
      "border-orange-500",
      "border-purple-500",
      "border-pink-500",
      "border-cyan-500",
    ];
    return colors[index % colors.length];
  };

  const getActivityDescription = (type: string) => {
    switch (type) {
      case "explanation":
        return "memberikan penjelasan untuk kata";
      case "comment":
        return "berkomentar pada kata";
      case "vote":
        return "memberikan vote pada kata";
      default:
        return "beraktivitas pada kata";
    }
  };

  return (
    <Link
      href={`/word/${activity.relatedWord.slug}`}
      className={`group block rounded-r-lg border-l-2 pb-3 pl-3 transition-colors hover:bg-muted/30 ${getBorderColor(
        index
      )}`}
    >
      <div className="flex items-start gap-2">
        {/* Activity Icon */}
        <div className="mt-0.5 flex-shrink-0">
          {getActivityIcon(activity.type)}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* User info */}
          <div className="mb-1 flex items-center gap-2">
            <User className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-sm font-medium text-foreground transition-colors group-hover:text-primary">
              @{activity.user.username}
            </span>
            {activity.user.displayName && (
              <span className="truncate text-xs text-muted-foreground">
                ({activity.user.displayName})
              </span>
            )}
          </div>

          {/* Activity description */}
          <p className="text-sm text-foreground transition-colors group-hover:text-foreground/90">
            {getActivityDescription(activity.type)}{" "}
            <span className="font-mono font-medium text-primary transition-colors group-hover:text-primary/80">
              {activity.relatedWord.term}
            </span>
          </p>

          {/* Timestamp */}
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <time dateTime={activity.createdAt.toISOString()}>
              {formatRelativeTime(activity.createdAt)}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};
