import { SearchIcon } from "lucide-react";
import React from "react";

export default function HeroSlot() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground">
      <div className="relative z-10 max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold">
          Temukan Arti Kata Gaul Indonesia
        </h2>
        <p className="mb-6 text-primary-foreground/90">
          Platform kolaboratif untuk memahami dan berbagi pengetahuan tentang
          bahasa gaul dari semua generasi
        </p>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kata gaul dari semua generasi... (gabut, skibidi, baper)"
            className="w-full rounded-lg border border-border bg-card py-3 pr-4 pl-12 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-primary-foreground/10" />
      <div className="absolute right-16 bottom-0 -mb-8 h-24 w-24 rounded-full bg-primary-foreground/5" />
    </section>
  );
}
