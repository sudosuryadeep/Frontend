import { Link } from "react-router-dom";

const Logo = () => (
  <Link
    to="/"
    className="flex items-center space-x-3 group"
  >
    {/* Icon */}
    <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* Book + Play icon */}
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5V19.5Z" />
        <path d="M10 8L16 12L10 16V8Z" className="fill-purple-200" />
      </svg>
    </div>

    {/* Text */}
    <h1 className="text-2xl font-extrabold tracking-tight">
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Learn
      </span>
      <span className="text-gray-900">onix</span>
    </h1>
  </Link>
);

export default Logo;
