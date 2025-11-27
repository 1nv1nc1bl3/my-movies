import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useMovie } from '../utils/useMovie.js';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

const HomePage = () => {
    const { query, setQuery, error, loading, movies } = useMovie(KEY);

    // rendering
    return (
        <div className='min-h-screen'>
            <SearchBar query={query} setQuery={setQuery} />
            {query.length < 3 && <Hero />}
            {query.length >= 3 && loading && <Loader loading={loading} />}
            {query.length >= 3 && error && <Error />}
            {query.length >= 3 && !loading && (
                <MovieList loading={loading} movies={movies} />
            )}
        </div>
    );
};

export default HomePage;
