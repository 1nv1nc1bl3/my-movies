import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Error from '../components/Error';
import TrendingSection from '../components/TrendingSection.jsx';
import { useMovie } from '../utils/useMovie.js';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

const HomePage = ({ favorites, toggleFavorite }) => {
    //
    const [searchParams, setSearchParams] = useSearchParams();

    // read the current query from URL (?q=...)
    const query = searchParams.get('q') ?? '';

    // fetch movies based on that query
    const { error, loading, movies } = useMovie(KEY, query);

    // update the URL when the user types in the search bar
    const handleSetQuery = (value) => {
        const trimmed = value;
        if (!trimmed) {
            setSearchParams({});
        } else {
            setSearchParams({ q: trimmed });
        }
    };

    // decide when to show Hero & Trending or search results
    const showLanding = query.trim().length < 3;

    return (
        <div className='min-h-[calc(100vh-8rem)] bg-slate-50'>
            {/* SEARCH */}
            <div className='w-full bg-white shadow-sm'>
                <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-teal-300'>
                    <SearchBar query={query} setQuery={handleSetQuery} />
                </div>
            </div>

            {showLanding ? (
                <>
                    {/* HERO BANNER */}
                    <Hero />

                    {/* TRENDING SECTION */}
                    <TrendingSection
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                    />
                </>
            ) : (
                // SEARCH RESULTS
                <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                    {loading && <Loader loading={loading} />}
                    {error && <Error />}
                    {!loading && !error && (
                        <MovieList
                            favorites={favorites}
                            movies={movies}
                            toggleFavorite={toggleFavorite}
                        />
                    )}
                </section>
            )}
        </div>
    );
};

export default HomePage;
