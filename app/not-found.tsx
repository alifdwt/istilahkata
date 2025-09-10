import { Search, Home, BookOpen, MessageSquare, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan | IstilahKata",
  description:
    "Halaman yang Anda cari tidak ditemukan. Jelajahi kata-kata gaul dari berbagai generasi di IstilahKata.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* 404 Display */}
        <div className="relative">
          <div className="text-8xl font-bold text-muted-foreground/20 select-none md:text-9xl">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 md:h-24 md:w-24">
              <Search className="h-10 w-10 text-primary md:h-12 md:w-12" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            Ups! Halaman yang Anda cari tidak ditemukan. Mungkin kata yang Anda
            cari belum ada di kamus kami?
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold">
            <Search className="h-5 w-5 text-primary" />
            Coba Cari Kata Gaul
          </h3>
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari kata gaul..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary focus:outline-none"
                autoFocus
              />
            </div>
            <button className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none">
              Cari
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="group flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Beranda</h4>
              <p className="text-sm text-muted-foreground">
                Kembali ke halaman utama
              </p>
            </div>
          </Link>

          <Link
            href="/words"
            className="group flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
              <BookOpen className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Jelajahi Kata</h4>
              <p className="text-sm text-muted-foreground">
                Lihat semua kata gaul
              </p>
            </div>
          </Link>

          <Link
            href="/contribute"
            className="group flex flex-col items-center gap-3 rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 transition-colors group-hover:bg-secondary/20">
              <MessageSquare className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Kontribusi</h4>
              <p className="text-sm text-muted-foreground">Tambah kata baru</p>
            </div>
          </Link>
        </div>

        {/* Popular Words */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Kata Populer</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "baper",
              "gabut",
              "kepo",
              "bucin",
              "skuy",
              "vibes",
              "fomo",
              "bestie",
              "anjay",
              "ghosting",
            ].map((word) => (
              <Link
                key={word}
                href={`/word/${word}`}
                className="rounded-full bg-muted px-3 py-1 font-mono text-sm font-medium transition-colors hover:bg-muted/80 hover:text-primary"
              >
                {word}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Footer Help */}
        <div className="border-t border-border pt-6">
          <p className="mb-3 text-sm text-muted-foreground">
            Masih butuh bantuan?
          </p>
          <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
            <Link
              href="/help"
              className="text-primary transition-colors hover:text-primary/80"
            >
              Pusat Bantuan
            </Link>
            <span className="hidden text-muted-foreground sm:inline">•</span>
            <Link
              href="/contact"
              className="text-primary transition-colors hover:text-primary/80"
            >
              Hubungi Kami
            </Link>
            <span className="hidden text-muted-foreground sm:inline">•</span>
            <Link
              href="/about"
              className="text-primary transition-colors hover:text-primary/80"
            >
              Tentang IstilahKata
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
