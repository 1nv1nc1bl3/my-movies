import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
    const STORAGE_KEY = 'cinemate:favorites';

    function loadFavorites() {
        // if the key doesn't exist yet, return an empty array as the default value
        if (!localStorage.getItem(STORAGE_KEY)) return [];
        try {
            // parse stored JSON string into JS value
            // if it returns a falsy value, fall back to an empty array
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            // if value not a valid JSON, return empty array
            return [];
        }
    }

    // initialize state / loadFavorites runs only once on initial render
    const [favorites, setFavorites] = useState(() => loadFavorites());

    // sync the favorites state to localStorage whenever favorites changes (dependency array)
    useEffect(() => {
        // convert the favorites array into a JSON string and store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    // toggle movie state (favorite/not favorite)
    const toggleFavorite = (movie) => {
        setFavorites((prev) => {
            // check if the movie already exists in favorites by id
            const exists = prev.some((fav) => fav.id === movie.id);
            return exists
                ? prev.filter((fav) => fav.id !== movie.id) // remove movie from favorites
                : [...prev, movie]; // add movie to favorites
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
