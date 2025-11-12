import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmdb";

import {
  CardMedia,
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

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        sx={{
          height: 300,
          width: 300,
          objectFit: "cover",
          borderRadius: 4,
        }}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
};
