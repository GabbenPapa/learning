import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import type { Movie } from "../types/Movie";
import { fetchPopularMovies } from "../api/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const PopularMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchPopularMovies();
        setMovies((data as { results: Movie[] }).results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  return (
    <>
      <LoadingSpinner loading={loading} />;
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Popular Movies
        </Typography>
        <MovieGrid movies={movies} />
      </Container>
    </>
  );
};
