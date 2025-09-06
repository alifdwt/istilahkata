import { HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function UnclearWordsSlot() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <HelpCircle className="h-6 w-6 text-accent" />
          Kata Belum Jelas
        </h3>
        <Link
          href="/words?filter=unclear"
          className="font-medium text-primary hover:text-primary/80"
        >
          Bantu Jelaskan
        </Link>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              term: "mantul",
              count: 0,
              user: "@david",
              generation: "Unknown",
              genColor: "bg-gray-100 text-gray-700",
            },
            {
              term: "ambyar",
              count: 1,
              user: "@budi",
              generation: "Gen X",
              genColor: "bg-orange-100 text-orange-700",
            },
          ].map((word) => (
            <div
              key={word.term}
              className="flex items-center justify-between rounded-lg bg-muted p-3"
            >
              <div className="flex items-center gap-3">
                <div>
                  <span className="font-mono font-medium">{word.term}</span>
                  <div className="mt-1 flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt={word.user}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      {word.user}
                    </span>
                    <span
                      className={`rounded px-1 py-0.5 text-xs font-medium ${word.genColor}`}
                    >
                      {word.generation}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  {word.count} penjelasan
                </span>
                <button className="rounded bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90">
                  Bantu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
