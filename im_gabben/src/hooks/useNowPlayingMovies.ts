import { useQuery } from "@tanstack/react-query";
import { fetchNowPlaying } from "../api/tmdb";
import { movieKeys } from "../api/queryKeys";

export function useNowPlayingMovies() {
  return useQuery({
    queryKey: movieKeys.nowPlaying(),
    queryFn: fetchNowPlaying,
    staleTime: 1000 * 60 * 1,
  });
}
