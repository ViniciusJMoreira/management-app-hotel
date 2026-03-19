// /app/_lib/validation/cabins.js
import { object, z } from "zod";

/**
 * Verifica "file" in modo robusto (Server Actions / ambienti diversi):
 * - Se File esiste e val è instanceof File -> ok
 * - Altrimenti controlla shape minima: name/type/size
 * - Poi valida tipo MIME e dimensione massima
 */
const fileSchema = z.custom((val) => {
  const ok =
    (typeof File !== "undefined" && val instanceof File) ||
    (val &&
      typeof val === "object" &&
      typeof val.name === "string" &&
      typeof val.type === "string" &&
      typeof val.size === "number");

  if (!ok) return false;

  const type = val.type;
  const size = val.size;

  const allowed = ["image/png", "image/jpeg", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowed.includes(type) && size <= maxSize;
}, "Image must be PNG/JPEG/WEBP and <= 5MB");

/**
 * image può essere:
 * - URL già presente nel DB (edit senza cambiare immagine)
 * - array di file proveniente dal file input (RHF tipicamente passa [File])
 */
const imageSchema = z.unknown().superRefine((val, ctx) => {
  // Caso 1: URL (edit senza cambiare immagine)
  if (typeof val === "string") {
    const ok = z.string().url().safeParse(val).success;
    if (!ok) {
      ctx.addIssue({
        message: "Invalid image URL",
      });
    }
    return;
  }

  // Caso 2: array [File] (upload da RHF)
  if (Array.isArray(val)) {
    if (val.length < 1) {
      ctx.addIssue({
        message: "Image is required",
      });
      return;
    }

    const file = val[0];
    const ok = fileSchema.safeParse(file).success;

    if (!ok) {
      ctx.addIssue({
        message: "Image must be PNG/JPEG/WEBP and <= 5MB",
      });
    }
    return;
  }

  // Qualsiasi altro tipo
  ctx.addIssue({
    message: "Image must be PNG/JPEG/WEBP and <= 5MB",
  });
});

export const updateCabinSchema = z
  .object({
    id: z.coerce
      .number({ message: "Cabina non valida" })
      .int()
      .positive("Cabina non valida"),

    name: z.string().trim().min(2).max(60),
    maxCapacity: z.coerce.number().int().min(1).max(50),

    regularPrice: z.coerce.number().min(1),
    discount: z.coerce.number().min(0),

    description: z.string().trim().min(10).max(2000),

    image: imageSchema,
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount cannot exceed regular price",
    path: ["discount"],
  });

export const createCabinSchema = z.object({
  name: z.string().trim().min(2).max(60),
  maxCapacity: z.coerce.number().int().min(1).max(50),

  regularPrice: z.coerce.number().min(1),
  discount: z.coerce.number().min(0),

  description: z.string().trim().min(10).max(2000),

  image: imageSchema,
});
