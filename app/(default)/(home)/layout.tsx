import { PlusIcon } from "lucide-react";
import React from "react";

export default function HomeLayout({
  children,
  hero,
  stats,
  daily,
  genHi,
  trending,
  unclear,
  contributions,
  leaderboard,
  activities,
}: {
  children: React.ReactNode;
  hero: React.ReactNode;
  stats: React.ReactNode;
  daily: React.ReactNode;
  genHi: React.ReactNode;
  trending: React.ReactNode;
  unclear: React.ReactNode;
  contributions: React.ReactNode;
  leaderboard: React.ReactNode;
  activities: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content (3/4) */}
        <div className="space-y-8 lg:col-span-3">
          {hero}
          {stats}
          {daily}
          {genHi}
          {trending}
          {unclear}
          {contributions}
        </div>

        <div className="space-y-6 lg:col-span-1">
          {leaderboard}
          {activities}
          {/* Quick Actions */}
          <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
            <div className="relative z-10">
              <h4 className="mb-4 text-lg font-semibold">Berkontribusi</h4>
              <p className="mb-4 text-sm text-primary-foreground/90">
                Bantu komunitas dengan menambahkan penjelasan kata baru dari
                generasi Anda!
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-card px-4 py-2 font-medium text-primary transition-colors hover:bg-card/90">
                <PlusIcon className="h-4 w-4" />
                Tambah Kata
              </button>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-2 -mr-2 h-16 w-16 rounded-full bg-primary-foreground/10" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-12 w-12 rounded-full bg-primary-foreground/5" />
          </section>
        </div>
      </div>
    </div>
  );
}
