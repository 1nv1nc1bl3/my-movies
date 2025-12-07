import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function AppLayout() {
    useEffect(() => {
        const path = location.pathname;
        if (path.startsWith('/movie/')) return;
        if (path === '/') {
            document.title = 'Home | Cinemate';
            return;
        }
        if (path === '/favorites') {
            document.title = 'Favorites | Cinemate';
            return;
        }
        document.title = 'CineMate';
    }, [location.pathname]);

    return (
        <div className='min-h-screen flex flex-col'>
            {/* Header exists in all pages */}
            <NavBar />
            {/* every child route appears here */}
            <main className='flex-1'>
                <Outlet />
            </main>
            {/* Footer exists in all pages */}
            <Footer />
        </div>
    );
}
