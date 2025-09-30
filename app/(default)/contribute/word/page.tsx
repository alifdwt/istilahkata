import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { WordGuidelines } from "@/components/contribute/word/word-guidelines";
import { WordRequestForm } from "@/components/contribute/word/word-request-form";
import { auth } from "@/lib/auth/config";
import {
  getActiveLanguages,
  getActiveGenerations,
} from "@/lib/db/queries/word";

export const metadata = {
  title: "Request Kata Baru - IstilahKata",
  description:
    "Ajukan kata gaul baru untuk ditambahkan ke database IstilahKata",
};

export default async function ContributeWordPage() {
  // Check authentication (middleware already handles this, but double check)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?from=/contribute/word");
  }

  // Fetch languages and generations
  const [languages, generations] = await Promise.all([
    getActiveLanguages(),
    getActiveGenerations(),
  ]);

  // If no languages available, show error
  if (languages.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-2xl font-bold">Data Tidak Tersedia</h1>
          <p className="text-muted-foreground">
            Belum ada data bahasa yang tersedia. Silakan hubungi administrator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Request Kata Baru</h1>
        <p className="text-muted-foreground">
          Tambahkan kata gaul baru ke database IstilahKata dan bantu komunitas
          memahami bahasa gaul dari berbagai generasi
        </p>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Form (2/3 width on large screens) */}
        <div className="lg:col-span-2">
          <WordRequestForm languages={languages} generations={generations} />
        </div>

        {/* Right Column - Guidelines (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <WordGuidelines />
        </div>
      </div>
    </div>
  );
}
