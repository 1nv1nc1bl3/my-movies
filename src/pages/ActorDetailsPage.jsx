import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePersonDetails } from '../utils/usePersonDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieCard from '../components/MovieCard';

export default function ActorDetailsPage() {
    const { id } = useParams();
    const { person, loading, error } = usePersonDetails(id);
    const [fullDesc, setFullDesc] = useState(false);
    const navigate = useNavigate();
    const imageURL = person?.profile_path
        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
        : 'https://placehold.co/500x750/orange/orange';

    // console.log(id);
    // if (!loading && !error && !person) return <Navigate to='*' />;

    let fullBio = person?.biography?.trim();
    if (!fullBio) {
        fullBio = 'No biography is available for this person.';
    }

    const isLongBio = fullBio.length > 205;
    const shortBio = isLongBio ? fullBio.slice(0, 205) + '...' : fullBio;
    const bioToShow = fullDesc ? fullBio : shortBio;

    // format birthday as dd/mm/yyyy
    const formatDate = (value) => {
        if (!value) return '-';
        const [year, month, day] = value.split('-');
        return `${day}/${month}/${year}`;
    };
    const birthday = formatDate(person?.birthday);
    const placeOfBirth = person?.place_of_birth || '-';

    // title for browser tab
    const myTitle = person?.name;
    useEffect(() => {
        if (!myTitle) return;
        document.title = `${myTitle} | CineMate`;
        return function () {
            document.title = 'CineMate';
        };
    }, [myTitle]);

    // knownForMovies array from person.combined_credits
    const castCredits = person?.combined_credits?.cast || [];
    const moviesOnly = castCredits.filter(
        (credit) => credit.media_type === 'movie'
    );
    // console.log(moviesOnly);

    const highNumOfVotes = moviesOnly.filter((num) => num.vote_count > 1000);

    const sortedMovies =
        [...highNumOfVotes]
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 4) || [];

    // const knownForMovies = sortedMovies.slice(0, 4) || [];

    return (
        <>
            {loading && <Loader loading={loading} />}
            {error && <Error />}
            {!loading && !error && person && (
                <div className='max-w-6xl mx-auto px-4 py-10'>
                    {/* Back button */}
                    <div className='mb-6'>
                        <button
                            onClick={() => navigate(-1)}
                            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-gray-300 text-sm text-gray-800 shadow-sm transition cursor-pointer'
                        >
                            ← Back
                        </button>
                    </div>

                    {/* main layout */}
                    <section className='grid gap-8 md:grid-cols-[360px_minmax(0,1fr)]'>
                        {/* portrait */}
                        <div className='flex justify-center md:justify-start'>
                            <img
                                src={imageURL}
                                alt={person.name}
                                className='w-100 max-w-full rounded-2xl object-cover shadow-xl'
                            />
                        </div>

                        {/* info */}
                        <div className='space-y-4 text-slate-900'>
                            <h1 className='text-3xl sm:text-4xl font-semibold'>
                                {person.name}
                            </h1>

                            <div className='space-y-1 text-sm'>
                                <p>
                                    <span className='font-semibold'>
                                        Birthday:{' '}
                                    </span>
                                    {birthday}
                                </p>
                                <p>
                                    <span className='font-semibold'>
                                        Birthplace:{' '}
                                    </span>
                                    {placeOfBirth}
                                </p>
                            </div>

                            <div className='mt-4 text-sm leading-relaxed text-slate-800'>
                                <p>
                                    <span>{bioToShow}</span>
                                    {isLongBio && (
                                        <button
                                            className='ml-2 text-teal-600 hover:text-teal-700 font-medium cursor-pointer'
                                            onClick={() =>
                                                setFullDesc((prev) => !prev)
                                            }
                                        >
                                            {fullDesc ? 'less' : 'more'}
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 'known for' section */}
                    <section className='mt-10'>
                        <h2 className='text-2xl font-semibold mb-4'>
                            Known for
                        </h2>

                        {sortedMovies.length === 0 ? (
                            <p className='text-sm text-slate-600'>
                                No popular movies found for this person.
                            </p>
                        ) : (
                            <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
                                {sortedMovies.map((movie) => {
                                    return (
                                        <MovieCard key={movie.id} {...movie} />
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </>
    );
}
