import { useState, useEffect } from 'react';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

export function usePersonDetails(id) {
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        const fetchPerson = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await fetch(
                    `https://api.themoviedb.org/3/person/${id}?api_key=${KEY}&append_to_response=combined_credits`,
                    { signal: controller.signal }
                );
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const pers = await res.json();
                setPerson(pers);
                console.log(pers);
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
