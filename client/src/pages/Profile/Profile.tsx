import { useAuth } from '../../store/auth';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
};

export default Profile;
