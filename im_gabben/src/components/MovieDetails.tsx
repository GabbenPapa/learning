import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import { LoadingSpinner } from "../components/LoadingSpinner";

import { Box, Typography, Container, Chip, Stack, Grid } from "@mui/material";

export const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [movie, setMovie] = useState(state || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchMovieDetails(Number(id))
        .then(setMovie)
        .finally(() => setLoading(false));
    }
  }, [id]);

  console.log(movie);

  return (
    <>
      <LoadingSpinner loading={loading} />
      <Grid>
        <Box sx={{ mt: 6, px: "20%" }}>
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
                  <Typography>
                    {movie.original_language.toUpperCase()}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="600">Original country:</Typography>
                  <Typography>{movie.origin_country}</Typography>
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

            {movie.belongs_to_collection && (
              <Box sx={{ mt: 4, mb: 5 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Part of {movie.belongs_to_collection.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  {movie.belongs_to_collection.poster_path && (
                    <Box
                      component="img"
                      src={`https://image.tmdb.org/t/p/w300${movie.belongs_to_collection.poster_path}`}
                      alt={movie.belongs_to_collection.name}
                      sx={{
                        width: { xs: "100%", sm: 200 },
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    />
                  )}
                  {movie.belongs_to_collection.backdrop_path && (
                    <Box
                      component="img"
                      src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.backdrop_path}`}
                      alt={movie.belongs_to_collection.name}
                      sx={{
                        flex: 1,
                        borderRadius: 2,
                        boxShadow: 3,
                        objectFit: "cover",
                        maxHeight: 300,
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      </Grid>
    </>
  );
};
