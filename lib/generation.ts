// lib/utils/generation.ts
// Utilities untuk generation management

export interface GenerationInfo {
  id: string;
  code: string;
  name: string;
  shortName: string;
  startYear: number;
  endYear: number | null;
  colorClass: string;
  description: string;
}

// Default generations data
export const DEFAULT_GENERATIONS: Omit<GenerationInfo, "id">[] = [
  {
    code: "gen-alpha",
    name: "Generasi Alpha",
    shortName: "Gen Alpha",
    startYear: 2010,
    endYear: 2025,
    colorClass: "bg-purple-100 text-purple-700",
    description:
      "Generasi yang lahir setelah 2010, digital natives sejak lahir, dibesarkan dengan AI dan teknologi canggih.",
  },
  {
    code: "gen-z",
    name: "Generasi Z",
    shortName: "Gen Z",
    startYear: 1997,
    endYear: 2012,
    colorClass: "bg-blue-100 text-blue-700",
    description:
      "Social media natives, meme culture, entrepreneurial mindset, aktivis sosial.",
  },
  {
    code: "millennial",
    name: "Milenial",
    shortName: "Milenial",
    startYear: 1981,
    endYear: 1996,
    colorClass: "bg-green-100 text-green-700",
    description:
      "Internet pioneers, workplace humor, mengalami transisi analog ke digital.",
  },
  {
    code: "gen-x",
    name: "Generasi X",
    shortName: "Gen X",
    startYear: 1965,
    endYear: 1980,
    colorClass: "bg-orange-100 text-orange-700",
    description:
      "MTV generation, grunge culture, independence, work-life balance.",
  },
  {
    code: "baby-boomer",
    name: "Baby Boomer",
    shortName: "Boomer",
    startYear: 1946,
    endYear: 1964,
    colorClass: "bg-yellow-100 text-yellow-700",
    description: "Post-war generation, traditional values, hard work ethic.",
  },
  {
    code: "cross-gen",
    name: "Lintas Generasi",
    shortName: "Universal",
    startYear: 1940,
    endYear: null,
    colorClass: "bg-gray-100 text-gray-700",
    description: "Kata yang digunakan dan dipahami oleh semua generasi.",
  },
];

/**
 * Determine generation based on birth year
 */
export function getGenerationFromBirthYear(
  birthYear: number
): GenerationInfo | null {
  const currentYear = new Date().getFullYear();

  // Validate birth year
  if (birthYear < 1920 || birthYear > currentYear) {
    return null;
  }

  // Find matching generation
  for (const gen of DEFAULT_GENERATIONS) {
    if (gen.code === "cross-gen") continue; // Skip universal category

    const endYear = gen.endYear || currentYear;
    if (birthYear >= gen.startYear && birthYear <= endYear) {
      return {
        ...gen,
        id: "", // Will be set from database
      };
    }
  }

  return null;
}

/**
 * Get current age from birth year
 */
export function getAgeFromBirthYear(birthYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

/**
 * Validate birth year input
 */
export function validateBirthYear(birthYear: number): {
  isValid: boolean;
  error?: string;
  suggestedGeneration?: GenerationInfo;
} {
  const currentYear = new Date().getFullYear();

  if (birthYear < 1920) {
    return {
      isValid: false,
      error:
        "Tahun lahir terlalu lama. Silakan masukkan tahun yang lebih valid.",
    };
  }

  if (birthYear > currentYear) {
    return {
      isValid: false,
      error: "Tahun lahir tidak boleh lebih dari tahun saat ini.",
    };
  }

  if (birthYear > currentYear - 5) {
    return {
      isValid: false,
      error:
        "Anda harus berusia minimal 5 tahun untuk menggunakan platform ini.",
    };
  }

  const generation = getGenerationFromBirthYear(birthYear);

  return {
    isValid: true,
    suggestedGeneration: generation || undefined,
  };
}

/**
 * Get generation age range description
 */
export function getGenerationAgeRange(generation: GenerationInfo): string {
  const currentYear = new Date().getFullYear();
  const endYear = generation.endYear || currentYear;

  const minAge = currentYear - endYear;
  const maxAge = currentYear - generation.startYear;

  if (generation.endYear === null) {
    return `${minAge}+ tahun`;
  }

  return `${minAge}-${maxAge} tahun`;
}

/**
 * Get generation birth year range description
 */
export function getGenerationYearRange(
  generation: Omit<GenerationInfo, "id">
): string {
  if (generation.endYear === null) {
    return `${generation.startYear}+`;
  }

  return `${generation.startYear}-${generation.endYear}`;
}

/**
 * Check if user should update generation (birth year changed)
 */
export function shouldUpdateGeneration(
  currentGeneration: GenerationInfo | null,
  birthYear: number
): boolean {
  const suggestedGeneration = getGenerationFromBirthYear(birthYear);

  if (!currentGeneration && suggestedGeneration) {
    return true; // No generation set, but birth year suggests one
  }

  if (currentGeneration && suggestedGeneration) {
    return currentGeneration.code !== suggestedGeneration.code;
  }

  return false;
}

/**
 * Get generation display info for UI
 */
export function getGenerationDisplayInfo(generation: GenerationInfo) {
  return {
    name: generation.name,
    shortName: generation.shortName,
    description: generation.description,
    colorClass: generation.colorClass,
    ageRange: getGenerationAgeRange(generation),
    yearRange: getGenerationYearRange(generation),
  };
}

/**
 * Privacy-aware generation display
 */
export function getPublicGenerationInfo(
  generation: GenerationInfo | null,
  isPublic: boolean
): { name: string; colorClass: string } | null {
  if (!generation || !isPublic) {
    return null;
  }

  return {
    name: generation.shortName,
    colorClass: generation.colorClass,
  };
}

/**
 * Get generation options for forms
 */
export function getGenerationOptions() {
  return DEFAULT_GENERATIONS.filter((gen) => gen.code !== "cross-gen") // Exclude universal from user selection
    .map((gen) => ({
      value: gen.code,
      label: `${gen.name} (${getGenerationYearRange(gen)})`,
      description: gen.description,
      colorClass: gen.colorClass,
    }));
}

/**
 * Generation statistics helpers
 */
export function calculateGenerationDistribution(
  users: Array<{ birthYear: number | null }>
) {
  const distribution: Record<string, number> = {};

  // Initialize all generations
  DEFAULT_GENERATIONS.forEach((gen) => {
    distribution[gen.code] = 0;
  });

  // Count users by generation
  users.forEach((user) => {
    if (user.birthYear) {
      const generation = getGenerationFromBirthYear(user.birthYear);
      if (generation) {
        distribution[generation.code] =
          (distribution[generation.code] || 0) + 1;
      }
    } else {
      distribution["unknown"] = (distribution["unknown"] || 0) + 1;
    }
  });

  return distribution;
}

/**
 * Check if birth year is in valid range for specific generation
 */
export function isValidBirthYearForGeneration(
  birthYear: number,
  generationCode: string
): boolean {
  const generation = DEFAULT_GENERATIONS.find((g) => g.code === generationCode);
  if (!generation) return false;

  const endYear = generation.endYear || new Date().getFullYear();
  return birthYear >= generation.startYear && birthYear <= endYear;
}
