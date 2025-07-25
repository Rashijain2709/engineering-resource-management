import { useAuth } from "../../store/auth";
import Layout from "../../components/shared/Layout";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../lib/axios";

interface FormData {
  name: string;
  skills?: string;
  department?: string;
}

const Profile = () => {
  const { user, updateUser } = useAuth();
  const isEngineer = user?.role === "engineer";

  const [isEditing, setIsEditing] = useState(false);

  const renderCapacityType = (capacity: number) => {
    return capacity === 100 ? "Full Time" : "Part Time";
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name || "",
      skills: user?.skills?.join(", ") || "",
      department: user?.department || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        department: data.department,
        ...(isEngineer && { skills: data.skills?.split(",").map((s) => s.trim()) }),
      };

      await axios.patch(`/engineers/${user?._id}`, payload); // or `/users/${user._id}` based on route
      updateUser({ ...user, ...payload }); // update context
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-6">
          {!user ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold border-b-2 border-blue-300 pb-2 text-gray-800">
                  My Profile
                </h1>
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    reset({
                      name: user.name,
                      skills: user.skills?.join(", "),
                      department: user.department,
                    });
                  }}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              {isEditing ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-4"
                >
                  <div>
                    <label className="block mb-1">Name</label>
                    <input
                      {...register("name", { required: true })}
                      className="w-full border p-2 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                  </div>

                  {isEngineer && (
                    <div>
                      <label className="block mb-1">Skills (comma separated)</label>
                      <input
                        {...register("skills")}
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block mb-1">Department</label>
                    <input
                      {...register("department")}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Role:</span> {user.role}
                  </p>

                  {isEngineer && (
                    <>
                      <p className="text-gray-700">
                        <span className="font-semibold">Skills:</span>{" "}
                        {user.skills?.join(", ") || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Department:</span>{" "}
                        {user.department || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Work Type:</span>{" "}
                        {renderCapacityType(user.maxCapacity ?? 0)}
                      </p>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
