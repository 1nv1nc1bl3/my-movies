import { useState, useEffect } from 'react';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

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

                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&append_to_response=credits,videos`,
                    { signal: controller.signal }
                );
                if (!res.ok) {
                    setError(true);
                    return;
                }

                const data = await res.json();
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
