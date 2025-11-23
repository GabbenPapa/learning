import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { PopularMovies } from "./pages/PopularMovies";
import { NowPlaying } from "./pages/NowPlaying";
import { MovieDetails } from "./components/MovieDetails";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/popular", element: <PopularMovies /> },
  { path: "/now-playing", element: <NowPlaying /> },
  { path: "/top-rated", element: <NowPlaying /> },
  { path: "/upcoming", element: <NowPlaying /> },
  { path: "/movie/:id", element: <MovieDetails /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;