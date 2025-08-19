import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      {/* Profile + Username */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-600 text-2xl" />
          )}
        </div>
        <span className="hidden sm:block font-medium text-sm">
          {user.username || user.email}
        </span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border py-2 animate-fade-in z-50">
          <Link
            to="/profile"
            target="_blank"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
