import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../api/tmdb";
import { movieKeys } from "../api/queryKeys";

export function usePopularMovies() {
  return useQuery({
    queryKey: movieKeys.popular(),
    queryFn: fetchPopularMovies,
    staleTime: 1000 * 60 * 1,
  });
}
