import { useParams, useLocation, Link, Navigate } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { movie } = state || {};
    const {
        title,
        release_date,
        genre_ids,
        overview,
        vote_average,
        poster_path,
    } = movie;

    const ratingValue = vote_average?.toFixed(1);
    const year = release_date ? release_date.slice(0, 4) : '—';
    const posterURL = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://placehold.co/500x750/orange/orange';

    if (!movie) {
        return <Navigate to='*' />;
    } else {
        console.log(movie);
    }

    return (
        <div className='mx-auto max-w-7xl min-h-screen flex flex-col items-center'>
            <div>
                <Link to='/'>
                    ⬅️ <span>Back to List</span>
                </Link>
            </div>
            <div className='flex flex-col justify-start items-start'>
                <p>
                    <img src={posterURL} alt={title} />
                </p>
                <p>
                    {title} - {year}
                </p>

                <p>
                    Genres:{' '}
                    {genre_ids.map((genre, index) => (
                        <span key={index}>{genre} </span>
                    ))}
                </p>
                <p>Overview: {overview}</p>
                <p>Rating: {ratingValue}</p>
                <p>movie ID: {id}</p>
            </div>
        </div>
    );
};

export default MovieDetails;
