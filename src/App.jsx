import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import ActorDetailsPage from './pages/ActorDetailsPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
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
                {
                    path: 'actor/:id',
                    element: <ActorDetailsPage />,
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
