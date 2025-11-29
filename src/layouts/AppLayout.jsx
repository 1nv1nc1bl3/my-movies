import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppLayout() {
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
