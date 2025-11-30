import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }) => {
    const override = {
        display: 'block',
        margin: '0 auto',
    };

    return (
        <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
        />
    );
};

export default Loader;
