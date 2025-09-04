import {
  Search,
  Grid,
  List,
  Plus,
  Eye,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Clock,
  X,
  Zap,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WordsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-mono text-2xl font-bold text-primary"
            >
              IstilahKata
            </Link>
            <span className="text-sm text-muted-foreground">Beta</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Beranda
            </Link>
            <Link href="/words" className="font-medium text-primary">
              Kata-kata
            </Link>
            <Link
              href="/contribute"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Kontribusi
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              Tentang
            </Link>
          </nav>

          <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
            Masuk
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-screen-2xl px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-foreground">Kata-kata</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                Jelajahi Kata-kata Gaul
              </h1>
              <p className="text-muted-foreground">
                Temukan dan pelajari arti dari ribuan kata gaul Indonesia dan
                bahasa lainnya
              </p>
            </div>
            <button className="flex w-fit items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Tambah Kata
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Total Kata</div>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-secondary">89</div>
              <div className="text-sm text-muted-foreground">Kata Baru</div>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-sm text-muted-foreground">Trending</div>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-chart-4">67</div>
              <div className="text-sm text-muted-foreground">Butuh Bantuan</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters (1/4) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Search */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Pencarian</h3>
              <div className="relative mb-4">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari kata..."
                  className="w-full rounded-lg border bg-background py-2 pr-4 pl-10 text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
              <button className="w-full rounded-lg bg-primary py-2 text-primary-foreground transition-colors hover:bg-primary/90">
                Cari
              </button>
            </div>

            {/* Quick Filters */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Filter Cepat</h3>
              <div className="space-y-2">
                {[
                  { label: "Semua Kata", count: 1247, active: true },
                  { label: "Trending", count: 156, icon: TrendingUp },
                  { label: "Terbaru", count: 89, icon: Clock },
                  { label: "Perlu Penjelasan", count: 67, icon: HelpCircle },
                  { label: "Lengkap", count: 892, icon: CheckCircle },
                ].map((filter) => (
                  <button
                    key={filter.label}
                    className={`flex w-full items-center justify-between rounded-lg p-2 transition-colors ${
                      filter.active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {filter.icon && <filter.icon className="h-4 w-4" />}
                      <span className="text-sm">{filter.label}</span>
                    </div>
                    <span className="text-xs opacity-75">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generation Filter */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Generasi</h3>
              <div className="space-y-2">
                {[
                  {
                    label: "Generasi Alpha",
                    count: 89,
                    color: "bg-purple-100 text-purple-700",
                    years: "2010-2025",
                  },
                  {
                    label: "Generasi Z",
                    count: 456,
                    color: "bg-blue-100 text-blue-700",
                    years: "1997-2012",
                  },
                  {
                    label: "Milenial",
                    count: 324,
                    color: "bg-green-100 text-green-700",
                    years: "1981-1996",
                  },
                  {
                    label: "Generasi X",
                    count: 156,
                    color: "bg-orange-100 text-orange-700",
                    years: "1965-1980",
                  },
                  {
                    label: "Lintas Generasi",
                    count: 222,
                    color: "bg-gray-100 text-gray-700",
                    years: "Universal",
                  },
                ].map((gen) => (
                  <label
                    key={gen.label}
                    className="group flex cursor-pointer items-center gap-3"
                  >
                    <input type="checkbox" className="rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{gen.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {gen.years}
                      </div>
                    </div>
                    <span className={`rounded px-2 py-1 text-xs ${gen.color}`}>
                      {gen.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Bahasa</h3>
              <div className="space-y-2">
                {[
                  {
                    label: "Bahasa Indonesia",
                    count: 892,
                    color: "bg-primary/10 text-primary",
                  },
                  {
                    label: "Bahasa Inggris",
                    count: 234,
                    color: "bg-secondary/10 text-secondary",
                  },
                  {
                    label: "Bahasa Jawa",
                    count: 89,
                    color: "bg-accent/10 text-accent",
                  },
                  {
                    label: "Bahasa Sunda",
                    count: 32,
                    color: "bg-chart-4/10 text-chart-4",
                  },
                ].map((language) => (
                  <label
                    key={language.label}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <input type="checkbox" className="rounded" />
                    <span className="flex-1 text-sm">{language.label}</span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${language.color}`}
                    >
                      {language.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Suggested Words */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Zap className="h-4 w-4 text-accent" />
                Butuh Bantuan
              </h3>
              <div className="space-y-2">
                {["mantul", "skuy", "ambyar"].map((word) => (
                  <Link
                    key={word}
                    href={`/word/${word}`}
                    className="block rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <div className="font-mono text-sm font-medium text-primary">
                      {word}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Belum ada penjelasan
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content (3/4) */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Menampilkan 1-24 dari 1,247 kata
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filter:</span>
                  <div className="flex items-center gap-1">
                    <span className="flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                      Generasi Z
                      <X className="h-3 w-3 cursor-pointer" />
                    </span>
                    <span className="flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Bahasa Indonesia
                      <X className="h-3 w-3 cursor-pointer" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select className="rounded-lg border bg-card px-3 py-2 text-sm">
                  <option>Terpopuler</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                  <option>Terbaru</option>
                  <option>Terlama</option>
                  <option>Most Viewed</option>
                </select>

                <div className="flex rounded-lg border">
                  <button className="rounded-l-lg bg-primary p-2 text-primary-foreground">
                    <Grid className="h-4 w-4" />
                  </button>
                  <button className="rounded-r-lg p-2 hover:bg-muted">
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Words Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Word Card - gabut (Gen Z, Trending) */}
              <div className="relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 rounded bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </span>
                </div>

                <div className="mb-4">
                  <Link href="/word/gabut" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      gabut
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      Akronim dari &quot;gaji buta&quot;. Kondisi bosan atau
                      tidak ada kegiatan yang berarti...
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Generasi Z
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      2.4k
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      342
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      28
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@daud"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">@daud</span>
                  </div>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Lengkap
                  </span>
                </div>
              </div>

              {/* Word Card - baper (Millennial + Gen Z) */}
              <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="mb-4">
                  <Link href="/word/baper" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      baper
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      Bawa perasaan. Kondisi seseorang yang terlalu sensitif
                      atau mudah tersinggung...
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Milenial
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Generasi Z
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      1.8k
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      156
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      12
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@sinta"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      @sinta
                    </span>
                  </div>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Lengkap
                  </span>
                </div>
              </div>

              {/* Word Card - skibidi (Gen Alpha) */}
              <div className="relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="absolute top-4 right-4">
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    Baru
                  </span>
                </div>

                <div className="mb-4">
                  <Link href="/word/skibidi" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      skibidi
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      Kata nonsense yang populer di kalangan Gen Alpha, sering
                      digunakan dalam meme dan konten viral...
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    Generasi Alpha
                  </span>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Bahasa Inggris
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      892
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      45
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />8
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@alex_alpha"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      @alex_alpha
                    </span>
                  </div>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Lengkap
                  </span>
                </div>
              </div>

              {/* Word Card - mantul (Needs Help) */}
              <div className="relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 rounded bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                    <HelpCircle className="h-3 w-3" />
                    Perlu Bantuan
                  </span>
                </div>

                <div className="mb-4">
                  <Link href="/word/mantul" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      mantul
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      Belum ada penjelasan untuk kata ini. Bantu komunitas
                      dengan menambahkan penjelasan!
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    Generasi Tidak Diketahui
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      234
                    </span>
                    <span className="flex items-center gap-1 text-destructive">
                      <HelpCircle className="h-3 w-3" />0 penjelasan
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@david"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      @david
                    </span>
                  </div>
                  <button className="rounded bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90">
                    Bantu
                  </button>
                </div>
              </div>

              {/* Word Card - keren (Cross Generational) */}
              <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="mb-4">
                  <Link href="/word/keren" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      keren
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      Kata untuk mengekspresikan kekaguman atau pujian.
                      Digunakan lintas generasi dengan makna yang konsisten...
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                    Lintas Generasi
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      3.2k
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      278
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      34
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@budi_90s"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      @budi_90s
                    </span>
                  </div>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Lengkap
                  </span>
                </div>
              </div>

              {/* Word Card - jayus (Gen X + Millennial) */}
              <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="mb-4">
                  <Link href="/word/jayus" className="block">
                    <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                      jayus
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      Lelucon atau tingkah laku yang tidak lucu, kaku, atau
                      garing. Popular di era 90an-2000an...
                    </p>
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                    Generasi X
                  </span>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Milenial
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Bahasa Indonesia
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      1.1k
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      89
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      15
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@retro_guy"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs text-muted-foreground">
                      @retro_guy
                    </span>
                  </div>
                  <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                    Lengkap
                  </span>
                </div>
              </div>

              {/* Additional word cards */}
              {[
                {
                  word: "lit",
                  generation: "Generasi Z",
                  genColor: "bg-blue-100 text-blue-700",
                  lang: "Bahasa Inggris",
                  langColor: "bg-secondary/10 text-secondary",
                  user: "@zoe_2003",
                  views: "892",
                  votes: "67",
                  comments: "12",
                },
                {
                  word: "cupu",
                  generation: "Generasi X",
                  genColor: "bg-orange-100 text-orange-700",
                  lang: "Bahasa Indonesia",
                  langColor: "bg-primary/10 text-primary",
                  user: "@vintage_80s",
                  views: "456",
                  votes: "34",
                  comments: "8",
                },
                {
                  word: "galau",
                  generation: "Milenial",
                  genColor: "bg-green-100 text-green-700",
                  lang: "Bahasa Indonesia",
                  langColor: "bg-primary/10 text-primary",
                  user: "@blogger_2010",
                  views: "1.5k",
                  votes: "123",
                  comments: "18",
                },
              ].map((item) => (
                <div
                  key={item.word}
                  className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4">
                    <Link href={`/word/${item.word}`} className="block">
                      <h3 className="mb-2 font-mono text-xl font-bold text-primary">
                        {item.word}
                      </h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor...
                      </p>
                    </Link>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${item.genColor}`}
                    >
                      {item.generation}
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${item.langColor}`}
                    >
                      {item.lang}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {item.votes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {item.comments}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder/potrait-placeholder.png"
                        alt={item.user}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.user}
                      </span>
                    </div>
                    <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                      Lengkap
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="rounded-lg border px-3 py-2 transition-colors hover:bg-muted">
                Previous
              </button>

              <div className="flex gap-1">
                {[1, 2, 3, "...", 15, 16].map((page, i) => (
                  <button
                    key={i}
                    className={`rounded-lg px-3 py-2 transition-colors ${
                      page === 1
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="rounded-lg border px-3 py-2 transition-colors hover:bg-muted">
                Next
              </button>
            </div>
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
            Platform kolaboratif untuk memahami bahasa gaul Indonesia
          </p>
          <div className="flex justify-center gap-6 text-sm">
            {[
              "Tentang",
              "Kebijakan Privasi",
              "Syarat & Ketentuan",
              "Kontak",
            ].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </Link>
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
