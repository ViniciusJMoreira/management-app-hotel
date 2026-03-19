import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../_bookings/apiBookings";

export function useBookings() {
  const { data: bookings, isPending: isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading };
}
