import { useState, useEffect } from 'react';

export function useMovie(KEY) {
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
                    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${query}`,
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
    }, [query]);

    return { query, setQuery, error, loading, movies };
}

// FOR FUTURE USE
// const fetchGenres = async () => {
//     try {
//         const result = await fetch(
//             'https://api.themoviedb.org/3/genre/movie/list'
//         );
//         const genreData = await result.json();
//         console.log(genreData);
//     } catch (error) {
//         console.log('Error fetching genres', error);
//     }
// };
// useEffect(() => {
//     fetchGenres();
// }, []);
