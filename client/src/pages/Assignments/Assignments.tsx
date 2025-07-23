import { useFetch } from '../../hooks/useFetch';

const Assignments = () => {
    const { data: assignments, loading } = useFetch<any[]>('/assignments');

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">All Assignments</h1>
            {assignments?.map((a) => (
                <div key={a._id} className="border mb-4 p-4 rounded shadow">
                    <h2 className="font-semibold">{a.role}</h2>
                    <p>Engineer: {a.engineerId}</p>
                    <p>Project: {a.projectId}</p>
                    <p>From: {new Date(a.startDate).toLocaleDateString()}</p>
                    <p>To: {new Date(a.endDate).toLocaleDateString()}</p>
                    <p>Allocation: {a.allocationPercentage}%</p>
                </div>
            ))}
        </div>
    );
};

export default Assignments;
