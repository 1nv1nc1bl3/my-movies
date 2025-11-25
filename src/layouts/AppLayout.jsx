import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppLayout() {
    return (
        <>
            {/* Header exists in all pages */}
            <NavBar />
            {/* every child route appears here */}
            <Outlet />
            {/* Footer exists in all pages */}
            <Footer />
        </>
    );
}
