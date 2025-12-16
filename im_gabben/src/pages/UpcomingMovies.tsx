import React from "react";
import { Container, Typography } from "@mui/material";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";

export const UpcomingMovies: React.FC = () => {
  const { data, isLoading: loading, isError } = useUpcomingMovies();

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

        {isError && <p>Something went wrong!</p>}

        {data && <MovieGrid movies={data.results} />}
      </Container>
    </>
  );
};
