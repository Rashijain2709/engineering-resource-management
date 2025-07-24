import { useAuth } from '../../store/auth';
import Layout from '../../components/shared/Layout';

const Profile = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-3xl mx-auto p-6">
                    {!user ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-300 pb-2 text-gray-800">
                                My Profile
                            </h1>
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
                                <p className="text-gray-700"><span className="font-semibold">Role:</span> {user.role}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
