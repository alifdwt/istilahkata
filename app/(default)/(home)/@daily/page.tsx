import {
  EyeIcon,
  MessageCircleIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DailyWords {
  id: string;
  slug: string;
  title: string;
  description: string;
  meta: {
    views: string;
    likes: string;
    comments: string;
  };
  tags: {
    languages: string[];
    generations: string[];
  };
  user: {
    username: string;
    generation: string;
  };
}

export default function DailyWordsSlot() {
  const data: DailyWords[] = [
    {
      id: "1",
      slug: "gabut",
      title: "gabut",
      description:
        'Akronim dari "gaji buta". Kondisi bosan atau tidak ada kegiatan yang berarti.',
      meta: {
        views: "1.2k",
        likes: "156",
        comments: "23",
      },
      tags: {
        languages: ["Bahasa Indonesia"],
        generations: ["Generasi Z", "Milenial"],
      },
      user: {
        username: "daud",
        generation: "Generasi Z",
      },
    },
    {
      id: "2",
      slug: "kepo",
      title: "kepo",
      description:
        "Sifat ingin tahu berlebihan, biasanya tentang urusan orang lain.",
      meta: {
        views: "890",
        likes: "89",
        comments: "12",
      },
      tags: {
        languages: ["Bahasa Indonesia"],
        generations: ["Generasi Z"],
      },
      user: {
        username: "sinta",
        generation: "Milenial",
      },
    },
  ];
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-2xl font-bold">
          <StarIcon className="h-6 w-6 text-accent" />
          Kata-kata Hari Ini
        </h3>
        <Link
          href="/words"
          className="font-medium text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </section>
  );
}

const WordCard = ({ word }: { word: DailyWords }) => {
  return (
    <Link
      className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
      href={`/words/${word.slug}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <h4 className="font-mono text-xl font-semibold text-primary">
          {word.title}
        </h4>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <EyeIcon className="h-4 w-4" />
          {word.meta.views}
        </span>
      </div>
      <p className="mb-4 text-foreground">{word.description}</p>

      {/* Generation and Language Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {word.tags.generations.map((generation) => (
          <span
            key={generation}
            className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
          >
            {generation}
          </span>
        ))}
        {word.tags.languages.map((language) => (
          <span
            key={language}
            className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
          >
            {language}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Image
            src="/placeholder/potrait-placeholder.png"
            alt="@daud"
            width={24}
            height={24}
            className="rounded-full"
          />
          <div>
            <span className="text-sm font-medium">@{word.user.username}</span>
            <div className="flex items-center gap-1">
              <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                {word.user.generation}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-secondary">
            <ThumbsUpIcon className="h-4 w-4" />
            {word.meta.likes}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MessageCircleIcon className="h-4 w-4" />
            {word.meta.comments}
          </span>
        </div>
      </div>
    </Link>
  );
};
