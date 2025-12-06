import MovieCard from './MovieCard';

const MovieList = ({ movies, favorites, toggleFavorite }) => {
    return (
        <div
            className='
                grid 
                grid-cols-1
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4
                gap-6 
                p-4
                mx-auto max-w-7xl
            '
        >
            {movies?.map((movie) => (
                <MovieCard
                    key={movie.id}
                    favorites={favorites}
                    {...movie}
                    toggleFavorite={toggleFavorite}
                />
            ))}
        </div>
    );
};

export default MovieList;
