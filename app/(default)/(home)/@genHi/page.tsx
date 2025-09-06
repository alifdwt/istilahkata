import { UsersIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GenerationHighlightSlot() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <UsersIcon className="h-6 w-6 text-secondary" />
          Antar Generasi
        </h3>
        <Link
          href="/words?view=generations"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Gen Alpha */}
        <div className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-semibold">Gen Alpha</span>
          </div>
          <div className="space-y-2">
            <Link
              href="/word/skibidi"
              className="block font-mono text-sm text-primary hover:underline"
            >
              skibidi
            </Link>
            <Link
              href="/word/sigma"
              className="block font-mono text-sm text-primary hover:underline"
            >
              sigma
            </Link>
            <Link
              href="/word/ohio"
              className="block font-mono text-sm text-primary hover:underline"
            >
              ohio
            </Link>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            89 kata • Baru dan viral
          </div>
        </div>

        {/* Gen Z */}
        <div className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-semibold">Gen Z</span>
          </div>
          <div className="space-y-2">
            <Link
              href="/word/gabut"
              className="block font-mono text-sm text-primary hover:underline"
            >
              gabut
            </Link>
            <Link
              href="/word/kepo"
              className="block font-mono text-sm text-primary hover:underline"
            >
              kepo
            </Link>
            <Link
              href="/word/toxic"
              className="block font-mono text-sm text-primary hover:underline"
            >
              toxic
            </Link>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            456 kata • Paling aktif
          </div>
        </div>

        {/* Millennial */}
        <div className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-semibold">Milenial</span>
          </div>
          <div className="space-y-2">
            <Link
              href="/word/baper"
              className="block font-mono text-sm text-primary hover:underline"
            >
              baper
            </Link>
            <Link
              href="/word/galau"
              className="block font-mono text-sm text-primary hover:underline"
            >
              galau
            </Link>
            <Link
              href="/word/lebay"
              className="block font-mono text-sm text-primary hover:underline"
            >
              lebay
            </Link>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            324 kata • Workplace humor
          </div>
        </div>

        {/* Cross-Gen */}
        <div className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-500"></div>
            <span className="text-sm font-semibold">Lintas Generasi</span>
          </div>
          <div className="space-y-2">
            <Link
              href="/word/keren"
              className="block font-mono text-sm text-primary hover:underline"
            >
              keren
            </Link>
            <Link
              href="/word/mantap"
              className="block font-mono text-sm text-primary hover:underline"
            >
              mantap
            </Link>
            <Link
              href="/word/oke"
              className="block font-mono text-sm text-primary hover:underline"
            >
              oke
            </Link>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            222 kata • Timeless
          </div>
        </div>
      </div>
    </section>
  );
}
