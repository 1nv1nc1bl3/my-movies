import { useState, useEffect } from 'react';
import { tmdbFetch } from './tmdbFetch';

export function useMovie(query = '') {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const trimmed = query.trim();

        if (trimmed.length < 3) {
            setMovies([]);
            setError(false);
            return;
        }

        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(false);

                const data = await tmdbFetch(
                    '/search/movie',
                    { query: trimmed },
                    { signal: controller.signal }
                );

                setMovies(data.results || []);
                // console.log(data.results);
            } catch (err) {
                if (err.name === 'AbortError') return;
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

    return { error, loading, movies };
}
