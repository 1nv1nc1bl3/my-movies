import { useState, useEffect } from 'react';
import { tmdbFetch } from './tmdbFetch';

export function useMovieDetails(id) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovieDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(false);

                const data = await tmdbFetch(
                    `/movie/${id}`,
                    { append_to_response: 'credits,videos' },
                    { signal: controller.signal }
                );

                // console.log('DETAILS', data.credits.cast.slice(0, 6));
                // console.log('DETAILS', data);
                // console.log('DIRECTOR', data.credits.director);

                setDetails(data);
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.log('Error fetching details!', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
        return () => {
            controller.abort();
        };
    }, [id]);

    return { id, details, loading, error };
}
