import React, { memo, useRef } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "All", icon: "🌍" },
  { name: "React", icon: "⚛️" },
  { name: "DSA", icon: "🧩" },
  { name: "Frontend", icon: "🎨" },
  { name: "Backend", icon: "🖥️" },
  { name: "Python", icon: "🐍" },
  { name: "NodeJS", icon: "🌱" },
  { name: "C++", icon: "💠" },
  { name: "C", icon: "🔤" },
  { name: "1st Year", icon: "🥇" },
  { name: "2nd Year", icon: "🥈" },
  { name: "3rd Year", icon: "🥉" },
  { name: "4th Year", icon: "🎓" },
];

const CourseFilterBar = ({ selected, onSelect }) => {
  const btnRefs = useRef({});

  const handleSelect = (category) => {
    onSelect(category === "All" && selected === "All" ? "" : category);

    // auto scroll to selected button
    if (btnRefs.current[category]) {
      btnRefs.current[category].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <div
      className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-snap-x"
      role="tablist"
      aria-label="Course Categories"
    >
      {categories.map((cat) => (
        <motion.button
          key={cat.name}
          ref={(el) => (btnRefs.current[cat.name] = el)} // store ref
          onClick={() => handleSelect(cat.name)}
          aria-pressed={selected === cat.name}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 scroll-snap-start
  ${
    selected === cat.name
      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-md ring-2 ring-pink-400"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
  }`}
        >
          <span>{cat.icon}</span> {cat.name}
        </motion.button>
      ))}
    </div>
  );
};

export default memo(CourseFilterBar);
