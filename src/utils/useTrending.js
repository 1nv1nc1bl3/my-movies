import { useEffect, useState } from 'react';
import { tmdbFetch } from './tmdbFetch';

export function useTrending(period) {
    const [trending, setTrending] = useState([]);
    const [loadingTrending, setLoadingTrending] = useState(false);
    const [errorTrending, setErrorTrending] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchTrending = async () => {
            try {
                setLoadingTrending(true);
                setErrorTrending(false);

                const data = await tmdbFetch(
                    `/trending/movie/${period}`,
                    {},
                    { signal: controller.signal }
                );

                setTrending(data.results);
                // console.log(data.results);
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.log('Error fetching trending movies |', error);
                setErrorTrending(true);
            } finally {
                setLoadingTrending(false);
            }
        };

        fetchTrending();
        return () => {
            controller.abort();
        };
    }, [period]);

    return { trending, loadingTrending, errorTrending };
}
