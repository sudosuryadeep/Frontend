import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyCourses } from "../../api/course";
import { getAllAdminsAPI } from "../../api/admin"; // API to fetch all admins
import { Link } from "react-router-dom";
import clsx from "clsx";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user courses
  useEffect(() => {
    if (token && user?._id) {
      setLoading(true);
      getMyCourses(token)
        .then((myCourses) => {
          setCourses(myCourses.filter((c) => c.userId === user._id));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch courses");
          setLoading(false);
        });
    } else {
      setCourses([]);
      setLoading(false);
    }
  }, [token, user]);

  // Fetch all admins
  useEffect(() => {
    if (token) {
      getAllAdminsAPI(token)
        .then((res) => setAdmins(res))
        .catch((err) => console.error(err));
    }
  }, [token]);

  const pending = courses.filter((c) => c.status === "pending");
  const approved = courses.filter((c) => c.status === "approved");
  const rejected = courses.filter((c) => c.status === "rejected");

  const handleWatch = (course) => {
    if (!user) return alert("Please login to watch this course");
    window.open(`https://www.youtube.com/watch?v=${course.videoId}`, "_blank");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Dashboard
      </h1>
      <p className="text-xl text-gray-700 text-center mb-8">
        Welcome {user?.username || user?.email || "Guest"}!
      </p>

      {/* Admins list */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Admins</h2>
        <div className="flex flex-wrap gap-4">
          {admins.length > 0 ? (
            admins.map((a) => (
              <div
                key={a._id}
                className="px-3 py-1 bg-gray-200 rounded-full text-gray-800"
              >
                {a.username || a.email}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No admins found</p>
          )}
        </div>
      </div>

      {/* Add course button */}
      {user && (
        <div className="text-center mb-8">
          <Link
            to="/add-course"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all"
          >
            ➕ Add New Course
          </Link>
        </div>
      )}

      {/* Courses sections */}
      <CourseSection
        title="Pending Courses"
        courses={pending}
        color="yellow"
        handleWatch={handleWatch}
      />
      <CourseSection
        title="Approved Courses"
        courses={approved}
        color="green"
        handleWatch={handleWatch}
      />
      <CourseSection
        title="Rejected Courses"
        courses={rejected}
        color="red"
        handleWatch={handleWatch}
      />
    </div>
  );
};

export default Dashboard;

// ---------------- CourseSection Component ----------------
const CourseSection = ({ title, courses, color, handleWatch }) => {
  const colorMap = {
    yellow: "yellow",
    green: "green",
    red: "red",
  };

  if (courses.length === 0)
    return (
      <div className="mb-8">
        <h2
          className={`text-2xl font-semibold mb-4 text-${colorMap[color]}-700`}
        >
          {title}
        </h2>
        <p className="text-gray-500">No courses</p>
      </div>
    );

  return (
    <div className="mb-8">
      <h2 className={`text-2xl font-semibold mb-4 text-${colorMap[color]}-700`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c._id}
            className={clsx(
              "border rounded-lg p-5 shadow-md hover:shadow-xl transition-all",
              {
                "bg-yellow-50": color === "yellow",
                "bg-green-50": color === "green",
                "bg-red-50": color === "red",
              }
            )}
          >
            <p className="font-medium text-xl">{c.title}</p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={clsx("ml-2 font-semibold", {
                  "text-yellow-600": color === "yellow",
                  "text-green-600": color === "green",
                  "text-red-600": color === "red",
                })}
              >
                {c.status}
              </span>
            </p>

            {c.status === "approved" && c.approvedBy && (
              <p className="text-xs text-green-600">
                Approved by: {c.approvedBy.adminName}
              </p>
            )}
            {c.status === "rejected" && (
              <p className="text-xs text-red-600 font-semibold">
                Rejected by Admin
              </p>
            )}

            {c.status === "approved" && (
              <button
                onClick={() => handleWatch(c)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Watch Video
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
