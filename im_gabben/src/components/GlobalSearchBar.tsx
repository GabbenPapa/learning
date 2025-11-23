import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { BsSearch, BsX } from "react-icons/bs";

import type { Movie } from "../types/Movie";
import { searchMovies } from "../api/tmdb";

export const GlobalSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length <= 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchMovies(query);
        setResults((data as { results: Movie[] }).results);
        setShowResults(true);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  const handleMovieClick = (movie: Movie) => {
    navigate(`/movie/${movie.id}`, { state: movie });
    handleClear();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        bgcolor: "background.paper",
        boxShadow: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container sx={{ py: 1 }}>
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth
            placeholder="Search all movies..."
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: "#f5f5f5",
              transition: "background-color 0.3s ease",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#999" },
                "&.Mui-focused": {
                  backgroundColor: "#ffffff",
                  "& fieldset": { borderColor: "#ccc" },
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch color={isSearching ? "primary" : "action"} />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} size="small">
                      <BsX />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Search Results Dropdown - Most már a relatív Box-on belül van */}
          {showResults && results.length > 0 && (
            <Paper
              elevation={8}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 1200,
                mt: 1,
                maxHeight: "70vh",
                overflowY: "auto",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Search Results for "{query}" ({results.length} found)
                </Typography>

                <Grid container spacing={2}>
                  {results.slice(0, 20).map((movie) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }} key={movie.id}>
                      <Card
                        onClick={() => handleMovieClick(movie)}
                        sx={{
                          cursor: "pointer",
                          height: "100%",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://via.placeholder.com/500x750?text=No+Image"
                          }
                          alt={movie.title}
                          sx={{ objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 1.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight="600"
                            noWrap
                            title={movie.title}
                          >
                            {movie.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {movie.release_date
                              ? new Date(movie.release_date).getFullYear()
                              : "—"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {results.length > 20 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mt: 2 }}
                  >
                    Showing first 20of {results.length} results
                  </Typography>
                )}
              </Box>
            </Paper>
          )}

          {/* No Results Dropdown */}
          {showResults &&
            results.length === 0 &&
            query.length >= 2 &&
            !isSearching && (
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 1200,
                  mt: 1,
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography color="text.secondary" textAlign="center">
                  No movies found for "{query}"
                </Typography>
              </Paper>
            )}
        </Box>
      </Container>
    </Box>
  );
};
