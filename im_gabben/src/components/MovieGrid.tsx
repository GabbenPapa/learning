import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { Movie } from "../types/Movie";

type MovieGridProps = {
  movies: Movie[];
};

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  const navigate = useNavigate();

  if (movies.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
        No movies found.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {movies.map((movie) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
          <Card
            onClick={() => navigate(`/movie/${movie.id}`, { state: movie })}
            sx={{
              height: 520,
              borderRadius: 3,
              boxShadow: 4,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 8,
              },
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardMedia
              component="img"
              image={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              sx={{
                height: 350,
                objectFit: "cover",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                noWrap
                title={movie.title}
              >
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "—"}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      movie.vote_average > 7
                        ? "success.main"
                        : "text.secondary",
                  }}
                >
                  ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
