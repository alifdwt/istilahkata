// lib/utils/words.ts
import { WordCardData } from "@/lib/db/queries/words-listing";

/**
 * Type guards dan utilities untuk words data
 */

// Type guard untuk memastikan word memiliki status yang valid
export function hasValidStatus(word: WordCardData): word is WordCardData & {
  status: "pending" | "approved" | "rejected" | "needs-review";
} {
  return word.status !== null;
}

// Type guard untuk memastikan word memiliki createdAt yang valid
export function hasValidCreatedAt(word: WordCardData): word is WordCardData & {
  createdAt: Date;
} {
  return word.createdAt !== null;
}

// Utility untuk mendapatkan status display text
export function getStatusDisplayText(status: WordCardData["status"]): string {
  if (!status) return "Unknown";

  switch (status) {
    case "pending":
      return "Menunggu Review";
    case "approved":
      return "Disetujui";
    case "rejected":
      return "Ditolak";
    case "needs-review":
      return "Perlu Review";
    default:
      return "Unknown";
  }
}

// Utility untuk mendapatkan status color class
export function getStatusColorClass(status: WordCardData["status"]): string {
  if (!status) return "bg-gray-100 text-gray-700";

  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "approved":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "needs-review":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// Utility untuk format tanggal relatif
export function getRelativeTime(date: Date | null): string {
  if (!date) return "Tanggal tidak diketahui";

  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Hari ini";
  } else if (diffInDays === 1) {
    return "Kemarin";
  } else if (diffInDays < 7) {
    return `${diffInDays} hari lalu`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 minggu lalu" : `${weeks} minggu lalu`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 bulan lalu" : `${months} bulan lalu`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return years === 1 ? "1 tahun lalu" : `${years} tahun lalu`;
  }
}

// Utility untuk truncate text
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// Utility untuk mendapatkan primary generation
export function getPrimaryGeneration(word: WordCardData) {
  return word.generations.find((gen) => gen.isPrimary) || word.generations[0];
}

// Utility untuk mendapatkan primary language
export function getPrimaryLanguage(word: WordCardData) {
  return word.languages.find((lang) => lang.isPrimary) || word.languages[0];
}

// Utility untuk format numbers
export function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${Math.floor(count / 100) / 10}k`;
  return `${Math.floor(count / 100000) / 10}M`;
}

// Utility untuk mendapatkan word URL
export function getWordUrl(slug: string): string {
  return `/word/${slug}`;
}

// Utility untuk mendapatkan contributor URL (jika ada user pages nanti)
export function getContributorUrl(username: string): string {
  return `/user/${username}`;
}

// Export default dengan semua utilities
const WordsUtils = {
  hasValidStatus,
  hasValidCreatedAt,
  getStatusDisplayText,
  getStatusColorClass,
  getRelativeTime,
  truncateText,
  getPrimaryGeneration,
  getPrimaryLanguage,
  formatCount,
  getWordUrl,
  getContributorUrl,
};

export default WordsUtils;
