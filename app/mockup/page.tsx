import {
  Search,
  Star,
  Flame,
  HelpCircle,
  Clock,
  Trophy,
  Activity,
  Eye,
  ThumbsUp,
  MessageCircle,
  Users,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="font-mono text-2xl font-bold text-primary">
              IstilahKata
            </h1>
            <span className="text-sm text-muted-foreground">Beta</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-medium text-primary">
              Beranda
            </a>
            <Link
              href="/words"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Kata-kata
            </Link>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Kontribusi
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Tentang
            </a>
          </nav>

          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
            Masuk
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content (3/4) */}
          <div className="space-y-8 lg:col-span-3">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground">
              <div className="relative z-10 max-w-2xl">
                <h2 className="mb-4 text-3xl font-bold">
                  Temukan Arti Kata Gaul Indonesia
                </h2>
                <p className="mb-6 text-primary-foreground/90">
                  Platform kolaboratif untuk memahami dan berbagi pengetahuan
                  tentang bahasa gaul dari semua generasi
                </p>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
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

            {/* Enhanced Quick Stats */}
            <section>
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="rounded-lg border bg-card p-4 text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">
                    Total Kata
                  </div>
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

            {/* Kata-kata Hari Ini */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <Star className="h-6 w-6 text-accent" />
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
                {/* Word Card 1 - gabut */}
                <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <h4 className="font-mono text-xl font-semibold text-primary">
                      gabut
                    </h4>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      1.2k
                    </span>
                  </div>
                  <p className="mb-4 text-foreground">
                    Akronim dari &quot;gaji buta&quot;. Kondisi bosan atau tidak
                    ada kegiatan yang berarti.
                  </p>

                  {/* Generation and Language Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Generasi Z
                    </span>
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      Milenial
                    </span>
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Bahasa Indonesia
                    </span>
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
                        <span className="text-sm font-medium">@daud</span>
                        <div className="flex items-center gap-1">
                          <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                            Gen Z
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-secondary">
                        <ThumbsUp className="h-4 w-4" />
                        156
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        23
                      </span>
                    </div>
                  </div>
                </div>

                {/* Word Card 2 - kepo */}
                <div className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <h4 className="font-mono text-xl font-semibold text-primary">
                      kepo
                    </h4>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      890
                    </span>
                  </div>
                  <p className="mb-4 text-foreground">
                    Sifat ingin tahu berlebihan, biasanya tentang urusan orang
                    lain.
                  </p>

                  {/* Generation and Language Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Generasi Z
                    </span>
                    <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Bahasa Indonesia
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder/potrait-placeholder.png"
                        alt="@sinta"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div>
                        <span className="text-sm font-medium">@sinta</span>
                        <div className="flex items-center gap-1">
                          <span className="rounded bg-green-100 px-1 py-0.5 text-xs text-green-700">
                            Milenial
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-secondary">
                        <ThumbsUp className="h-4 w-4" />
                        89
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        12
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Generation Highlights - NEW SECTION */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <Users className="h-6 w-6 text-secondary" />
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
                    <span className="text-sm font-semibold">
                      Lintas Generasi
                    </span>
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

            {/* Yang Lagi Populer */}
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
                    <p className="mb-2 text-sm text-muted-foreground">
                      {word.desc}
                    </p>

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

            {/* Kata Belum Jelas */}
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
                          <span className="font-mono font-medium">
                            {word.term}
                          </span>
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

            {/* Kontribusi Baru */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <Clock className="h-6 w-6 text-secondary" />
                  Kontribusi Baru
                </h3>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-l-4 border-l-secondary bg-card p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h5 className="font-mono font-semibold text-primary">
                      bucin
                    </h5>
                    <span className="text-xs text-muted-foreground">
                      2 jam lalu
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-foreground">
                    Budak cinta, seseorang yang sangat tergila-gila pada
                    pasangannya
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder/potrait-placeholder.png"
                        alt="@rani"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="font-mono font-medium">@rani</span>
                      <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                        Gen Z
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-secondary hover:text-secondary/80">
                        <ThumbsUp className="h-3 w-3" />5
                      </button>
                      <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <MessageCircle className="h-3 w-3" />1
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar (1/4) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Enhanced Leaderboard */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Trophy className="h-5 w-5 text-accent" />
                Leaderboard
              </h4>

              <div className="space-y-3">
                {[
                  {
                    rank: 1,
                    user: "@daud",
                    votes: 234,
                    words: "1.2k",
                    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                  {
                    rank: 2,
                    user: "@sinta",
                    votes: 189,
                    words: "890",
                    color: "bg-gradient-to-br from-gray-400 to-gray-600",
                    generation: "Milenial",
                    genColor: "bg-green-100 text-green-700",
                  },
                  {
                    rank: 3,
                    user: "@rani",
                    votes: 156,
                    words: "567",
                    color: "bg-gradient-to-br from-orange-400 to-orange-600",
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                ].map((leader) => (
                  <div
                    key={leader.rank}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`${leader.color} flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white`}
                      >
                        {leader.rank}
                      </span>
                      <div>
                        <span className="font-mono font-medium">
                          {leader.user}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={`rounded px-1 py-0.5 text-xs font-medium ${leader.genColor}`}
                          >
                            {leader.generation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium text-secondary">
                        {leader.votes} votes
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {leader.words} words
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full text-sm font-medium text-primary hover:text-primary/80">
                Lihat Semua Kontributor
              </button>
            </section>

            {/* Enhanced Activities */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Activity className="h-5 w-5 text-secondary" />
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
                  <div
                    key={index}
                    className={`border-l-2 ${activity.color} pb-3 pl-3`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono font-medium">
                        {activity.user}
                      </span>
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

            {/* Quick Actions */}
            <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground">
              <div className="relative z-10">
                <h4 className="mb-4 text-lg font-semibold">Berkontribusi</h4>
                <p className="mb-4 text-sm text-primary-foreground/90">
                  Bantu komunitas dengan menambahkan penjelasan kata baru dari
                  generasi Anda!
                </p>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-card px-4 py-2 font-medium text-primary transition-colors hover:bg-card/90">
                  <Plus className="h-4 w-4" />
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

      {/* Footer */}
      <footer className="mt-16 bg-muted py-8">
        <div className="mx-auto max-w-screen-2xl px-4 text-center">
          <h3 className="mb-2 font-mono text-xl font-bold text-primary">
            IstilahKata
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Platform kolaboratif untuk memahami bahasa gaul dari semua generasi
          </p>
          <div className="flex justify-center gap-6 text-sm">
            {[
              "Tentang",
              "Kebijakan Privasi",
              "Syarat & Ketentuan",
              "Kontak",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            © 2024 IstilahKata. Semua hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
