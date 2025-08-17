import { useEffect, useState } from "react";
import { getAllCourses } from "../api/course";
import CourseList from "../components/CourseList/CourseList";

const Trending = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllCourses();
      // for demo: just show first 6 as trending
      setCourses(data.slice(0, 6));
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Trending Courses</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default Trending;
