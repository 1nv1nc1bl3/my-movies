export default function Error({
    message = 'Couldn’t load data. Try again.',
    onRetry,
}) {
    return (
        <div className='w-full max-w-2xl mx-auto mt-6 rounded-lg border border-red-200 bg-red-50 p-6 text-center'>
            <h2 className='text-2xl font-bold text-red-700'>Ooops!</h2>
            <p className='mt-2 text-base text-red-700'>{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className='mt-4 px-6 py-2 text-sm font-semibold rounded bg-red-600 text-white hover:opacity-90'
                >
                    Retry
                </button>
            )}
        </div>
    );
}
