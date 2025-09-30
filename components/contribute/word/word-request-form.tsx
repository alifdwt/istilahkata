"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createWordRequest, checkSlugAvailability } from "@/actions/word";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  wordRequestSchema,
  type WordRequestInput,
} from "@/lib/validations/word";

import { GenerationSelector } from "./generation-selector";
import { LanguageSelector } from "./language-selector";

type Language = {
  id: string;
  code: string;
  name: string;
  nativeName: string | null;
  flag: string | null;
  colorClass: string;
};

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

type WordRequestFormProps = {
  languages: Language[];
  generations: Generation[];
};

export function WordRequestForm({
  languages,
  generations,
}: WordRequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{
    available: boolean;
    existingWord?: { id: string; term: string };
  } | null>(null);

  const form = useForm<WordRequestInput>({
    resolver: zodResolver(wordRequestSchema),
    defaultValues: {
      term: "",
      context: "",
      languages: [],
      generations: [],
    },
  });

  const watchedTerm = form.watch("term");

  // Debounced slug check
  useEffect(() => {
    if (!watchedTerm || watchedTerm.length < 2) {
      setSlugStatus(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      try {
        const result = await checkSlugAvailability(watchedTerm);
        setSlugStatus({
          available: result.available,
          existingWord: result.existingWord || undefined,
        });
      } catch (error) {
        console.error("Error checking slug:", error);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedTerm]);

  const onSubmit = async (data: WordRequestInput) => {
    // Double check if word already exists
    if (slugStatus && !slugStatus.available) {
      toast.error("Kata ini sudah ada!", {
        description: `Kata "${slugStatus.existingWord?.term}" sudah terdaftar.`,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createWordRequest(data);

      if (result.success) {
        toast.success("Berhasil!", {
          description: `Kata "${data.term}" berhasil ditambahkan.`,
        });

        // Reset form
        form.reset();
        setSlugStatus(null);

        // Redirect to word page
        router.push(`/word/${result.data?.slug}`);
      } else {
        toast.error("Gagal menambahkan kata", {
          description: result.error || "Terjadi kesalahan. Silakan coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan", {
        description: "Gagal menambahkan kata. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Term Input */}
        <Card>
          <CardHeader>
            <CardTitle>Kata atau Frasa</CardTitle>
            <CardDescription>
              Masukkan kata gaul yang ingin kamu tambahkan ke IstilahKata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata/Frasa</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Contoh: gabut, kepo, skibidi"
                        {...field}
                        disabled={isSubmitting}
                      />
                      {isCheckingSlug && (
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Minimal 2 karakter, maksimal 100 karakter
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug Status Alert */}
            {slugStatus && !isCheckingSlug && watchedTerm.length >= 2 && (
              <Alert
                variant={slugStatus.available ? "default" : "destructive"}
                className="mt-2"
              >
                {slugStatus.available ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {slugStatus.available ? (
                    <span>Kata ini tersedia! ✨</span>
                  ) : (
                    <span>
                      Kata &quot;{slugStatus.existingWord?.term}&quot; sudah
                      ada.{" "}
                      <a
                        href={`/word/${slugStatus.existingWord?.id}`}
                        className="font-medium underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Lihat kata ini
                      </a>
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Context Input */}
        <Card>
          <CardHeader>
            <CardTitle>Konteks Penggunaan (Opsional)</CardTitle>
            <CardDescription>
              Berikan konteks atau situasi di mana kata ini biasa digunakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konteks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Contoh: Biasa dipakai saat seseorang sedang tidak ada kerjaan atau merasa bosan"
                      rows={4}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>Maksimal 500 karakter</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Language Selector */}
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LanguageSelector
                    languages={languages}
                    value={field.value}
                    onChange={field.onChange}
                    error={form.formState.errors.languages?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Generation Selector */}
          <FormField
            control={form.control}
            name="generations"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <GenerationSelector
                    generations={generations}
                    value={field.value || []}
                    onChange={field.onChange}
                    error={form.formState.errors.generations?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={
              isSubmitting || (slugStatus !== null && !slugStatus.available)
            }
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menambahkan...
              </>
            ) : (
              "Tambahkan Kata"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
