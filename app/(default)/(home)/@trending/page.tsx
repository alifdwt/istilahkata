import { Eye, Flame, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TrendingSlot() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <Flame className="h-6 w-6 text-accent" />
          Yang Lagi Populer
        </h3>
        <Link
          href="/words?filter=trending"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            term: "baper",
            desc: "Bawa perasaan, terlalu sensitif",
            votes: 67,
            views: 456,
            generation: "Milenial",
            genColor: "bg-green-100 text-green-700",
            user: "@sinta",
          },
          {
            term: "skuy",
            desc: "Ajakan untuk pergi bersama",
            votes: 43,
            views: 234,
            generation: "Gen Z",
            genColor: "bg-blue-100 text-blue-700",
            user: "@rani",
          },
          {
            term: "ghosting",
            desc: "Menghilang tanpa kabar",
            votes: 89,
            views: 567,
            generation: "Gen Z",
            genColor: "bg-blue-100 text-blue-700",
            user: "@alex",
          },
        ].map((word) => (
          <div
            key={word.term}
            className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-sm"
          >
            <h5 className="mb-2 font-mono font-semibold text-primary">
              {word.term}
            </h5>
            <p className="mb-2 text-sm text-muted-foreground">{word.desc}</p>

            {/* Generation Tag */}
            <div className="mb-2">
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${word.genColor}`}
              >
                {word.generation}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder/potrait-placeholder.png"
                  alt={word.user}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                <span>{word.user}</span>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 text-secondary" />
                  {word.votes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {word.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
