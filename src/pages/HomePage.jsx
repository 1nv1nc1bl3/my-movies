import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';

const KEY = 'cb1f27af';

const HomePage = () => {
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

    // rendering
    return (
        <div className='min-h-screen'>
            <SearchBar query={query} setQuery={setQuery} />
            {query.length < 3 && <Hero />}
            {query.length >= 3 && loading && <Loader loading={loading} />}
            {query.length >= 3 && error && <Error />}
            {query.length >= 3 && !loading && (
                <MovieList loading={loading} movies={movies} />
            )}
        </div>
    );
};

export default HomePage;
