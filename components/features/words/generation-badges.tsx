import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  GenerationInfo,
  LanguageInfo,
  getGenerationColor,
  getLanguageColor,
} from "@/lib/word-util";

interface GenerationBadgesProps {
  generations: GenerationInfo[];
  languages: LanguageInfo[];
  maxVisible?: number;
  size?: "default" | "sm" | "lg";
}

export function GenerationBadges({
  generations,
  languages,
  maxVisible = 4,
  size = "default",
}: GenerationBadgesProps) {
  // Sort to show primary items first
  const sortedGenerations = [...generations].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary)
  );
  const sortedLanguages = [...languages].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary)
  );

  const primaryGeneration = sortedGenerations.find((g) => g.isPrimary);
  const secondaryGenerations = sortedGenerations.filter((g) => !g.isPrimary);

  const primaryLanguage = sortedLanguages.find((l) => l.isPrimary);
  const secondaryLanguages = sortedLanguages.filter((l) => !l.isPrimary);

  const totalItems = generations.length + languages.length;
  const visibleItems = Math.min(maxVisible, totalItems);
  const remainingCount = totalItems - visibleItems;

  // Size classes for badges
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Primary Generation Badge */}
      {primaryGeneration && (
        <Badge
          variant="secondary"
          className={cn(
            getGenerationColor(primaryGeneration.code),
            "border-0 font-medium",
            sizeClasses[size]
          )}
        >
          {primaryGeneration.name}
        </Badge>
      )}

      {/* Secondary Generations (limited by maxVisible) */}
      {secondaryGenerations
        .slice(0, Math.max(0, visibleItems - 2))
        .map((generation) => (
          <Badge
            key={generation.id}
            variant="outline"
            className={cn(
              getGenerationColor(generation.code),
              "border transition-colors hover:opacity-80",
              sizeClasses[size]
            )}
          >
            {generation.name}
          </Badge>
        ))}

      {/* Primary Language Badge */}
      {primaryLanguage && visibleItems > 1 && (
        <Badge
          variant="secondary"
          className={cn(
            getLanguageColor(primaryLanguage.code),
            "border-0 font-medium",
            sizeClasses[size]
          )}
        >
          {primaryLanguage.name}
        </Badge>
      )}

      {/* Secondary Languages (if space allows) */}
      {secondaryLanguages
        .slice(0, Math.max(0, visibleItems - 3))
        .map((language) => (
          <Badge
            key={language.id}
            variant="outline"
            className={cn(
              getLanguageColor(language.code),
              "border transition-colors hover:opacity-80",
              sizeClasses[size]
            )}
          >
            {language.name}
          </Badge>
        ))}

      {/* Show +more if there are remaining items */}
      {remainingCount > 0 && (
        <Badge
          variant="outline"
          className={cn(
            "text-muted-foreground border-muted-foreground/50 transition-colors hover:text-foreground hover:border-foreground/50",
            sizeClasses[size]
          )}
        >
          +{remainingCount} lainnya
        </Badge>
      )}
    </div>
  );
}

// Compact version for cards
export function GenerationBadgesCompact({
  generations,
  languages,
}: Pick<GenerationBadgesProps, "generations" | "languages">) {
  return (
    <GenerationBadges
      generations={generations}
      languages={languages}
      maxVisible={3}
      size="sm"
    />
  );
}

// Single generation badge component
export function GenerationBadge({
  generation,
  variant = "secondary",
  size = "default",
}: {
  generation: GenerationInfo;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        getGenerationColor(generation.code),
        variant === "outline" ? "border" : "border-0",
        sizeClasses[size]
      )}
    >
      {generation.name}
    </Badge>
  );
}

// Single language badge component
export function LanguageBadge({
  language,
  variant = "secondary",
  size = "default",
}: {
  language: LanguageInfo;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    default: "text-sm px-2.5 py-0.5",
    lg: "text-sm px-3 py-1",
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        getLanguageColor(language.code),
        variant === "outline" ? "border" : "border-0",
        sizeClasses[size]
      )}
    >
      {language.name}
    </Badge>
  );
}
