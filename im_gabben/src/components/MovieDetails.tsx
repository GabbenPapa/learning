import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";

import {
  Box,
  Typography,
  Container,
  Chip,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";

export const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(state || null);

  useEffect(() => {
    if (!state && id) {
      fetchMovieDetails(Number(id)).then(setMovie);
    }
  }, [id, state]);

  if (!movie)
    return (
      <Container sx={{ textAlign: "center", mt: 8 }}>
        <CircularProgress />
      </Container>
    );

  console.log(movie);

  return (
    <Grid>
      <Box sx={{ px: "20%" }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 350, md: 500 },
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            borderRadius: 4,
            mb: 4,
          }}
        />
        <Container>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            {movie.title}
          </Typography>

          {movie.tagline && (
            <Typography
              variant="h6"
              color="text.secondary"
              fontStyle="italic"
              textAlign="left"
              gutterBottom
            >
              "{movie.tagline}"
            </Typography>
          )}

          <Container sx={{ my: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Vote average:</Typography>
                <Typography>⭐ {movie.vote_average.toFixed(1)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Vote count:</Typography>
                <Typography>{movie.vote_count}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Vote popularity:</Typography>
                <Typography>{movie.popularity}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Runtime:</Typography>
                <Typography>
                  {movie.runtime ? `${movie.runtime} min` : "— min"}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Original language:</Typography>
                <Typography>{movie.original_language.toUpperCase()}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="600">Released:</Typography>
                <Typography>{movie.release_date}</Typography>
              </Stack>
            </Stack>
          </Container>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="left"
            sx={{ mb: 3, flexWrap: "wrap" }}
          >
            {movie.genres?.map((g: { id: number; name: string }) => (
              <Chip
                key={g.id}
                label={g.name}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>

          <Typography variant="body1" sx={{ mt: 2, mb: 5, lineHeight: 1.6 }}>
            {movie.overview}
          </Typography>
        </Container>
      </Box>
    </Grid>
  );
};
