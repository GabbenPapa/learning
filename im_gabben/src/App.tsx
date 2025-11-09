import { useState, useEffect } from "react";
import { fetchPopularMovies } from "./api/tmdb";

interface Movie {
  id: number;
  title: string;
  release_date?: string;
  image_path?: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchPopularMovies();
        console.log("API response:", data); // TODO: Remove this line after debugging
        setMovies((data as { results: Movie[] }).results as Movie[]);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date})
          </li>
        ))}
      </ul>
    );
}

export default App
