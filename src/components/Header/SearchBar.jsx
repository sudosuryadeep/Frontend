import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setInput("");
    onSearch("");
  };

  return (
    <div className="flex-1 max-w-md relative">
      <input
        type="text"
        value={input}
        placeholder="🔍 Search courses by title, category or level..."
        onChange={handleChange}
        className="w-full rounded-full border border-gray-300 px-10 py-2 text-sm shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-all duration-300 ease-in-out placeholder-gray-400"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      {input && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
                     text-gray-500 hover:text-gray-800 transition-all duration-200"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}
