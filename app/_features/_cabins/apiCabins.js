"use server";
import { notFound } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins_with_status").select("*");

  // For testing
  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Cabins could not be fetched");
  }

  return data;
}

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
