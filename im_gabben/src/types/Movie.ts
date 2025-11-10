
export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
