const Footer = () => {
    return (
        <footer className='w-full bg-base-300 text-base-content'>
            <div className='footer footer-center sm:footer-horizontal p-4 max-w-6xl mx-auto'>
                <aside>
                    <p>
                        Copyright © {new Date().getFullYear()} - All right
                        reserved by Alkis
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;
