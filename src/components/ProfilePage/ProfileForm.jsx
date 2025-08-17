import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfileForm = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [selectedFileName, setSelectedFileName] = useState(""); // 👈 new state
  const [success, setSuccess] = useState("");

  if (!user) {
    return (
      <div className="text-center text-red-500">
        Please log in to edit profile.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, username, email, avatar };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSuccess("Profile updated successfully!");
    setTimeout(() => onClose(), 1500);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name); // 👈 store file name
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-form p-4 border rounded-lg shadow-md bg-white max-w-md mx-auto mt-4">
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Avatar</label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Choose File
              <input
                type="file"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
            <span className="text-gray-600">
              {selectedFileName || "No file chosen"}
            </span>
          </div>

          {avatar && (
            <img
              src={avatar}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 border shadow-sm"
            />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
