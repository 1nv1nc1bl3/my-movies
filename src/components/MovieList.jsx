import Loader from './Loader';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {movies?.map((movie) => {
                return <MovieCard key={movie.imdbID} {...movie} />;
            })}
        </div>
    );
};

export default MovieList;
