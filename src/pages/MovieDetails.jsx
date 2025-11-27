import { useParams, useLocation, Link, Navigate } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { movie } = state || {};
    if (!movie) {
        return <Navigate to='*' />;
    } else {
        console.log(movie);
    }
    return (
        <div className='min-h-screen flex flex-col items-center'>
            <div>
                <Link to='/'>
                    ⬅️ <span>Back to List</span>
                </Link>
            </div>
            <div>
                <p>
                    Image: {movie.posterURL}
                    Title: {movie.title}
                </p>
                <p className='flex'>{movie.year}</p>
                <p>
                    {movie.genre_ids}
                    {movie.overview}
                    {movie.ratingValue}
                </p>
                <p>movie ID: {id}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
