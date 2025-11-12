import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Movie } from "../../types/Movie";

import { fetchPopularMovies } from "../../api/tmdb";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

export const PopularMovies: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      async function loadMovies() {
        try {
          const data = await fetchPopularMovies();
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
      return (
        <Container sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress />
        </Container>
      );
    }
  
    return (
      <Container sx={{ mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Popular Movies
        </Typography>

        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                onClick={() =>
                  navigate(`/movie/${movie.id}`, { state: movie })
                }
              
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
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
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
                      ⭐ {movie.vote_average.toFixed(1)} / 10
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }