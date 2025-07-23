import { useFetch } from '../../hooks/useFetch';
import CapacityBar from '../../components/shared/CapacityBar';
import SkillTags from '../../components/shared/SkillTags';

const ManagerDashboard = () => {
    const { data: engineers, loading } = useFetch<any[]>('/engineers');

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Team Overview</h1>
            {engineers?.map((eng) => (
                <div key={eng._id} className="mb-4 border rounded p-4 shadow">
                    <h2 className="font-semibold">{eng.name} ({eng.seniority})</h2>
                    <p>{eng.email}</p>
                    <SkillTags skills={eng.skills} />
                    <CapacityBar allocated={eng.currentCapacity || 0} max={eng.maxCapacity} />
                </div>
            ))}
        </div>
    );
};

export default ManagerDashboard;
