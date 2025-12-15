import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import type { Movie } from "../types/Movie";
import { fetchUpcomingMovies } from "../api/tmdb";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const UpcomingMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchUpcomingMovies();
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
          Upcoming Movies
        </Typography>
        <MovieGrid movies={movies} />
      </Container>
    </>
  );
};
