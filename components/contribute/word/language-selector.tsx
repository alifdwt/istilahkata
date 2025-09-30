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

type Language = {
  id: string;
  code: string;
  name: string;
  nativeName: string | null;
  flag: string | null;
  colorClass: string;
};

type SelectedLanguage = {
  id: string;
  isPrimary: boolean;
};

type LanguageSelectorProps = {
  languages: Language[];
  value: SelectedLanguage[];
  onChange: (languages: SelectedLanguage[]) => void;
  error?: string;
};

export function LanguageSelector({
  languages,
  value,
  onChange,
  error,
}: LanguageSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    value.map((l) => l.id)
  );
  const [primaryId, setPrimaryId] = useState<string | undefined>(
    value.find((l) => l.isPrimary)?.id
  );

  // Sync with parent value changes
  useEffect(() => {
    setSelectedIds(value.map((l) => l.id));
    setPrimaryId(value.find((l) => l.isPrimary)?.id);
  }, [value]);

  const handleCheckboxChange = (languageId: string, checked: boolean) => {
    let newSelectedIds: string[];
    let newPrimaryId = primaryId;

    if (checked) {
      newSelectedIds = [...selectedIds, languageId];

      // Auto-set as primary if it's the first selection
      if (newSelectedIds.length === 1) {
        newPrimaryId = languageId;
      }
    } else {
      newSelectedIds = selectedIds.filter((id) => id !== languageId);

      // Clear primary if unchecking the primary language
      if (primaryId === languageId) {
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

  const handlePrimaryChange = (languageId: string) => {
    setPrimaryId(languageId);

    // Update parent state with new primary
    const newValue = selectedIds.map((id) => ({
      id,
      isPrimary: id === languageId,
    }));
    onChange(newValue);
  };

  return (
    <Card className={error ? "border-destructive" : ""}>
      <CardHeader>
        <CardTitle>Bahasa</CardTitle>
        <CardDescription>
          Pilih bahasa asal kata ini. Kamu bisa memilih lebih dari satu bahasa.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.map((language) => {
          const isSelected = selectedIds.includes(language.id);
          const isPrimary = primaryId === language.id;

          return (
            <div
              key={language.id}
              className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                isSelected ? "border-accent bg-accent/50" : "border-border"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`language-${language.id}`}
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(language.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`language-${language.id}`}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {language.flag && (
                    <span className="text-2xl">{language.flag}</span>
                  )}
                  <div>
                    <div className="font-medium">{language.name}</div>
                    {language.nativeName && (
                      <div className="text-sm text-muted-foreground">
                        {language.nativeName}
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
                      value={language.id}
                      id={`primary-${language.id}`}
                    />
                    <Label
                      htmlFor={`primary-${language.id}`}
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
            💡 Pilih salah satu sebagai bahasa <strong>primary</strong>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
