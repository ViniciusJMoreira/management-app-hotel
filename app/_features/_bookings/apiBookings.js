"use server";
import { supabase } from "@/app/_lib/supabase";

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)");

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Bookings could not be fetched");
  }

  return data;
}
