import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    const emptyFavorites = favorites.length === 0;

    return (
        <div className='max-w-5xl mx-auto px-4 py-10 space-y-10'>
            <h1 className='text-5xl mb-2 text-center uppercase font-semibold '>
                favorite movies
            </h1>
            <p className='mt-4 text-5xl text-center font-semibold tracking-tight text-balance text-gray-900 sm:text-xl'>
                Movies that you have either watched or you are planning to.
            </p>
            <div className='lg:grid md:grid md:grid-cols-2 sm:flex flex-col gap-7 mt-20'>
                {emptyFavorites && (
                    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
                        <div className='text-center'>
                            <p className='mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-xl'>
                                No movies added yet
                            </p>
                        </div>
                    </main>
                )}

                {favorites.map((favorite) => {
                    // making overview in Favorites shorter
                    const shortDesc = favorite?.overview
                        ? `${favorite.overview.slice(0, 200)}${
                              favorite.overview.length > 200 ? '...' : ''
                          }`
                        : 'No description available.';

                    // constructing poster image from path
                    const posterURL = favorite.poster_path
                        ? `https://image.tmdb.org/t/p/w500${favorite.poster_path}`
                        : 'https://placehold.co/500x750/orange/orange';

                    return (
                        <article
                            key={favorite.id}
                            className='flex flex-col sm:flex-row gap-6 pb-8 border-b border-slate-200'
                        >
                            <img
                                src={posterURL}
                                alt={favorite.title}
                                className='w-32 sm:w-40 rounded shadow'
                            />

                            <div className='flex-1'>
                                <h2 className='text-xl font-semibold mb-2'>
                                    <Link
                                        to={`/movie/${favorite.id}`}
                                        state={{ movie: favorite }}
                                    >
                                        {favorite.title}
                                    </Link>
                                </h2>
                                <p className='max-w-lg text-sm text-slate-700 mb-4'>
                                    {shortDesc}
                                </p>
                                <button
                                    onClick={() => toggleFavorite(favorite)}
                                    className='px-4 py-1 rounded-full bg-red-600 text-white text-sm cursor-pointer'
                                >
                                    Remove favorite
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
