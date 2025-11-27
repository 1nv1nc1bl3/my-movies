const Footer = () => {
    return (
        <footer className='footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 static bottom-0 left-0 right-0 flex justify-center bg-grey-100'>
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by Alkis
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
