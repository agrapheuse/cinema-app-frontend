import { getCinemas, getMovies, getUserLikes } from "@/services/DataService";
import type { Cinema } from "@/types/Cinema";
import type { Movie } from "@/types/Movie";
import { useQuery } from "react-query";
import type { UseQueryResult } from "react-query";
import { LikedShowing } from "@/types/Showing";

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

export function useUserLikes({
  userId,
}: {
  userId: string;
}): UseQueryResult<LikedShowing[], Error> {
  return useQuery(["likes", userId], () => getUserLikes({ userId }), {
    enabled: !!userId,
  });
}
