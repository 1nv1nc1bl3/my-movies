import {
    useParams,
    useNavigate,
    useLocation,
    Navigate,
} from 'react-router-dom';
import { useMovieDetails } from '../utils/useMovieDetails.js';
import Error from '../components/Error.jsx';
import Loader from '../components/Loader.jsx';

const KEY = '8f73159d5a230921c187dc2da836f1c6';

const MovieDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { movie } = state || {};

    const { details, loading, error } = useMovieDetails(id);

    const navigate = useNavigate();

    const cast = details?.credits?.cast?.slice(0, 10) ?? []; // 'cast' is an array
    // console.log(cast);

    if (!movie) return <Navigate to='*' />;

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

    const backdropURL = backdrop_path
        ? `https://image.tmdb.org/t/p/original${backdrop_path}`
        : '';

    const director =
        details?.credits?.crew?.find((dir) => dir.job === 'Director')?.name ||
        '-';

    const videoURL =
        details?.videos?.results?.find((vid) => vid.type === 'Trailer')?.key ||
        '-';

    // const actualRuntime = `${Math.floor(details?.runtime / 60)}h ${
    //     details?.runtime % 60
    // }m`;

    const formattedRuntime = (runtime) => {
        if (!runtime) return '';
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        if (!hours) return `${minutes}m`;
        if (!minutes) return `${hours}h`;
        return `${hours}h ${minutes}m`;
    };

    const actualRuntime = formattedRuntime(details?.runtime);

    const GENRES = {
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
    const genreNames = genre_ids.map((gid) => GENRES[gid]).join(' • ');

    return (
        <>
            {loading && <Loader loading={loading} />}
            {error && <Error />}
            {!loading && (
                <>
                    <div className='relative h-72 w-full overflow-hidden'>
                        {backdropURL && (
                            <img
                                src={backdropURL}
                                alt={title}
                                className='w-full h-full object-cover opacity-60'
                            />
                        )}
                        <div className='absolute inset-0 bg-black/40' />
                    </div>

                    <div className='max-w-6xl mx-auto px-4 pb-24 -mt-10 relative'>
                        <div className='-mt-14 relative z-20'>
                            <button
                                onClick={() => navigate(-1)}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white border border-gray-300 text-sm text-gray-800 shadow-sm transition cursor-pointer'
                            >
                                ← Back
                            </button>
                        </div>

                        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-[300px_minmax(0,1fr)_260px] relative z-10 lg:mt-24'>
                            {/* POSTER SECTION */}
                            <div className='md:col-span-2 lg:col-span-1 flex justify-center lg:block'>
                                <div
                                    className='relative rounded-2xl overflow-hidden shadow-xl 
                                       w-full max-w-xs sm:max-w-sm 
                                       lg:max-w-none lg:-mt-14'
                                >
                                    <img
                                        src={posterURL}
                                        alt={title}
                                        className='w-full h-auto object-cover'
                                    />

                                    <span className='absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-lg shadow font-bold text-sm'>
                                        {ratingValue}
                                    </span>
                                </div>
                            </div>

                            {/* OVERVIEW SECTION */}
                            <div className='lg:col-span-1 text-black space-y-4'>
                                <h1 className='flex justify-start items-end gap-3 text-3xl sm:text-4xl font-normal leading-10 mb-1'>
                                    <span>{title}</span>
                                    <span className='text-xl sm:text-2xl text-gray-600'>
                                        {year}
                                    </span>
                                </h1>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm text-gray-600'>
                                        {genreNames}
                                    </p>
                                    <p className='text-lg sm:text-xl text-gray-600'>
                                        {actualRuntime}
                                    </p>
                                </div>
                                <p className='text-sm text-gray-600'>
                                    Directed by {director}
                                </p>

                                <h2 className='text-lg font-semibold mt-6 mb-1'>
                                    Overview
                                </h2>
                                <p className='text-gray-700 leading-relaxed max-w-prose'>
                                    {overview}
                                </p>
                                <h2 className='text-lg font-semibold mt-6 mb-1'>
                                    Cast
                                </h2>

                                <div className='text-gray-700 mt-2'>
                                    {cast.map((act, index) => (
                                        <span
                                            className='inline-block rounded-full bg-slate-900/85 px-3 py-1 text-white text-sm mr-2 mb-2'
                                            key={act.cast_id ?? act.id ?? index}
                                        >
                                            {act.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* RATINGS SECTION */}
                            <div className='lg:col-span-1 bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl self-start'>
                                <h3 className='text-xs uppercase tracking-wider text-slate-300'>
                                    TMDB Rating
                                </h3>

                                <p className='text-5xl font-bold mt-2'>
                                    {ratingValue}
                                </p>

                                <p className='text-xs text-slate-300 mt-1'>
                                    Average user score
                                </p>

                                <div className='h-px bg-slate-700/60 mt-6 mb-4' />

                                {videoURL && (
                                    <div className='mt-2 mb-4'>
                                        <a
                                            href={`https://www.youtube.com/watch?v=${videoURL}`}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='inline-flex items-center justify-center rounded-full bg-[#f3143c] hover:bg-[#d91235] px-4 py-1.5 text-sm font-medium text-white transition'
                                        >
                                            <span>YouTube Trailer</span>
                                        </a>
                                    </div>
                                )}

                                <p className='text-xs text-slate-500'>
                                    Movie ID: {id}
                                </p>
                            </div>
                            <p className='text-gray-700 leading-relaxed max-w-prose'></p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default MovieDetails;
