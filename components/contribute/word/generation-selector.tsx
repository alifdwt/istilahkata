"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Generation = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string | null;
  startYear: number;
  endYear: number | null;
  colorClass: string;
  iconClass: string | null;
};

type SelectedGeneration = {
  id: string;
  isPrimary: boolean;
};

type GenerationSelectorProps = {
  generations: Generation[];
  value: SelectedGeneration[];
  onChange: (generations: SelectedGeneration[]) => void;
  error?: string;
};

export function GenerationSelector({
  generations,
  value,
  onChange,
  error,
}: GenerationSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    value.map((g) => g.id)
  );
  const [primaryId, setPrimaryId] = useState<string | undefined>(
    value.find((g) => g.isPrimary)?.id
  );

  // Sync with parent value changes
  useEffect(() => {
    setSelectedIds(value.map((g) => g.id));
    setPrimaryId(value.find((g) => g.isPrimary)?.id);
  }, [value]);

  const handleCheckboxChange = (generationId: string, checked: boolean) => {
    let newSelectedIds: string[];
    let newPrimaryId = primaryId;

    if (checked) {
      newSelectedIds = [...selectedIds, generationId];

      // Auto-set as primary if it's the first selection
      if (newSelectedIds.length === 1) {
        newPrimaryId = generationId;
      }
    } else {
      newSelectedIds = selectedIds.filter((id) => id !== generationId);

      // Clear primary if unchecking the primary generation
      if (primaryId === generationId) {
        newPrimaryId = undefined;
      }
    }

    setSelectedIds(newSelectedIds);
    setPrimaryId(newPrimaryId);

    // Update parent state
    const newValue = newSelectedIds.map((id) => ({
      id,
      isPrimary: id === newPrimaryId,
    }));
    onChange(newValue);
  };

  const handlePrimaryChange = (generationId: string) => {
    setPrimaryId(generationId);

    // Update parent state with new primary
    const newValue = selectedIds.map((id) => ({
      id,
      isPrimary: id === generationId,
    }));
    onChange(newValue);
  };

  const getYearRange = (gen: Generation) => {
    const end = gen.endYear ? gen.endYear.toString() : "Sekarang";
    return `${gen.startYear} - ${end}`;
  };

  return (
    <Card className={error ? "border-destructive" : ""}>
      <CardHeader>
        <CardTitle>Generasi (Opsional)</CardTitle>
        <CardDescription>
          Pilih generasi yang sering menggunakan kata ini. Bisa lebih dari satu.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {generations.map((generation) => {
          const isSelected = selectedIds.includes(generation.id);
          const isPrimary = primaryId === generation.id;

          return (
            <div
              key={generation.id}
              className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                isSelected ? "border-accent bg-accent/50" : "border-border"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`generation-${generation.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(generation.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`generation-${generation.id}`}
                  className="cursor-pointer"
                >
                  <div>
                    <div className="font-medium">
                      {generation.name}{" "}
                      <span className="text-sm text-muted-foreground">
                        ({generation.shortName})
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getYearRange(generation)}
                    </div>
                    {generation.description && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {generation.description}
                      </div>
                    )}
                  </div>
                </Label>
              </div>

              {isSelected && (
                <RadioGroup
                  value={primaryId}
                  onValueChange={handlePrimaryChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={generation.id}
                      id={`primary-${generation.id}`}
                    />
                    <Label
                      htmlFor={`primary-${generation.id}`}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {isPrimary ? "Primary ✓" : "Primary"}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </div>
          );
        })}

        {error && <p className="text-sm text-destructive">{error}</p>}

        {selectedIds.length > 0 && !primaryId && (
          <p className="text-sm text-muted-foreground">
            💡 Pilih salah satu sebagai generasi <strong>primary</strong>
          </p>
        )}

        {selectedIds.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Tidak yakin? Tidak masalah, kamu bisa skip bagian ini.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
