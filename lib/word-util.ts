export interface GenerationInfo {
  id: string;
  name: string;
  code: string;
  isPrimary: boolean;
}

export interface LanguageInfo {
  id: string;
  name: string;
  code: string;
  isPrimary: boolean;
}

export function getGenerationColor(code: string): string {
  const colors: Record<string, string> = {
    "gen-alpha": "bg-purple-100 text-purple-700",
    "gen-z": "bg-blue-100 text-blue-700",
    millennial: "bg-green-100 text-green-700",
    "gen-x": "bg-orange-100 text-orange-700",
    "cross-gen": "bg-gray-100 text-gray-700",
  };
  return colors[code] || "bg-gray-100 text-gray-700";
}

export function getLanguageColor(code: string): string {
  const colors: Record<string, string> = {
    indonesian: "bg-primary/10 text-primary",
    english: "bg-blue-50 text-blue-600",
    javanese: "bg-amber-50 text-amber-600",
    sundanese: "bg-emerald-50 text-emerald-600",
    chinese: "bg-red-50 text-red-600",
    betawi: "bg-orange-50 text-orange-600",
    mixed: "bg-gray-50 text-gray-600",
  };
  return colors[code] || "bg-gray-50 text-gray-600";
}

// Status utilities
export function getStatusColor(
  status: "pending" | "approved" | "rejected" | "needs-review"
): string {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    "needs-review": "bg-orange-100 text-orange-700",
  };
  return colors[status];
}

export function getStatusLabel(
  status: "pending" | "approved" | "rejected" | "needs-review"
): string {
  const labels = {
    pending: "Menunggu Review",
    approved: "Disetujui",
    rejected: "Ditolak",
    "needs-review": "Perlu Review",
  };
  return labels[status];
}

// Formatting utilities
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun yang lalu`;
}

// Validation utilities
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

export function generateSlug(term: string): string {
  return term
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Search utilities
export interface SearchFilters {
  generation?: string;
  language?: string;
  status?: "pending" | "approved" | "rejected" | "needs-review";
  sortBy?: "newest" | "popular" | "trending" | "votes";
}

export function buildSearchQuery(
  search: string = "",
  filters: SearchFilters = {}
): URLSearchParams {
  const params = new URLSearchParams();

  if (search) params.set("q", search);
  if (filters.generation) params.set("generation", filters.generation);
  if (filters.language) params.set("language", filters.language);
  if (filters.status) params.set("status", filters.status);
  if (filters.sortBy) params.set("sort", filters.sortBy);

  return params;
}
