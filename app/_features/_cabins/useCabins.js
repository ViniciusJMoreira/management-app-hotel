import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../_cabins/apiCabins";

export function useCabins() {
  const { data: cabins, isPending: isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
}
