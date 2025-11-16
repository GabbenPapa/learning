// const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function fetchMovieDetails(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&query=${query}`
  );
  return res.json();
}
