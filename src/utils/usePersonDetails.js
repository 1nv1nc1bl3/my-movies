import { useState, useEffect } from 'react';
import { tmdbFetch } from './tmdbFetch';

export function usePersonDetails(id) {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        if (!id) return;
        const fetchPerson = async () => {
            try {
                setLoading(true);
                setError(false);

                const pers = await tmdbFetch(
                    `/person/${id}`,
                    { append_to_response: 'combined_credits' },
                    { signal: controller.signal }
                );

                setPerson(pers);
                // console.log(pers);
                // console.log('Movies:', pers.combined_credits.cast);
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.log('Error fetching actor!', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPerson();
        return () => {
            controller.abort();
        };
    }, [id]);

    return { person, loading, error };
}
