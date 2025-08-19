import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";

const DEFAULT_GUEST_AVATAR = "https://api.waifu.pics/sfw/waifu";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;

  // ================= Guest Mode =================
  if (!user) {
    return (
      <div className="profile-container text-center p-4 max-w-lg mx-auto">
        <img
          src={DEFAULT_GUEST_AVATAR}
          alt="Guest Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <div className="text-lg font-semibold">Guest</div>
        <div className="text-gray-500">Please log in to edit your profile.</div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  // ================= Logged-in User =================
  return (
    <div className="profile-container p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="profile-details flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
        <img
          src={user.avatar || DEFAULT_GUEST_AVATAR}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full mb-4"
        />
        <div className="text-lg font-semibold">
          {user.username || "No Name"}
        </div>
        <div className="text-gray-600">{user.email || "No Email"}</div>

        <div className="flex gap-2 mt-4">
  <button
    onClick={() => setEditing(true)}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Edit Profile
  </button>
  <button
    onClick={() => navigate("/")}
    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
  >
    Home
  </button>
</div>

      </div>

      {editing && <ProfileForm onClose={() => setEditing(false)} />}
    </div>
  );
};

export default ProfilePage;
