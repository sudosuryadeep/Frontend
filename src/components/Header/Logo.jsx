import { Link } from "react-router-dom";

const Logo = () => (
  <Link
    to="/"
    className="font-extrabold text-2xl text-indigo-600 hover:text-indigo-800 transition-colors duration-300 transform hover:scale-105 tracking-tight flex items-center space-x-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      viewBox="0 0 20 20"
      fill="currentColor"
      stroke="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9 2C5.134 2 2 5.134 2 9s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM9 15c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
        clipRule="evenodd"
      />
    </svg>
    <span>Learnonix</span>
  </Link>
);

export default Logo;
