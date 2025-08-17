import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { getRatings } from "../../api";
import RatingForm from "../Rating/RatingForm";

const CourseCard = ({ course }) => {
  const { user } = useAuth();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [count, setCount] = useState(3);
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

  // Countdown for modal
  useEffect(() => {
    if (!showConfirm) return;
    setCount(3);
    const id = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [showConfirm]);

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showConfirm ? "hidden" : "auto";
  }, [showConfirm]);

  const canOpen = useMemo(() => count === 0, [count]);

  const openLecture = () => {
    window.open(`https://www.youtube.com/watch?v=${course.videoId}`, "_blank");
    setShowConfirm(false);
    setRatingVisible(true);
  };

  const handleWatchClick = () => {
    if (!user) {
      alert("Please login to watch this course");
      return;
    }
    setShowConfirm(true);
  };

  return (
    <div className="border shadow rounded-xl p-3 bg-white transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Thumbnail with Watch overlay */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-40 object-cover rounded-lg mb-2 transition-opacity ${
            isImageLoading ? "opacity-50" : "opacity-100"
          }`}
          onLoad={() => setIsImageLoading(false)}
        />
        {isImageLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
        {/* Watch Button */}
        <button
          onClick={handleWatchClick}
          className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700"
        >
          Watch
        </button>
      </div>

      {/* Card Info */}
      <h3 className="text-lg font-semibold truncate">{course.title}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">{course.category}</p>
        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
          {course.level}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">{course.description}</p>

      {/* Ratings */}
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">⭐ {ratingsData.avg}</span>
        <span className="ml-1 text-sm text-gray-500">
          ({ratingsData.count} reviews)
        </span>
      </div>

      {/* Rating Form */}
      {ratingVisible && (
        <RatingForm videoId={course.videoId} onRated={fetchRatings} />
      )}

      {/* Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Ready to watch?</h3>
            <p className="mt-1 text-sm text-gray-600">
              You will watch this lecture on YouTube. After watching, please
              leave a quick rating 🙌
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Opening in: {count}s
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="rounded-xl border px-3 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={openLecture}
                  disabled={!canOpen}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-white disabled:opacity-50 hover:enabled:bg-blue-700"
                >
                  Open Lecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
