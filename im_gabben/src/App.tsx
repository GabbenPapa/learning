import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PopularMovies } from "./components/PopularMovies/PopularMovies";
import { MovieDetails } from "./components/MovieDetails";


const router = createBrowserRouter([
  { path: "/", element: <PopularMovies /> },
  { path: "/search", element: <PopularMovies /> },
  { path: "/movie/:id", element: <MovieDetails /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;