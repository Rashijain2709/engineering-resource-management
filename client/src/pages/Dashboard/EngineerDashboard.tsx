import { useFetch } from '../../hooks/useFetch';
import { Assignment } from '../../types';
import Layout from '../../components/shared/Layout';
import { useAuth } from '../../store/auth';
import { useState } from 'react';

const EngineerDashboard = () => {
  const { user } = useAuth();
  const { data: assignments, loading, error } = useFetch<Assignment[]>('/assignments');
  const [filter, setFilter] = useState('all');

  const myAssignments = assignments?.filter(
    (a) =>
      typeof a.engineerId === 'object' &&
      (a.engineerId as any)._id === user?._id
  );

  const today = new Date();

  const filteredAssignments = myAssignments?.filter((a) => {
    const start = new Date(a.startDate);
    const end = new Date(a.endDate);

    if (filter === 'current') {
      return start <= today && end >= today;
    } else if (filter === 'upcoming') {
      return start > today;
    }
    return true; // "all"
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold border-b-2 border-blue-300 pb-2 text-gray-800">
              My Assignments
            </h1>

            {/* Dropdown Filter */}
            <div className="relative w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none w-full border border-gray-300 text-gray-700 bg-white px-4 py-2 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
              >
                <option value="all">All Assignment</option>
                <option value="current">Current Assignment</option>
                <option value="upcoming">Upcoming Assignment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                ▼
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredAssignments && filteredAssignments.length > 0 ? (
            filteredAssignments.map((a) => (
              <div
                key={a._id}
                className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="font-semibold text-xl text-blue-700 mb-1">{a.role}</h2>
                <p className="text-gray-700 font-medium mb-1">
                  Project: {(a.projectId as any)?.name || 'N/A'}
                </p>
                <p className="text-gray-600 mb-1">
                  From: {new Date(a.startDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-1">
                  To: {new Date(a.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Allocation: {a.allocationPercentage}%
                </p>
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
