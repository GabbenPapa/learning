import React from "react";
import { Container, Typography } from "@mui/material";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";

export const NowPlaying: React.FC = () => {
  const { data, isLoading: loading, isError } = useNowPlayingMovies();

  return (
    <>
      <LoadingSpinner loading={loading} />
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Now Playing
        </Typography>

        {isError && <p>Something went wrong!</p>}

        {data && <MovieGrid movies={data.results} />}
      </Container>
    </>
  );
};
