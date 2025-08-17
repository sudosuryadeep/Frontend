import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const UserMenu = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const handleProfileClick = () => {
    // Open the profile page in a new tab
    window.open("/profile", "_blank"); // _blank will open it in a new tab
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:opacity-90"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Profile icon and info */}
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={handleProfileClick} // Open profile in new tab on click
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-600 text-3xl" />
          )}
        </div>
        <div className="hidden sm:block text-sm">
          <div className="font-semibold">{user.username || user.email}</div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
