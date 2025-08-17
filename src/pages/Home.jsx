import { useEffect, useState } from "react";
import { getAllCourses } from "../api/course";
import CourseList from "../components/CourseList/CourseList";
import CourseFilterBar from "../components/CourseFilterBar/CourseFilterBar";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    (async () => {
      const data = await getAllCourses();
      setCourses(data);
    })();
  }, []);

  const filtered =
    filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <CourseFilterBar selected={filter} onSelect={setFilter} />
      <CourseList courses={filtered} />
    </div>
  );
};

export default Home;
