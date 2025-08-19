import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { BookOpen } from "lucide-react";

const CourseList = ({ courses }) => {
  if (!courses.length)
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <BookOpen className="w-12 h-12 mb-3 text-gray-400" />
        <p className="text-lg font-medium">No courses found</p>
        <p className="text-sm text-gray-400">
          Try searching with a different keyword.
        </p>
      </div>
    );

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {courses.map((c) => (
        <motion.div
          key={c.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <CourseCard course={c} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseList;
