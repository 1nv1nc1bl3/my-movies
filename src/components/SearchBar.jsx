import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ query, setQuery, variant = 'default' }) => {
    // ίδιο input, αλλά λίγο διαφορετικό wrapper αν είμαστε μέσα στο Hero
    const wrapperClass =
        variant === 'hero'
            ? 'w-full flex justify-center'
            : 'w-full flex justify-center px-4 pt-4';

    return (
        <div className={wrapperClass}>
            <div className='w-full max-w-xl flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 shadow-sm px-4 py-2 text-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'>
                <FiSearch className='text-gray-400' />
                <input
                    type='text'
                    placeholder='Search for a movie...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className='w-full bg-transparent outline-none placeholder:text-gray-400'
                />
            </div>
        </div>
    );
};

export default SearchBar;
