import { NavLink } from "react-router-dom";
import { FaHome, FaFire, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const linkBase =
  "relative px-5 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out flex items-center group";
const active =
  "text-blue-600 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-8 after:h-[3px] after:bg-blue-600 after:rounded-full";
const hoverEffect = "hover:text-blue-500 hover:scale-105 hover:after:w-12";

const NavLinks = ({ direction = "row" }) => {
  const { user } = useAuth();

  const dashboardLink =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "user"
      ? "/dashboard"
      : "/login";

  const layoutClasses =
    direction === "column"
      ? "flex-col items-start gap-4"
      : "flex-row items-center gap-8";

  return (
    <nav className={`flex ${layoutClasses}`}>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaHome className="mr-2 group-hover:rotate-6 transition-transform duration-300" />
        Home
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaFire className="mr-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
        Popular
      </NavLink>

      <NavLink
        to={dashboardLink}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? active : ""} ${hoverEffect}`
        }
      >
        <FaTachometerAlt
          className={`mr-2 transition-transform duration-300 group-hover:rotate-3 ${
            user?.role === "admin" ? "text-amber-600" : "text-green-600"
          }`}
        />
        Dashboard
      </NavLink>
    </nav>
  );
};


export default NavLinks;
