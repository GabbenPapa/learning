import React from "react";
// import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import { MovieSearch } from "../components/SearchMovies";

export const TopRated: React.FC = () => {
  // const navigate = useNavigate();

  // const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <Container sx={{ mt: 6 }}>
      <MovieSearch
        onSearch={() => {
          console.log("search");
        }}
      />
    </Container>
  );
};
