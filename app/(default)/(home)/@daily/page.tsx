import {
  ArrowUpRightIcon,
  EyeIcon,
  MessageCircleIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getDailyWords } from "@/lib/db/queries/homepage";

export default async function DailyWordsSection() {
  const dailyWords = await getDailyWords(6);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <StarIcon className="h-6 w-6 text-accent" />
          Kata-kata Hari Ini
        </h3>
        <Link
          href="/words?sort=top-voted"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {dailyWords.map((word) => (
          <WordCard key={word.id} word={word} />
          // <SubtleWordCard key={word.id} word={word} />
        ))}
      </div>

      {dailyWords.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <StarIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h4 className="mb-2 text-lg font-medium">Belum ada kata hari ini</h4>
          <p className="text-sm">
            Jadilah yang pertama berkontribusi dengan menambahkan penjelasan
            kata!
          </p>
          <Link
            href="/contribute"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Mulai Berkontribusi
          </Link>
        </div>
      )}
    </section>
  );
}

// Word Card Component
const WordCard = ({
  word,
}: {
  word: Awaited<ReturnType<typeof getDailyWords>>[0];
}) => {
  return (
    <Link
      href={`/word/${word.slug}`}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Lihat detail kata ${word.term} yang memiliki ${word.totalExplanations} penjelasan`}
      role="article"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-mono text-xl font-semibold text-primary transition-colors group-hover:text-primary/90">
              {word.term}
            </h4>
            <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </div>
          <span className="flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            <EyeIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
            {word.totalViews.toLocaleString()}
          </span>
        </div>

        {/* Content dengan micro-animations */}
        <p
          className="mb-4 line-clamp-2 text-foreground transition-colors group-hover:text-foreground/90"
          title={word.topExplanation?.content}
        >
          {word.topExplanation?.content ||
            "Belum ada penjelasan terbaik untuk kata ini."}
        </p>

        {/* Tags dengan scale effect */}
        <div className="mb-4 flex flex-wrap gap-2">
          {word.generations.slice(0, 2).map((generation, index: number) => (
            <span
              key={index}
              className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 transition-all duration-200 group-hover:scale-105"
            >
              {generation.name}
            </span>
          ))}
          {word.languages.slice(0, 2).map((language, index: number) => (
            <span
              key={index}
              className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-all duration-200 group-hover:scale-105 group-hover:bg-primary/20"
            >
              {language.flag} {language.name}
            </span>
          ))}
        </div>

        {/* Footer dengan enhanced interactions */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/placeholder/potrait-placeholder.png"
                alt={`@${word.topExplanation?.author.username || "anonymous"}`}
                width={24}
                height={24}
                className="rounded-full transition-transform duration-200 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full opacity-0 ring-2 ring-primary/20 transition-all duration-200 group-hover:opacity-100" />
            </div>
            <span className="text-sm font-medium transition-colors group-hover:text-primary">
              @{word.topExplanation?.author.username || "anonymous"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-secondary transition-all duration-200 group-hover:scale-105">
              <ThumbsUpIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
              {word.topExplanation?.votes || 0}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground transition-all duration-200 group-hover:scale-105 group-hover:text-foreground">
              <MessageCircleIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
              {word.totalExplanations}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
