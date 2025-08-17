import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import {
  getAllCoursesAdmin,
  approveCourseAPI,
  rejectCourseAPI,
} from "../../api/course";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all courses for admin
  useEffect(() => {
    if (token && user?.role === "admin") {
      setLoading(true);
      getAllCoursesAdmin(token)
        .then((allCourses) => {
          setCourses(allCourses);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching courses:", err);
          setError(err.message || "Failed to fetch courses");
          setLoading(false);
        });
    }
  }, [token, user]);

  // Approve a course
  const handleApprove = async (courseId) => {
    try {
      await approveCourseAPI(courseId, token);
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, status: "approved" } : c))
      );
    } catch (err) {
      alert("Failed to approve course: " + err.message);
    }
  };

  // Reject a course
  const handleReject = async (courseId) => {
    try {
      await rejectCourseAPI(courseId, token);
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, status: "rejected" } : c))
      );
    } catch (err) {
      alert("Failed to reject course: " + err.message);
    }
  };

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  // Categorize courses by status
  const pending = courses.filter((c) => c.status === "pending");
  const approved = courses.filter((c) => c.status === "approved");
  const rejected = courses.filter((c) => c.status === "rejected");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h1>
      <p className="text-xl text-gray-700 text-center mb-8">
        Welcome Admin {user?.username || user?.email}!
      </p>

      {/* Add course button */}
          <Link
            to="/add-course"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all"
          >
            ➕ Add New Course
          </Link>
      

      <CourseSection
        title="Pending Courses"
        courses={pending}
        color="yellow"
        handleApprove={handleApprove}
        handleReject={handleReject}
      />

      <CourseSection
        title="Approved Courses"
        courses={approved}
        color="green"
      />

      <CourseSection title="Rejected Courses" courses={rejected} color="red" />
    </div>
  );
};

export default AdminDashboard;

// ---------------- CourseSection Component ----------------
const CourseSection = ({
  title,
  courses,
  color,
  handleApprove,
  handleReject,
}) => {
  if (courses.length === 0) {
    return (
      <div className="mb-8">
        <h2 className={`text-2xl font-semibold text-${color}-700 mb-4`}>
          {title}
        </h2>
        <p className="text-gray-500">No courses</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-semibold text-${color}-700 mb-4`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className={`border rounded-lg p-5 bg-${color}-50 shadow-md hover:shadow-xl transition-all`}
          >
            <p className="font-medium text-xl">{c.title || "No Title"}</p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className={`ml-2 text-${color}-600 font-semibold`}>
                {c.status}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Submitted by: {c.submittedBy || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              Created:{" "}
              {c.createdAt
                ? format(new Date(c.createdAt), "dd MMM yyyy")
                : "N/A"}
            </p>

            {c.status === "pending" && handleApprove && handleReject && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleApprove(c.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(c.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
