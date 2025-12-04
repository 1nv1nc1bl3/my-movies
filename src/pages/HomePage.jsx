import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import TrendingSection from '../components/TrendingSection.jsx';
import { useMovie } from '../utils/useMovie.js';
// import { useTrending } from '../utils/useTrending.js';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

const HomePage = () => {
    const { query, setQuery, error, loading, movies } = useMovie(KEY);

    const showLanding = query.trim().length < 3;

    return (
        <div className='min-h-[calc(100vh-8rem)] bg-slate-50'>
            {/* SEARCH STRIP – μοναδικό search, κάτω από navbar */}
            <div className='w-full bg-white shadow-sm'>
                <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-teal-300'>
                    <SearchBar query={query} setQuery={setQuery} />
                </div>
            </div>

            {showLanding ? (
                <>
                    {/* HERO BANNER */}
                    <Hero />

                    {/* TRENDING SECTION */}
                    <TrendingSection />
                </>
            ) : (
                // SEARCH RESULTS MODE
                <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                    {loading && <Loader loading={loading} />}
                    {error && <Error />}
                    {!loading && !error && <MovieList movies={movies} />}
                </section>
            )}
        </div>
    );
};

export default HomePage;
