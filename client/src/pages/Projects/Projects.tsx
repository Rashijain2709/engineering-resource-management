import { useFetch } from '../../hooks/useFetch';
import SkillTags from '../../components/shared/SkillTags';

const Projects = () => {
    const { data: projects, loading } = useFetch<any[]>('/projects');

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">All Projects</h1>
            {projects?.map((proj) => (
                <div key={proj._id} className="border mb-4 p-4 rounded shadow">
                    <h2 className="font-bold">{proj.name}</h2>
                    <p>{proj.description}</p>
                    <SkillTags skills={proj.requiredSkills} />
                    <p>Status: {proj.status}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;
