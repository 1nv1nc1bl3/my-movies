const SearchBar = ({ query, setQuery }) => {
    return (
        <div className='relative search-bar'>
            <input
                type='text'
                id='Search'
                className='mt-0.5 w-full rounded border-gray-300 pe-10 shadow-sm sm:text-sm'
                placeholder='search for a movie...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <span className='absolute inset-y-0 right-2 grid w-8 place-content-center'>
                <button
                    type='button'
                    aria-label='Submit'
                    className='rounded-full p-1.5 text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='size-4'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                        ></path>
                    </svg>
                </button>
            </span>
        </div>
    );
};

export default SearchBar;
