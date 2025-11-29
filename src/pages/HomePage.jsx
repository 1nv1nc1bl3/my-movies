import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useMovie } from '../utils/useMovie.js';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

const HomePage = () => {
    const { query, setQuery, error, loading, movies } = useMovie(KEY);

    const showHero = query.trim().length < 3;

    return (
        <div className='min-h-[calc(100vh-8rem)] flex flex-col'>
            {showHero ? (
                // Landing: Hero με το search μέσα
                <Hero query={query} setQuery={setQuery} />
            ) : (
                // Results: search bar πάνω + grid από κάτω
                <>
                    <SearchBar query={query} setQuery={setQuery} />

                    <div className='flex-1 px-4 pb-8'>
                        {loading && <Loader loading={loading} />}
                        {error && <Error />}
                        {!loading && !error && <MovieList movies={movies} />}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
