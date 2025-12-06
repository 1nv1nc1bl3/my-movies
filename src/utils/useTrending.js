import { useEffect, useState } from 'react';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

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
                const res = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/${period}?api_key=${KEY}`,
                    {
                        signal: controller.signal,
                    }
                );
                if (!res.ok) {
                    setErrorTrending(true);
                    return;
                }
                const data = await res.json();
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
