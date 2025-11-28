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
        backdrop_path,
    } = movie;

    const ratingValue = vote_average?.toFixed(1);
    const year = release_date ? release_date.slice(0, 4) : '—';
    const posterURL = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://placehold.co/500x750/orange/orange';
    const backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    const filmGenres = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Sci-Fi',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western',
    };

    if (!movie) {
        return <Navigate to='*' />;
    } else {
        console.log(movie);
    }

    return (
        <>
            <div
                className='h-64 w-full bg-cover bg-center opacity-40'
                style={{ backgroundImage: `url(${backdropURL})` }}
            >
                {' '}
            </div>
            <div className='max-w-6xl mx-auto -mt-24'>
                <div>
                    <Link to='/'>
                        ⬅️ <span>Back to List</span>
                    </Link>
                </div>
                <div className='grid gap-10 lg:grid-cols-3'>
                    <div className='relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-lg'>
                        <img src={posterURL} alt={title} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='flex items-end gap-3'>
                            <span className='text-4xl'>{title}</span>
                            <span className='text-lg'>{year}</span>
                        </h1>
                        <div className='flex flex-col'>
                            <p>
                                {genre_ids
                                    .map((id) => filmGenres[id])
                                    .join(' • ')}
                            </p>
                            <p>{overview}</p>
                            <p>movie ID: {id}</p>
                        </div>
                    </div>
                    <div>
                        <p>Rating: {ratingValue}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetails;
