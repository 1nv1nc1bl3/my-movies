import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
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

    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: 'movie/:id',
                    element: <MovieDetails />,
                },
                {
                    path: 'favorites',
                    element: <FavoritesPage />,
                },
            ],
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
    return (
        <FavoritesProvider>
            <RouterProvider router={router} />
        </FavoritesProvider>
    );
}
