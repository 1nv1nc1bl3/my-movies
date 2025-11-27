import { Link } from 'react-router-dom';
export default function MovieCard(movie) {
    const {
        Title: title,
        Year: year,
        imdbID,

        Poster: poster,
    } = movie;
    return (
        <div>
            <Link to={`/movie/${imdbID}`} className='block'>
                <img
                    alt={title}
                    src={poster}
                    className='h-56 w-full rounded-tr-3xl rounded-bl-3xl object-cover sm:h-64 lg:h-72'
                />

                <div className='mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4'>
                    <strong className='font-medium'>{title}</strong>

                    <span className='hidden sm:block sm:h-px sm:w-8 sm:bg-yellow-500'></span>

                    <p className='mt-0.5 opacity-50 sm:mt-0'>{year}</p>
                </div>
            </Link>
        </div>
    );
}
/*
Genre: genre,
        Runtime: runtime,
        Plot: plot,
        Actors: actors,
        Ratings: rating,
*/
