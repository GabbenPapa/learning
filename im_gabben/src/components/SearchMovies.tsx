import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

type MovieSearchProps = {
  readonly onSearch: (value: string) => void;
};

export function MovieSearch({ onSearch }: Readonly<MovieSearchProps>) {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <TextField
        fullWidth
        label="Search movies..."
        variant="outlined"
        value={query}
        onChange={handleChange}
      />
    </Box>
  );
}
