import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../store/auth";
import { useFetch } from "../../hooks/useFetch";
import axios from "../../lib/axios";
import SkillTags from "../../components/shared/SkillTags";
import Layout from "../../components/shared/Layout";
import { Project } from "../../types";

interface FormData {
  name: string;
  description: string;
  requiredSkills: string;
  status: string;
  teamSize: number;
}

const Projects = () => {
  const { user } = useAuth();
  const {
    data: projects,
    loading,
    error,
    refetch,
  } = useFetch<Project[]>("/projects");
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (editProject) {
      setShowForm(true);
      setValue("name", editProject.name);
      setValue("description", editProject.description);
      setValue("requiredSkills", editProject.requiredSkills.join(", "));
      setValue("status", editProject.status);
      setValue("teamSize", editProject.teamSize || 1);
    }
  }, [editProject, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        requiredSkills: data.requiredSkills.split(",").map((s) => s.trim()),
        status: data.status,
        teamSize: Number(data.teamSize) || 1,
        managerId: user?._id,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      };

      console.log("Submitting payload:", payload);

      if (editProject) {
        await axios.patch(`/projects/${editProject._id}`, payload);
        alert("Project updated successfully!");
      } else {
        await axios.post("/projects", payload);
        alert("Project created successfully!");
      }

      reset();
      setEditProject(null);
      setShowForm(false);
      refetch();
    } catch (err: any) {
      console.error(
        "Failed to save project:",
        err.response?.data || err.message
      );
      alert(
        `Failed to save project: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold border-b-2 border-blue-300 pb-2 text-gray-800">
              All Projects
            </h1>
            {user?.role === "manager" && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  setShowForm(true);
                  reset();
                  setEditProject(null);
                }}
              >
                Create Project
              </button>
            )}
          </div>

          {/* Project Form */}
          {showForm && user?.role === "manager" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-6 rounded shadow space-y-4 mb-10"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-700">
                {editProject ? "Edit Project" : "Create Project"}
              </h2>

              <div>
                <label className="block mb-1">Project Name</label>
                <input
                  {...register("name", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    Description is required
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1">
                  Required Skills (comma separated)
                </label>
                <input
                  {...register("requiredSkills", { required: true })}
                  className="w-full border p-2 rounded"
                />
                {errors.requiredSkills && (
                  <p className="text-red-500 text-sm">Skills are required</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Team Size</label>
                <input
                  type="number"
                  {...register("teamSize", { required: true, min: 1 })}
                  className="w-full border p-2 rounded"
                />
                {errors.teamSize && (
                  <p className="text-red-500 text-sm">
                    Team size must be at least 1
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1">Status</label>
                <select
                  {...register("status", { required: true })}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Status</option>
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">Status is required</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editProject ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditProject(null);
                    reset();
                  }}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Project List */}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            projects?.map((proj) => (
              <div
                key={proj._id}
                className="mb-6 bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-xl text-blue-700 mb-1">
                      {proj.name}
                    </h2>
                    <p className="text-gray-600 mb-1">{proj.description}</p>
                    <SkillTags skills={proj.requiredSkills} />
                    <p className="text-gray-600 mt-2">Status: {proj.status}</p>
                    <p className="text-gray-600">Team Size: {proj.teamSize}</p>
                  </div>
                  {user?.role === "manager" && (
                    <button
                      onClick={() => handleEdit(proj)}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
