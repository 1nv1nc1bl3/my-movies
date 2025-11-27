import { useParams, useLocation, Link, Navigate } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { movie } = state || {};
    if (!movie) {
        return <Navigate to='*' />;
    }
    return (
        <div>
            <Link to='/'>
                ⬅️ <span>Back to List</span>
            </Link>
            movie ID: {id}
        </div>
    );
};

export default MovieDetails;
