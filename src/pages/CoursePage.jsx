import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../api/course";
import { useAuth } from "../context/AuthContext";

const CoursePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getCourseById(id);
      setCourse(data);
    })();
  }, [id]);

  if (!course) return <p className="p-6">Loading...</p>;

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <p className="text-xl font-semibold">
          Please login to watch this video
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <iframe
        src={`https://www.youtube.com/watch?v=${course.videoId}`}
        title={course.title}
        className="w-full h-[500px] rounded-lg"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CoursePage;
