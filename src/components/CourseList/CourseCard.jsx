import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getRatings } from "../../api";
import RatingForm from "../Rating/RatingForm";
import { FaPlay } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false); // To show confirmation modal
  const [ratingVisible, setRatingVisible] = useState(false);
  const [ratingsData, setRatingsData] = useState({ avg: 0, count: 0 });

  // Fetch ratings
  const fetchRatings = async () => {
    try {
      const data = await getRatings(course.videoId);
      const avg =
        data.count > 0
          ? (
              data.items.reduce((sum, r) => sum + r.rating, 0) / data.count
            ).toFixed(1)
          : 0;
      setRatingsData({ avg, count: data.count });
    } catch (e) {
      console.error("Failed to fetch ratings", e);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [course.videoId]);

  // Open lecture directly after confirmation
  const openLecture = () => {
    window.open(`https://www.youtube.com/watch?v=${course.videoId}`, "_blank");
    setShowConfirm(false); // Close the confirmation modal
    setRatingVisible(true); // Show rating form after watching if logged in
  };

  // Trigger confirmation modal
  const handleWatchClick = () => {
    setShowConfirm(true); // Show confirmation modal when user clicks "Watch"
  };

  return (
    <div className="border shadow-md rounded-2xl p-4 bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Thumbnail with Play overlay */}
      <div className="relative group cursor-pointer" onClick={handleWatchClick}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-48 object-cover rounded-xl transition-opacity ${
            isImageLoading ? "opacity-50" : "opacity-100"
          }`}
          onLoad={() => setIsImageLoading(false)}
        />
        {isImageLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 rounded-xl">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}

        {/* Overlay Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-xl">
          <button className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition">
            <FaPlay size={20} />
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold line-clamp-1">{course.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600">{course.category}</p>
          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
            {course.level}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {course.description}
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-3">
          <span className="text-yellow-500">⭐ {ratingsData.avg}</span>
          <span className="ml-1 text-sm text-gray-500">
            ({ratingsData.count} reviews)
          </span>
        </div>

        {/* Rating Form */}
        {ratingVisible && (
          <div className="mt-3">
            <RatingForm videoId={course.videoId} onRated={fetchRatings} />
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-200 relative">
            {/* Heading */}
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ready to watch?
            </h3>

            {/* Subtext */}
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              You will watch this lecture on{" "}
              <span className="font-medium">YouTube</span>.
              {user ? (
                <> After watching, please leave a quick rating 🙌</>
              ) : (
                <>
                  {" "}
                  You’re watching as a guest. Login to save progress and leave a
                  rating 🙌
                </>
              )}
            </p>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={openLecture}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white shadow-md hover:enabled:from-blue-700 hover:enabled:to-indigo-700 transition"
              >
                Open Lecture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
