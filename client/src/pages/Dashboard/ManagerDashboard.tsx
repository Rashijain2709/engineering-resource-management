import { useFetch } from '../../hooks/useFetch';
import CapacityBar from '../../components/shared/CapacityBar';
import SkillTags from '../../components/shared/SkillTags';
import { User } from '../../types';
import Layout from '../../components/shared/Layout';

const ManagerDashboard = () => {
    const { data: engineers, loading, error } = useFetch<User[]>('/engineers');

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-3xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-300 pb-2 text-gray-800">
                        Team Overview
                    </h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        engineers?.map((eng) => (
                            <div
                                key={eng._id}
                                className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <h2 className="font-semibold text-xl text-blue-700 mb-1">
                                    {eng.name} <span className="text-sm text-gray-500">({eng.seniority})</span>
                                </h2>
                                <p className="text-gray-600 mb-2">{eng.email}</p>
                                <SkillTags skills={eng.skills || []} />
                                <div className="mt-4">
                                    <CapacityBar
                                        allocated={eng.currentCapacity || 50}
                                        max={eng.maxCapacity || 100}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ManagerDashboard;
