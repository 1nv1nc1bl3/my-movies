import { Link } from 'react-router-dom';

export default function MovieCard({ favorites = [], setFavorites, ...movie }) {
    const { title, release_date, id, vote_average, poster_path } = movie;

    const ratingValue = vote_average?.toFixed(1);
    const year = release_date ? release_date.slice(0, 4) : '—';
    const posterURL = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://placehold.co/500x750/orange/orange';

    // check if movie is in Favorites
    const isFavorite = favorites.some((fav) => fav.id === id);

    // Toggle movie state (favorite/not favorite)
    const onFavoriteClick = () => {
        if (!setFavorites) return;
        setFavorites((prev) =>
            isFavorite ? prev.filter((fav) => fav.id !== id) : [...prev, movie]
        );
        // console.log('Clicked movie with ID:', movie.id);
        console.log(favorites);
    };

    return (
        <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02] '>
            <Link
                to={`/movie/${id}`}
                state={{
                    movie,
                }}
            >
                {/* Poster */}
                <div className='relative aspect-[2/3] w-full overflow-hidden cursor-pointer'>
                    <img
                        src={posterURL}
                        alt={title}
                        className='w-full h-full object-cover'
                    />

                    {/* Rating Badge */}
                    <div className='absolute top-2 right-2 bg-yellow-400 text-gray-900 text-sm font-semibold px-2 py-1 rounded-md shadow'>
                        {ratingValue}
                    </div>
                    {/* Favorites Heart */}
                </div>
            </Link>
            {/* Text Content */}
            <div className='p-4 space-y-1'>
                <h3 className='text-lg font-semibold line-clamp-1'>{title}</h3>
                <p className='text-sm text-gray-500 flex flex-row justify-between items-center'>
                    <span className='inline-block'>{year}</span>
                    {setFavorites && (
                        <button
                            onClick={onFavoriteClick}
                            className='inline-block text-lg cursor-pointer'
                        >
                            {isFavorite ? '❤️' : '🤍'}
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
}
