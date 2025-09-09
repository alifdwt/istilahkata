import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu lalu`;
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: diffInDays > 365 ? "numeric" : undefined,
  });
}

// Format numbers with Indonesian locale
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

// Format views count for display
export function formatViews(views: number): string {
  return formatNumber(views);
}

// Generate slug from string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

// Get generation color class based on generation name or existing colorClass
export function getGenerationColor(input: string): string {
  // If input already contains full classes, use it
  if (input.includes("bg-") && input.includes("text-")) {
    return input;
  }

  // Fallback color mapping based on generation names
  const colorMap: Record<string, string> = {
    "gen-alpha": "bg-purple-100 text-purple-700",
    "gen-z": "bg-blue-100 text-blue-700",
    milenial: "bg-green-100 text-green-700",
    "gen-x": "bg-orange-100 text-orange-700",
    "lintas-generasi": "bg-gray-100 text-gray-700",
    // Full names
    "Generasi Alpha": "bg-purple-100 text-purple-700",
    "Generasi Z": "bg-blue-100 text-blue-700",
    "Generasi Milenial": "bg-green-100 text-green-700",
    "Generasi X": "bg-orange-100 text-orange-700",
    "Lintas Generasi": "bg-gray-100 text-gray-700",
  };

  return colorMap[input] || "bg-gray-100 text-gray-700";
}

// Validate and sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML
    .slice(0, 1000); // Limit length
}

// Check if user has permission for action
export function hasPermission(
  userRole: string,
  requiredRoles: string[]
): boolean {
  const roleHierarchy = {
    admin: 3,
    moderator: 2,
    user: 1,
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel = Math.min(
    ...requiredRoles.map(
      (role) => roleHierarchy[role as keyof typeof roleHierarchy] || 999
    )
  );

  return userLevel >= requiredLevel;
}
