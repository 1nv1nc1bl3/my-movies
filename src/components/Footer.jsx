const Footer = () => {
    return (
        <footer className='w-full bg-slate-900 text-base-content text-white'>
            <div className='footer footer-center sm:footer-horizontal p-4 max-w-6xl mx-auto'>
                <aside>
                    <p className='text-center'>
                        Copyright © {new Date().getFullYear()} - All rights
                        reserved by Alkis
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
