import {
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  Bookmark,
  Flag,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Award,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WordDetailPage() {
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
            <Link href="/words" className="hover:text-primary">
              Kata-kata
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-foreground">gabut</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content (3/4) */}
          <div className="space-y-8 lg:col-span-3">
            {/* Word Header */}
            <section className="rounded-xl border bg-card p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 font-mono text-4xl font-bold text-primary">
                    gabut
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      2.4k views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Ditambahkan 3 bulan lalu
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />8 kontributor
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted">
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </button>
                  <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm text-destructive transition-colors hover:bg-muted">
                    <Flag className="h-4 w-4" />
                    Report
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                  Generasi Z
                </span>
                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Milenial
                </span>
                <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Bahasa Indonesia
                </span>
                <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                  Populer
                </span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">
                    Penjelasan
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">342</div>
                  <div className="text-sm text-muted-foreground">
                    Total Votes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">28</div>
                  <div className="text-sm text-muted-foreground">Komentar</div>
                </div>
              </div>
            </section>

            {/* Accepted Explanation */}
            <section className="rounded-xl border border-secondary/20 bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                <h2 className="text-xl font-semibold">Penjelasan Utama</h2>
                <span className="rounded bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                  Diterima
                </span>
              </div>

              <div className="mb-6">
                <p className="mb-4 leading-relaxed text-foreground">
                  <strong>Gabut</strong> adalah akronim dari &quot;gaji
                  buta&quot;. Awalnya, kata ini digunakan di lingkungan kerja
                  untuk menggambarkan kondisi di mana seseorang tidak memiliki
                  pekerjaan atau tugas yang harus dikerjakan, tetapi tetap
                  dibayar. Jadi, mereka seperti mendapat gaji tanpa melakukan
                  apa pun, atau &quot;gaji buta&quot;.
                </p>

                <p className="mb-4 leading-relaxed text-foreground">
                  Seiring waktu, makna kata ini meluas menjadi istilah untuk
                  menggambarkan perasaan bosan atau tidak ada kegiatan yang
                  berarti. Gabut bisa digunakan untuk mengekspresikan perasaan
                  bosan, jenuh, atau lelah karena tidak ada kegiatan yang
                  berarti.
                </p>

                <div className="mb-4 rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold">Contoh Penggunaan:</h4>
                  <blockquote className="text-muted-foreground italic">
                    &quot;Aku gabut banget hari ini, enaknya ngapain ya?&quot;
                  </blockquote>
                  <blockquote className="text-muted-foreground italic">
                    &quot;Tugasku numpuk, tapi aku lagi gabut banget.&quot;
                  </blockquote>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/placeholder/potrait-placeholder.png"
                      alt="@daud"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium">@daud</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                          Gen Z
                        </span>
                        Kontributor Terpercaya
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Diposting 2 bulan lalu
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 rounded-lg bg-secondary/10 px-3 py-1 text-secondary transition-colors hover:bg-secondary/20">
                      <ThumbsUp className="h-4 w-4" />
                      189
                    </button>
                    <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                      <ThumbsDown className="h-4 w-4" />3
                    </button>
                  </div>
                  <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                    <MessageCircle className="h-4 w-4" />
                    12 Komentar
                  </button>
                </div>
              </div>
            </section>

            {/* Other Explanations */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Penjelasan Lainnya</h2>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border bg-card px-3 py-2 text-sm">
                    <option>Paling Banyak Vote</option>
                    <option>Terbaru</option>
                    <option>Terlama</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {/* Explanation 2 */}
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4">
                    <p className="mb-4 leading-relaxed text-foreground">
                      Gabut juga bisa digunakan untuk merujuk pada perasaan
                      malas atau enggan melakukan sesuatu. Gabut dalam konteks
                      ini seperti perasaan yang membuat seseorang hanya ingin
                      bersantai atau bermalas-malasan, meskipun sebenarnya ada
                      hal yang bisa dikerjakan.
                    </p>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <blockquote className="text-muted-foreground italic">
                        &quot;Sebenarnya ada tugas, tapi lagi gabut aja.&quot;
                      </blockquote>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/placeholder/potrait-placeholder.png"
                          alt="@sinta"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium">@sinta</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="rounded bg-green-100 px-1 py-0.5 text-xs text-green-700">
                              Milenial
                            </span>
                            Kontributor Aktif
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Diposting 1 bulan lalu
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                          <ThumbsUp className="h-4 w-4" />
                          67
                        </button>
                        <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                          <ThumbsDown className="h-4 w-4" />1
                        </button>
                      </div>
                      <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                        <MessageCircle className="h-4 w-4" />5 Komentar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Explanation 3 */}
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-4">
                    <p className="mb-4 leading-relaxed text-foreground">
                      Dalam konteks media sosial, &quot;gabut&quot; sering
                      digunakan sebagai status atau caption untuk menunjukkan
                      bahwa seseorang sedang tidak ada kegiatan dan mencari
                      hiburan atau teman mengobrol.
                    </p>

                    <div className="rounded-lg bg-muted/50 p-3">
                      <blockquote className="text-muted-foreground italic">
                        &quot;Gabut nih, ada yang mau ngobrol?&quot;
                      </blockquote>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/placeholder/potrait-placeholder.png"
                          alt="@rani"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium">@rani</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-700">
                              Gen Z
                            </span>
                            Kontributor Baru
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Diposting 2 minggu lalu
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                          <ThumbsUp className="h-4 w-4" />
                          23
                        </button>
                        <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                          <ThumbsDown className="h-4 w-4" />0
                        </button>
                      </div>
                      <button className="flex items-center gap-1 rounded-lg px-3 py-1 transition-colors hover:bg-muted">
                        <MessageCircle className="h-4 w-4" />3 Komentar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Generation Context Section - MOVED HERE */}
            <section className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5 text-secondary" />
                Konteks Generasi
              </h3>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  Generasi Z (Utama)
                </span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Milenial (Adopsi)
                </span>
              </div>

              <p className="mb-4 text-sm text-muted-foreground">
                Kata &quot;gabut&quot; pertama kali populer di kalangan{" "}
                <strong>Generasi Z</strong> melalui platform media sosial
                seperti Twitter dan Instagram sekitar 2018-2019. Kemudian
                diadopsi oleh
                <strong>Generasi Milenial</strong> dalam konteks workplace humor
                dan daily conversations.
              </p>

              {/* Timeline visualization */}
              <div className="rounded-lg bg-muted/50 p-4">
                <h4 className="mb-3 text-sm font-semibold">
                  Timeline Popularitas
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="min-w-16 text-xs text-muted-foreground">
                      2018
                    </span>
                    <div className="relative h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="text-xs font-medium text-blue-700">
                      Gen Z mulai menggunakan
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="min-w-16 text-xs text-muted-foreground">
                      2020
                    </span>
                    <div className="relative h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-1/2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs font-medium text-green-700">
                      Milenial mulai adopsi
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="min-w-16 text-xs text-muted-foreground">
                      2024
                    </span>
                    <div className="relative h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 w-1/4 rounded-full bg-gray-500"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      Mainstream usage
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Add New Explanation */}
            <section className="rounded-xl border-2 border-dashed border-muted bg-card p-8 text-center">
              <div className="mx-auto max-w-md">
                <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">
                  Punya Penjelasan Lain?
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Bantu komunitas dengan menambahkan perspektif atau konteks
                  baru untuk kata &quot;gabut&quot;
                </p>
                <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
                  Tambah Penjelasan
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar (1/4) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Related Words */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 text-lg font-semibold">Kata Terkait</h4>
              <div className="space-y-3">
                {[
                  {
                    word: "bosen",
                    desc: "Perasaan jenuh atau lelah",
                    generation: "Lintas Generasi",
                    genColor: "bg-gray-100 text-gray-700",
                  },
                  {
                    word: "males",
                    desc: "Tidak ada motivasi",
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                  {
                    word: "santai",
                    desc: "Rileks, tidak terburu-buru",
                    generation: "Lintas Generasi",
                    genColor: "bg-gray-100 text-gray-700",
                  },
                  {
                    word: "nganggur",
                    desc: "Tidak ada kegiatan",
                    generation: "Milenial",
                    genColor: "bg-green-100 text-green-700",
                  },
                ].map((item) => (
                  <Link
                    key={item.word}
                    href={`/word/${item.word}`}
                    className="block rounded-lg p-3 transition-colors hover:bg-muted"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <div className="font-mono font-medium text-primary">
                        {item.word}
                      </div>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${item.genColor}`}
                      >
                        {item.generation}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Generation Demographics */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Users className="h-5 w-5 text-secondary" />
                Demografi Pengguna
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Generasi Z</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">67%</span> (1,634 pengguna)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: "67%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Milenial</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">28%</span> (683 pengguna)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "28%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm font-medium">Generasi X</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">4%</span> (97 pengguna)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-orange-500"
                    style={{ width: "4%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm font-medium">Gen Alpha</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">1%</span> (24 pengguna)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: "1%" }}
                  ></div>
                </div>
              </div>
            </section>

            {/* Word Statistics */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-5 w-5 text-accent" />
                Statistik
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Views
                  </span>
                  <span className="font-medium">2,431</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Views Hari Ini
                  </span>
                  <span className="font-medium text-secondary">+47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Votes
                  </span>
                  <span className="font-medium">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Popularitas
                  </span>
                  <span className="font-medium text-accent">Tinggi</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Era Populer
                  </span>
                  <span className="font-medium text-blue-600">
                    2018-sekarang
                  </span>
                </div>
              </div>

              {/* Mini trend chart placeholder */}
              <div className="mt-4 rounded-lg bg-muted/50 p-3">
                <div className="mb-2 text-xs text-muted-foreground">
                  Views 7 hari terakhir
                </div>
                <div className="flex h-16 items-end justify-center rounded bg-gradient-to-r from-primary/20 to-secondary/20">
                  <span className="text-xs text-muted-foreground">
                    📈 Trending naik
                  </span>
                </div>
              </div>
            </section>

            {/* Top Contributors by Generation */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Award className="h-5 w-5 text-accent" />
                Kontributor Teratas
              </h4>
              <div className="space-y-3">
                {[
                  {
                    user: "@daud",
                    contributions: 3,
                    votes: 189,
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                  {
                    user: "@sinta",
                    contributions: 2,
                    votes: 67,
                    generation: "Milenial",
                    genColor: "bg-green-100 text-green-700",
                  },
                  {
                    user: "@rani",
                    contributions: 1,
                    votes: 23,
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                ].map((contributor, index) => (
                  <div
                    key={contributor.user}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                          index === 0
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                            : index === 1
                            ? "bg-gradient-to-br from-gray-400 to-gray-600"
                            : "bg-gradient-to-br from-orange-400 to-orange-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-mono font-medium">
                          {contributor.user}
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className={`rounded px-1 py-0.5 text-xs font-medium ${contributor.genColor}`}
                          >
                            {contributor.generation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="font-medium">
                        {contributor.votes} votes
                      </div>
                      <div className="text-xs">
                        {contributor.contributions} kontribusi
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-xl border bg-card p-6">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5 text-secondary" />
                Aktivitas Terbaru
              </h4>
              <div className="space-y-3">
                {[
                  {
                    user: "@budi",
                    action: "memberikan vote",
                    time: "2 jam lalu",
                    generation: "Milenial",
                    genColor: "bg-green-100 text-green-700",
                  },
                  {
                    user: "@rani",
                    action: "menambah penjelasan",
                    time: "2 minggu lalu",
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                  {
                    user: "@alex",
                    action: "berkomentar",
                    time: "3 minggu lalu",
                    generation: "Gen Z",
                    genColor: "bg-blue-100 text-blue-700",
                  },
                ].map((activity, index) => (
                  <div key={index} className="text-sm">
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
                    <p className="text-muted-foreground">{activity.action}</p>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
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
