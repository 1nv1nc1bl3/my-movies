import { useState } from 'react';
import { useTrending } from '../utils/useTrending';
import MovieCard from './MovieCard';
import Loader from './Loader';
import Error from './Error';

const TrendingSection = () => {
    const [period, setPeriod] = useState('day');
    const { trending, loadingTrending, errorTrending } = useTrending(period);
    const top4 = (trending ?? []).slice(0, 4);

    const activeClass = (isActive) =>
        period === isActive
            ? 'bg-slate-900 text-white'
            : 'border border-slate-300 hover:bg-slate-100';
    return (
        <>
            {loadingTrending && <Loader />}
            {errorTrending && <Error />}
            {!loadingTrending && !errorTrending && (
                <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                    {/* Header row: title + buttons */}
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                        <div>
                            <h2 className='text-2xl font-semibold text-slate-900'>
                                Trending
                            </h2>
                            <p className='text-sm text-slate-500 mt-1'>
                                {period === 'day'
                                    ? 'Most popular movies today'
                                    : 'Most popular movies this week'}
                            </p>
                        </div>

                        <div className='inline-flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs sm:text-sm'>
                            <button
                                onClick={() => setPeriod('day')}
                                className={`day-button px-3 py-1 rounded-full ${activeClass(
                                    'day'
                                )}`}
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setPeriod('week')}
                                className={`week-button px-3 py-1 rounded-full ${activeClass(
                                    'week'
                                )} `}
                            >
                                This week
                            </button>
                            {/*
active:  px-3 py-1 rounded-full bg-slate-900 text-white
not active: px-3 py-1 rounded-full border border-slate-300 hover:bg-slate-100
*/}
                        </div>
                    </div>

                    {/* MOBILE: horizontal scroll / pseudo-carousel */}
                    <div className='mt-6 md:hidden'>
                        <div className='flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory'>
                            {top4.map((movie) => (
                                <div
                                    key={movie.id}
                                    className='min-w-[60%] snap-center'
                                >
                                    <MovieCard {...movie} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TABLET & DESKTOP: grid */}
                    <div className='mt-6 hidden md:grid gap-6 md:grid-cols-4 lg:grid-cols-4'>
                        {top4.map((movie) => (
                            <MovieCard key={movie.id} {...movie} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export default TrendingSection;
