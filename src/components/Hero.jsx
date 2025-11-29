import SearchBar from './SearchBar';

const Hero = ({ query, setQuery }) => {
    return (
        <section
            className='hero min-h-[calc(100vh-8rem)]'
            style={{
                backgroundImage:
                    'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
            }}
        >
            {/* overlay */}
            <div className='hero-overlay bg-black/60'></div>

            {/* content */}
            <div className='hero-content min-h-screen text-neutral-content text-center flex flex-col justify-center items-center px-4'>
                <div className='max-w-md'>
                    <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
                    <p className='mb-5'>
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>

                {/* search μέσα στο hero */}
                <div className='mt-6 w-full flex justify-center'>
                    <div className='w-full max-w-xl'>
                        <SearchBar query={query} setQuery={setQuery} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
