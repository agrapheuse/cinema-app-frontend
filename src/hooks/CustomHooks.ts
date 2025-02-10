import { getCinemas, getMovies } from "@/services/DataService";
import type { Cinema } from "@/types/Cinema";
import type { Movie } from "@/types/Movie";
import { useQuery } from "react-query";
import type { UseQueryResult } from "react-query";

export function useMovies({
  city,
}: {
  city: string | null;
}): UseQueryResult<Movie[], Error> {
  return useQuery(["movies"], () => getMovies({ city }));
}

export function useCinemas({
  city,
}: {
  city: string;
}): UseQueryResult<Cinema[], Error> {
  return useQuery(["cinemas", city], () => getCinemas({ city }), {
    enabled: !!city,
  });
}
