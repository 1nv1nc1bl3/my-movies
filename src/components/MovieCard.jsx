import { Link } from 'react-router-dom';

export default function MovieCard(movie) {
    const { title, release_date, genre_ids, id, vote_average, poster_path } =
        movie;

    const ratingValue = vote_average?.toFixed(1);
    const year = release_date ? release_date.slice(0, 4) : '—';
    const posterURL = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://placehold.co/500x750/orange/orange';

    return (
        <Link
            to={`/movie/${id}`}
            state={{
                movie,
            }}
            className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02] cursor-pointer'
        >
            {/* Poster */}
            <div className='relative aspect-[2/3] w-full overflow-hidden'>
                <img
                    src={posterURL}
                    alt={title}
                    className='w-full h-full object-cover'
                />

                {/* Rating Badge */}
                <div className='absolute top-2 right-2 bg-yellow-400 text-gray-900 text-sm font-semibold px-2 py-1 rounded-md shadow'>
                    {ratingValue}
                </div>
            </div>

            {/* Text Content */}
            <div className='p-4 space-y-1'>
                <h3 className='text-lg font-semibold line-clamp-1'>{title}</h3>
                <p className='text-sm text-gray-500'>{year}</p>
            </div>
        </Link>
    );
}
