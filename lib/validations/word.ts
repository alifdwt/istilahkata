import { z } from "zod";

export const wordRequestSchema = z.object({
  term: z
    .string()
    .min(2, "Kata minimal 2 karakter")
    .max(100, "Kata maksimal 100 karakter")
    .trim(),

  context: z
    .string()
    .max(500, "Konteks maksimal 500 karakter")
    .optional()
    .or(z.literal("")),

  languages: z
    .array(
      z.object({
        id: z.string().uuid(),
        isPrimary: z.boolean(),
      })
    )
    .min(1, "Pilih minimal 1 bahasa")
    .refine(
      (langs) => langs.filter((l) => l.isPrimary).length === 1,
      "Harus ada 1 bahasa primary"
    ),

  generations: z
    .array(
      z.object({
        id: z.string().uuid(),
        isPrimary: z.boolean(),
      })
    )
    .optional()
    .refine(
      (gens) =>
        !gens ||
        gens.length === 0 ||
        gens.filter((g) => g.isPrimary).length === 1,
      "Jika memilih generasi, harus ada 1 generasi primary"
    ),
});

export type WordRequestInput = z.infer<typeof wordRequestSchema>;
