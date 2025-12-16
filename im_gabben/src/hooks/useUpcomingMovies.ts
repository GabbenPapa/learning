import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingMovies } from "../api/tmdb";
import { movieKeys } from "../api/queryKeys";

export function useUpcomingMovies() {
  return useQuery({
    queryKey: movieKeys.upcoming(),
    queryFn: fetchUpcomingMovies,
    staleTime: 1000 * 60 * 1,
  });
}
