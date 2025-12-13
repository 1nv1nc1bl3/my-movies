import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { usePersonDetails } from '../utils/usePersonDetails';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function ActorDetailsPage() {
    const { id } = useParams();
    const { person, loading, error } = usePersonDetails(id);
    const navigate = useNavigate();
    const imageURL = person?.profile_path
        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
        : 'https://placehold.co/500x750/orange/orange';
    const bio =
        person?.biography?.trim() ||
        'No biography is available for this person.';

    // console.log(id);
    if (!loading && !error && !person) return <Navigate to='*' />;

    return (
        <>
            {loading && <Loader loading={loading} />}
            {error && <Error />}
            {!loading && !error && person && (
                <>
                    <div>
                        <div className='mt-14 relative z-20'>
                            <button
                                onClick={() => navigate(-1)}
                                className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white border border-gray-300 text-sm text-gray-800 shadow-sm transition cursor-pointer'
                            >
                                ← Back
                            </button>
                        </div>
                        <img src={imageURL} alt={person?.name} />
                        <p>{person.name}</p>
                        <p>{person.id}</p>
                        <p>{person.bio}</p>
                    </div>
                </>
            )}
        </>
    );
}
