import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
const KEY = 'cb1f27af';

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.trim().length < 3) {
            setMovies([]);
            setError(false);
            return;
        }

        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(false);

                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();

                if (data.Response === 'False') {
                    setMovies([]);
                    return;
                }
                setMovies(data.Search || []);
                // console.log(data.Search);
            } catch (err) {
                console.log('Error fetching movies!', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        const timer = setTimeout(fetchMovies, 1500);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    if (error) return <h2>There was an error fetching movies.</h2>;

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
                    path: '*',
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
export default App;

/*
return (
        <div className='min-h-vh flex flex-col justify-start items-start px-5 py-5'>
            <Navbar query={query} setQuery={setQuery} />
            {loading && <Loader />}
            <div className='results'>
                {!loading &&
                    movies?.map((movie) => {
                        const {
                            Title: title,
                            Year: year,
                            imdbID,
                            Genre: genre,
                            Runtime: runtime,
                            Plot: plot,
                            Actors: actors,
                            Ratings: rating,
                            Poster: poster,
                        } = movie;
                        return (
                            <div key={imdbID}>
                                <h2>{title}</h2>
                                <p>{year}</p>
                                <p>{imdbID}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
    */
