import { useFetch } from '../../hooks/useFetch';
import { Assignment } from '../../types';
import Layout from '../../components/shared/Layout';
import { useAuth } from '../../store/auth';

const EngineerDashboard = () => {
  const { user } = useAuth();
  const { data: assignments, loading, error } = useFetch<Assignment[]>('/assignments');

  const myAssignments = assignments?.filter((a) => a.engineerId === user?._id);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-300 pb-2 text-gray-800">
            My Assignments
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : myAssignments && myAssignments.length > 0 ? (
            myAssignments.map((a) => (
              <div
                key={a._id}
                className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="font-semibold text-xl text-blue-700 mb-1">{a.role}</h2>
                <p className="text-gray-600 mb-1">From: {new Date(a.startDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-1">To: {new Date(a.endDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Allocation: {a.allocationPercentage}%</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No assignments assigned to you yet.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EngineerDashboard;
