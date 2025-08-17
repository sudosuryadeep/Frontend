import React, { memo } from "react";

const categories = [
  "All",
  "React",
  "DSA",
  "Frontend",
  "Backend",
  "Python",
  "NodeJS",
  "C++",
  "C",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

const CourseFilterBar = ({ selected, onSelect }) => {
  const handleSelect = (category) => {
    // If "All" is selected, reset the filter
    onSelect(category === "All" && selected === "All" ? "" : category);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          aria-pressed={selected === cat}
          className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ease-in-out ${
            selected === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-gray-300"
          } hover:bg-blue-100`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default memo(CourseFilterBar);
