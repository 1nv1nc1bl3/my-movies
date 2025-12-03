export default function FavoritesPage() {
    return (
        <div className='max-w-5xl mx-auto px-4 py-10 space-y-10'>
            <h1 className='text-2xl font-semibold mb-4'>
                Your favorite movies
            </h1>

            {/* Εδώ αργότερα θα κάνουμε map τα favorites */}
            <article className='flex flex-col sm:flex-row gap-6 pb-8 border-b border-slate-200'>
                <img
                    src='https://via.placeholder.com/200x300'
                    alt='Movie title'
                    className='w-32 sm:w-40 rounded shadow'
                />

                <div className='flex-1'>
                    <h2 className='text-xl font-semibold mb-2'>Movie title</h2>
                    <p className='text-sm text-slate-700 mb-4'>
                        Short description of the movie goes here…
                    </p>
                    <button className='px-4 py-1 rounded-full bg-red-600 text-white text-sm'>
                        Remove movie
                    </button>
                </div>
            </article>
        </div>
    );
}
