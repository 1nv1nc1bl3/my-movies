import { useState, useEffect } from 'react';

export function useMovie(KEY, query = '') {
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

                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${trimmed}`,
                    { signal: controller.signal }
                );
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();

                setMovies(data.results || []);
                // console.log(data.results);
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
    }, [KEY, query]);

    return { error, loading, movies };
}
