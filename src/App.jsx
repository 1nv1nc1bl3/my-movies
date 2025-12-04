import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';

function App() {
    const [favorites, setFavorites] = useState([]);

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
                            setFavorites={setFavorites}
                        />
                    ),
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
    return <RouterProvider router={router} />;
}
export default App;
