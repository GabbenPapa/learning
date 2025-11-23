import React, { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import type { Movie } from "../types/Movie";
import { fetchPopularMovies } from "../api/tmdb";
import { MovieGrid } from "../components/MovieGrid";

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

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
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
  );
};
