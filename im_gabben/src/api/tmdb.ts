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
export async function fetchNowPlaying() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 30);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const minDateStr = formatDate(minDate);
  const maxDateStr = formatDate(maxDate);

  const url = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDateStr}&release_date.lte=${maxDateStr}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch now playing movies");
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
