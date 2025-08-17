import { NavLink } from "react-router-dom";
import { FaHome, FaFire, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // import your AuthContext

const linkBase =
  "px-5 py-2 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out";
const active = "bg-blue-500 text-white border-b-4 border-blue-600 shadow-md";
const hoverEffect = "hover:bg-gray-100 hover:text-blue-500 hover:scale-105";

const NavLinks = () => {
  const { user } = useAuth(); // get logged-in user

  // Determine the correct dashboard link based on the user's role
  const dashboardLink =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "user"
      ? "/dashboard"
      : "/login"; 

  return (
    <nav className="flex items-center gap-8">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaHome className="inline-block mr-2" />
        Home
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaFire className="inline-block mr-2" />
        Popular Courses
      </NavLink>
      <NavLink
        to={dashboardLink} // Dynamic link based on user role
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaTachometerAlt className="inline-block mr-2" />
        Dashboard
      </NavLink>
    </nav>
  );
};

export default NavLinks;
