import { useContext } from 'react';
import { AuthContext } from '../store/auth-context';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) return <div style={{ color: 'white', padding: '2rem' }}>Please login to view profile.</div>;
    return (
        <div style={{ color: 'black', padding: '2rem' }}>
            <h2>Profile Details</h2>
            <div><strong>Name:</strong> {currentUser.name}</div>
            <div><strong>Email:</strong> {currentUser.email}</div>
        </div>
    );
};

export default Profile;
