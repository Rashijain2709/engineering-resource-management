import { useFetch } from '../../hooks/useFetch';
import SkillTags from '../../components/shared/SkillTags';
import { Project } from '../../types';
import Layout from '../../components/shared/Layout';

const Projects = () => {
    const { data: projects, loading, error } = useFetch<Project[]>('/projects');

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-3xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-8 border-b-2 border-blue-300 pb-2 text-gray-800">
                        All Projects
                    </h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        projects?.map((proj) => (
                            <div key={proj._id} className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                                <h2 className="font-bold text-xl text-blue-700 mb-1">{proj.name}</h2>
                                <p className="text-gray-600 mb-1">{proj.description}</p>
                                <SkillTags skills={proj.requiredSkills} />
                                <p className="text-gray-600 mt-2">Status: {proj.status}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Projects;
