import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';

function App() {
    const [favorites, setFavorites] = useState([]);

    // Toggle movie state (favorite/not favorite)
    const toggleFavorite = (movie) => {
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.id === movie.id);
            return exists
                ? prev.filter((fav) => fav.id !== movie.id)
                : [...prev, movie];
        });
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <HomePage
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    ),
                },
                {
                    path: 'movie/:id',
                    element: (
                        <MovieDetails
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    ),
                },
                {
                    path: 'favorites',
                    element: (
                        <FavoritesPage
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                        />
                    ),
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
    return <RouterProvider router={router} />;
}
export default App;
