// components/features/words/word-card-states.tsx
import { Search, Plus, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

// Empty state when no words found
export function WordsEmptyState({
  title = "Tidak ada kata ditemukan",
  description = "Coba ubah filter atau tambahkan kata baru",
  showAddButton = true,
  showSearchTips = true,
}: {
  title?: string;
  description?: string;
  showAddButton?: boolean;
  showSearchTips?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>

      <p className="mb-6 max-w-md text-muted-foreground">{description}</p>

      <div className="space-y-4">
        {showAddButton && (
          <Link
            href="/contribute"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Tambah Kata Baru
          </Link>
        )}

        {showSearchTips && (
          <div className="rounded-lg border bg-card p-4 text-left">
            <h4 className="mb-2 font-medium">Tips pencarian:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Coba kata kunci yang lebih umum</li>
              <li>• Periksa ejaan kata</li>
              <li>• Gunakan sinonim atau kata serupa</li>
              <li>• Kurangi jumlah filter yang aktif</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Empty state for specific filters
export function WordsFilterEmptyState({
  filterType,
  filterValue,
}: {
  filterType: "generation" | "language" | "status";
  filterValue: string;
}) {
  const messages = {
    generation: {
      title: `Belum ada kata dari ${filterValue}`,
      description: `Sepertinya belum ada kata yang dikategorikan untuk ${filterValue}. Jadilah yang pertama menambahkan!`,
    },
    language: {
      title: `Belum ada kata dalam ${filterValue}`,
      description: `Belum ada kata yang dikategorikan dalam bahasa ${filterValue}. Ayo kontribusi!`,
    },
    status: {
      title: "Tidak ada kata dengan status ini",
      description: "Coba ubah filter status atau lihat kategori lainnya.",
    },
  };

  const message = messages[filterType];

  return (
    <WordsEmptyState
      title={message.title}
      description={message.description}
      showSearchTips={false}
    />
  );
}

// Error state when something goes wrong
export function WordsErrorState({
  title = "Terjadi kesalahan",
  description = "Gagal memuat data kata. Silakan coba lagi.",
  onRetry,
  showRetryButton = true,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-6">
        <AlertCircle className="h-12 w-12 text-red-600" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>

      <p className="mb-6 max-w-md text-muted-foreground">{description}</p>

      {showRetryButton && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg border bg-card px-6 py-3 text-foreground transition-colors hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </button>
      )}
    </div>
  );
}

// Loading error for individual cards
export function WordCardError({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Gagal memuat kata
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded p-1 hover:bg-muted"
            title="Coba lagi"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// No results for search
export function WordsSearchEmptyState({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <Search className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">
        Tidak ada hasil untuk &quot;{searchQuery}&quot;
      </h3>

      <p className="mb-6 max-w-md text-muted-foreground">
        Kata yang Anda cari belum tersedia. Ayo tambahkan dan jadilah
        kontributor pertama!
      </p>

      <div className="space-y-4">
        <Link
          href={`/contribute?word=${encodeURIComponent(searchQuery)}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Tambah &quot;{searchQuery}&quot;
        </Link>

        <div className="rounded-lg border bg-card p-4 text-left">
          <h4 className="mb-2 font-medium">Saran:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Periksa ejaan kata yang dicari</li>
            <li>• Coba variasi atau sinonim kata</li>
            <li>• Gunakan kata yang lebih umum</li>
            <li>• Tambahkan kata baru untuk komunitas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
