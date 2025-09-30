import slugify from "slugify";

export function createSlug(term: string): string {
  return slugify(term, {
    lower: true,
    strict: true,
    trim: true,
    locale: "id", // Indonesian locale
  });
}

export function createUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
