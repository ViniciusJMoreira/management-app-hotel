"use server";
import { supabase } from "@/app/_lib/supabase";
// zod validation
import { revalidatePath } from "next/cache";
import { createCabinSchema, updateCabinSchema } from "./zod-validations";
import { issuesToErrors } from "@/app/_lib/zod-errors";

const SUPABASE_URL = process.env.SUPABASE_URL;

export async function updateCabin(cabin) {
  const parsed = updateCabinSchema.safeParse(cabin);

  if (!parsed.success) {
    const { fieldErrors, formError } = issuesToErrors(parsed.error.issues);
    return { ok: false, fieldErrors, formError };
  }

  const imageUrl = typeof cabin.image === "string" && cabin.image;
  const imageFile = !imageUrl && cabin.image[0];
  const imageName = imageFile && imageFile?.name.replaceAll("/", "");
  const imagePath = imageFile
    ? `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`
    : imageUrl;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin, image: imagePath })
    .eq("id", cabin.id)
    .select()
    .single();

  if (error)
    return { ok: false, error: { message: "Cabin could not be update" } };

  if (imageUrl) {
    revalidatePath("/dashboard/cabins");
    return { ok: true, redirectTo: "/dashboard/cabins" };
  }

  //////// 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    return {
      ok: false,
      fieldErrors: { image: [storageError.message] },
      error: { message: "File not allowed." },
    };
  }

  revalidatePath("/dashboard/cabins");
  return { ok: true, redirectTo: "/dashboard/cabins" };
}

export async function createCabin(newCabin) {
  const parsed = createCabinSchema.safeParse(newCabin);

  if (!parsed.success) {
    const { fieldErrors, formError } = issuesToErrors(parsed.error.issues);
    return { ok: false, fieldErrors, formError };
  }

  const imageFile = newCabin?.image[0];
  const imageName = imageFile?.name?.replaceAll("/", "");
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert({ ...newCabin, image: imagePath, imagePath: imageName })
    .select()
    .single();

  if (error)
    return { ok: false, error: { message: "Cabin could not be created" } };

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    return {
      ok: false,
      fieldErrors: { image: [storageError.message] },
      error: { message: "Image not allowed." },
    };
  }

  revalidatePath("/dashboard/cabins");
  return { ok: true, redirectTo: "/dashboard/cabins" };
}

export async function deleteCabin(cabin) {
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.imagePath]);

  if (storageError) {
    return {
      ok: false,
      error: { message: storageError.message },
    };
  }

  const { error } = await supabase.from("cabins").delete().eq("id", cabin.id);

  if (error)
    return { ok: false, error: { message: "Cabin could not be deleted" } };

  return { ok: true, redirectTo: "/dashboard/cabins" };
}
