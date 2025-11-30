const Hero = () => {
    return (
        <section
            className='relative min-h-[35rem] sm:min-h-[37rem] md:min-h-[39rem] flex items-center justify-center'
            style={{
                backgroundImage:
                    'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* σκοτείνιασμα πάνω από το background */}
            <div className='absolute inset-0 bg-black/50' />

            {/* ΚΕΝΤΡΑΡΙΣΜΕΝΟ ΛΕΚΤΙΚΟ */}
            <div className='relative z-10 text-center text-white px-4'>
                <h1 className='mb-4 text-3xl sm:text-4xl md:text-5xl font-normal'>
                    Welcome
                </h1>
                <p className='max-w-xl mx-auto text-sm sm:text-base leading-relaxed'>
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                </p>
            </div>
        </section>
    );
};

export default Hero;
