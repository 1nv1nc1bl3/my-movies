import { useState, useEffect } from 'react';

const KEY = 'cb1f27af';

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError('');
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );
                // console.log(res);
                if (!res.ok)
                    throw new Error(
                        'Something went wrong with fetching movies.'
                    );
                const data = await res.json();
                setMovies(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
                // console.log('Error fetching movies', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
        return () => {
            controller.abort();
        };
    }, [query]);

    return (
        <div>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default App;
