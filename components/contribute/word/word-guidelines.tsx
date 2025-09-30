import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WordGuidelines() {
  return (
    <div className="space-y-6">
      {/* Guidelines Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Panduan Request Kata
          </CardTitle>
          <CardDescription>
            Tips untuk request kata yang berkualitas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <div className="text-sm">
                <p className="font-medium">Pastikan kata belum ada</p>
                <p className="text-muted-foreground">
                  Cek terlebih dahulu apakah kata sudah terdaftar
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <div className="text-sm">
                <p className="font-medium">Gunakan ejaan yang benar</p>
                <p className="text-muted-foreground">
                  Tulis kata sesuai dengan penggunaan umum
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <div className="text-sm">
                <p className="font-medium">Pilih bahasa yang tepat</p>
                <p className="text-muted-foreground">
                  Tentukan dari bahasa mana kata ini berasal
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <div className="text-sm">
                <p className="font-medium">Berikan konteks jika perlu</p>
                <p className="text-muted-foreground">
                  Bantu orang lain memahami kapan kata ini digunakan
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Avoid Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Hindari
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              ❌ Kata yang bersifat ofensif atau menyinggung
            </p>
            <p className="text-muted-foreground">
              ❌ Kata yang terlalu umum atau sudah baku
            </p>
            <p className="text-muted-foreground">
              ❌ Spam atau request yang tidak jelas
            </p>
            <p className="text-muted-foreground">
              ❌ Duplikasi kata yang sudah ada
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Example Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" />
            Contoh Request Bagus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            <p className="mb-1 font-medium">Kata: &quot;Mager&quot;</p>
            <p className="mb-2 text-muted-foreground">
              Konteks: Singkatan dari &quot;malas gerak&quot;, digunakan saat
              seseorang merasa sangat malas untuk melakukan aktivitas fisik
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md border bg-background px-2 py-1 text-xs">
                🇮🇩 Bahasa Indonesia
              </span>
              <span className="rounded-md border bg-background px-2 py-1 text-xs">
                Gen Z
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Setelah Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Setelah kata berhasil ditambahkan, kamu dan pengguna lain bisa
            memberikan penjelasan untuk kata tersebut.
          </p>
          <p>
            Penjelasan terbaik akan mendapat upvote dari komunitas dan
            ditampilkan di halaman utama.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
