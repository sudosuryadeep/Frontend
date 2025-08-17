import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  if (!courses.length) return <p>No courses found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
};

export default CourseList;
