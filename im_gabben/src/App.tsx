import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PopularMovies } from "./pages/PopularMovies";
import { NowPlaying } from "./pages/NowPlaying";
import { MovieDetails } from "./components/MovieDetails";
import { TopRated } from "./pages/TopRated";
import { UpcomingMovies } from "./pages/UpcomingMovies";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/popular", element: <PopularMovies /> },
      { path: "/now-playing", element: <NowPlaying /> },
      { path: "/movie/:id", element: <MovieDetails /> },
      { path: "/top-rated", element: <TopRated /> },
      { path: "/upcoming", element: <UpcomingMovies /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
