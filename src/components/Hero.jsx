import heroUrl from '../images/hero-image.jpg';

const Hero = () => {
    return (
        <section
            className='relative min-h-[35rem] sm:min-h-[37rem] md:min-h-[39rem] flex items-center justify-center'
            style={{
                // backgroundImage:
                //     'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
                backgroundImage: `url(${heroUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 60%',
            }}
        >
            <div className='absolute inset-0 bg-black/50' />

            <div className='relative z-10 text-center text-white px-4'>
                <h1 className='mb-4 text-3xl sm:text-4xl md:text-5xl font-normal'>
                    Cinema at your fingertips
                </h1>
                <p className='max-w-xl mx-auto text-sm sm:text-base leading-relaxed'>
                    Browse thousands of films, check ratings at a glance, and
                    dive into details with one click. Search by title, explore
                    what's trending this week, and build your own list of
                    must-watch movies with CineMate.
                </p>
            </div>
        </section>
    );
};

export default Hero;
