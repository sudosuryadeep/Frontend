export default function SearchBar({ onSearch }) {
  return (
    <div className="flex-1 mx-4 max-w-xs relative">
      <input
        type="text"
        placeholder="Search courses..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
      />
      <button
        type="button"
        onClick={() => onSearch("")}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-all duration-200"
      >
        &times;
      </button>
    </div>
  );
}
