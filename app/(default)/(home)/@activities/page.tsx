import { ActivityIcon } from "lucide-react";
import React from "react";

export default function ActivitiesSlot() {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <ActivityIcon className="h-5 w-5 text-secondary" />
        Aktivitas Terbaru
      </h4>

      <div className="space-y-3">
        {[
          {
            user: "@rani",
            action: "menambah penjelasan untuk",
            term: "bucin",
            time: "2 jam lalu",
            color: "border-secondary",
            generation: "Gen Z",
            genColor: "bg-blue-100 text-blue-700",
          },
          {
            user: "@budi",
            action: "berkomentar di",
            term: "gabut",
            time: "3 jam lalu",
            color: "border-primary",
            generation: "Milenial",
            genColor: "bg-green-100 text-green-700",
          },
          {
            user: "@david",
            action: "meminta penjelasan untuk",
            term: "mantul",
            time: "5 jam lalu",
            color: "border-accent",
            generation: "Gen X",
            genColor: "bg-orange-100 text-orange-700",
          },
          {
            user: "@sinta",
            action: "mendapat 10 votes untuk penjelasan",
            term: "kepo",
            time: "6 jam lalu",
            color: "border-chart-4",
            generation: "Milenial",
            genColor: "bg-green-100 text-green-700",
          },
        ].map((activity, index) => (
          <div key={index} className={`border-l-2 ${activity.color} pb-3 pl-3`}>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono font-medium">{activity.user}</span>
              <span
                className={`rounded px-1 py-0.5 text-xs font-medium ${activity.genColor}`}
              >
                {activity.generation}
              </span>
            </div>
            <p className="text-sm">
              {activity.action}{" "}
              <span className="font-mono font-medium text-primary">
                {activity.term}
              </span>
            </p>
            <span className="text-xs text-muted-foreground">
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
        Lihat Semua Aktivitas
      </button>
    </section>
  );
}
