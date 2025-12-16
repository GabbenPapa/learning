import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "../api/tmdb";
import { movieKeys } from "../api/queryKeys";

export function useTopRatedMovies() {
  return useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: fetchTopRatedMovies,
    staleTime: 1000 * 60 * 1,
  });
}
