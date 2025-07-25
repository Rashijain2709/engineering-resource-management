import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../store/auth';
import axios from '../../lib/axios';
import Layout from '../../components/shared/Layout';
import { Assignment, Project, User } from '../../types';

interface FormData {
  engineerId: string;
  projectId: string;
  allocationPercentage: number;
  role: string;
  startDate: string;
  endDate: string;
}

const Assignments = () => {
  const { user } = useAuth(); 
  const { data: assignments, loading, error, refetch } = useFetch<Assignment[]>('/assignments');
  const [showForm, setShowForm] = useState(false);
  const [engineers, setEngineers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (showForm && user?.role === 'manager') {
      const fetchDropdownData = async () => {
        const engRes = await axios.get('/engineers');
        const projRes = await axios.get('/projects');
        setEngineers(engRes.data);
        setProjects(projRes.data);
      };
      fetchDropdownData();
    }
  }, [showForm, user]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/assignments', data);
      alert('Assignment created successfully!');
      reset();
      setShowForm(false); 
      refetch(); 
    } catch (err) {
      console.error(err);
      alert('Failed to create assignment');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold border-b-2 border-blue-300 pb-2 text-gray-800">
              All Assignments
            </h1>

            {user?.role === 'manager' && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                Create Assignment
              </button>
            )}
          </div>

          {showForm && user?.role === 'manager' && (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4 mb-10">
              <h2 className="text-xl font-bold mb-2 text-gray-700">Create Assignment</h2>

              <div>
                <label className="block mb-1">Engineer</label>
                <select {...register('engineerId', { required: true })} className="w-full border p-2 rounded">
                  <option value="">Select Engineer</option>
                  {engineers.map((eng) => (
                    <option key={eng._id} value={eng._id}>{eng.name}</option>
                  ))}
                </select>
                {errors.engineerId && <p className="text-red-500 text-sm">Engineer is required</p>}
              </div>

              <div>
                <label className="block mb-1">Project</label>
                <select {...register('projectId', { required: true })} className="w-full border p-2 rounded">
                  <option value="">Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj._id} value={proj._id}>{proj.name}</option>
                  ))}
                </select>
                {errors.projectId && <p className="text-red-500 text-sm">Project is required</p>}
              </div>

              <div>
                <label className="block mb-1">Role</label>
                <input
                  {...register('role', { required: true })}
                  className="w-full border p-2 rounded"
                  placeholder="Developer, QA, etc."
                />
                {errors.role && <p className="text-red-500 text-sm">Role is required</p>}
              </div>

              <div>
                <label className="block mb-1">Allocation %</label>
                <input
                  type="number"
                  {...register('allocationPercentage', { required: true, min: 1, max: 100 })}
                  className="w-full border p-2 rounded"
                  placeholder="e.g. 60"
                />
                {errors.allocationPercentage && (
                  <p className="text-red-500 text-sm">Allocation between 1–100% required</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Start Date</label>
                <input type="date" {...register('startDate', { required: true })} className="w-full border p-2 rounded" />
                {errors.startDate && <p className="text-red-500 text-sm">Start date is required</p>}
              </div>

              <div>
                <label className="block mb-1">End Date</label>
                <input type="date" {...register('endDate', { required: true })} className="w-full border p-2 rounded" />
                {errors.endDate && <p className="text-red-500 text-sm">End date is required</p>}
              </div>

              <div className="flex justify-between">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            assignments?.map((a) => (
              <div key={a._id} className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                <h2 className="font-semibold text-xl text-blue-700 mb-1">{a.role}</h2>
                <p className="text-gray-600 mb-1">Engineer: {a.engineerId}</p>
                <p className="text-gray-600 mb-1">Project: {a.projectId}</p>
                <p className="text-gray-600 mb-1">From: {new Date(a.startDate).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-1">To: {new Date(a.endDate).toLocaleDateString()}</p>
                <p className="text-gray-600">Allocation: {a.allocationPercentage}%</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;
