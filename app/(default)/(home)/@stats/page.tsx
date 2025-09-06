import React from "react";

export default function StatsSlot() {
  return (
    <section>
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">1,247</div>
          <div className="text-sm text-muted-foreground">Total Kata</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">456</div>
          <div className="text-sm text-muted-foreground">Gen Z</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">324</div>
          <div className="text-sm text-muted-foreground">Milenial</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">89</div>
          <div className="text-sm text-muted-foreground">Gen Alpha</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">156</div>
          <div className="text-sm text-muted-foreground">Gen X</div>
        </div>
      </div>
    </section>
  );
}
