import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addCourse } from "../api/course";

const AddCourse = () => {
  const { user, token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    year: "",
    videoId: "",
    thumbnail: "",
    level: "",
    duration: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !token) {
      setMessage("You must be logged in to submit a course.");
      return;
    }
    try {
      const res = await addCourse(form, token);
      setMessage(res.message || "Course submitted for review");
      setForm({
        title: "",
        description: "",
        category: "",
        year: "",
        videoId: "",
        thumbnail: "",
        level: "",
        duration: "",
      });
    } catch (err) {
      setMessage(err.message || "Error submitting course");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Submit a New Course
      </h2>
      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Course Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter the course title"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Enter a short description of the course"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Category *
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Enter course category (e.g., React, JavaScript)"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="year"
            className="block text-lg font-medium text-gray-700"
          >
            Year *
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            placeholder="Enter course release year"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video ID */}
        <div>
          <label
            htmlFor="videoId"
            className="block text-lg font-medium text-gray-700"
          >
            YouTube Video ID *
          </label>
          <input
            type="text"
            id="videoId"
            name="videoId"
            value={form.videoId}
            onChange={handleChange}
            required
            placeholder="e.g., dQw4w9WgXcQ"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-lg font-medium text-gray-700"
          >
            Thumbnail URL (optional)
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            placeholder="Enter a URL for the thumbnail"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Level */}
        <div>
          <label
            htmlFor="level"
            className="block text-lg font-medium text-gray-700"
          >
            Level *
          </label>
          <select
            id="level"
            name="level"
            value={form.level}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Beginner to Advanced">Beginner to Advanced</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="block text-lg font-medium text-gray-700"
          >
            Duration *
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
            placeholder="e.g., 10:30 (in minutes)"
            className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
