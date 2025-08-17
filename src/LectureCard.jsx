import React, { useEffect, useMemo, useState } from "react";
import { createRating, getRatings } from "./api";

export default function LectureCard({
  title,
  subtitle = "Beginner friendly",
  youtubeUrl,
  videoId,
  thumbnail,
  duration = "12:34",
  level = "Beginner",
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [count, setCount] = useState(3);
  const [ratingsData, setRatingsData] = useState({ avg: 0, count: 0 });

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showConfirm ? "hidden" : "auto";
  }, [showConfirm]);

  // Countdown logic
  useEffect(() => {
    if (!showConfirm) return;
    setCount(3);
    const id = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [showConfirm]);

  // Fetch ratings on mount and whenever videoId changes
  const fetchRatings = async () => {
    try {
      const data = await getRatings(videoId);
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
  }, [videoId]);

  const canOpen = useMemo(() => count === 0, [count]);

  const openLecture = () => {
    window.open(youtubeUrl, "_blank", "noopener");
    setShowConfirm(false);
    setRatingVisible(true);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-100">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-2 top-2 flex gap-2 text-xs">
          <span className="rounded-full bg-black/70 px-2 py-1 text-white">
            {level}
          </span>
          <span className="rounded-full bg-black/70 px-2 py-1 text-white">
            {duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>

          {/* Ratings always visible */}
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
            <span>⭐ {ratingsData.avg}</span>
            <span>({ratingsData.count} ratings)</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Watch
          </button>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            Open →
          </a>
        </div>

        {ratingVisible && (
          <RatingForm videoId={videoId} onRated={fetchRatings} />
        )}
      </div>

      {/* Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Ready to learn?</h3>
            <p className="mt-1 text-sm text-gray-600">
              The lecture will open on YouTube. After watching, please leave a
              quick rating 🙌
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
}

// RatingForm
function RatingForm({ videoId, onRated }) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    try {
      setSubmitting(true);
      await createRating({ videoId, rating, note });
      setSubmitted(true);
      localStorage.setItem(`rated:${videoId}`, "1");
      if (onRated) onRated(); // refresh parent
    } catch (e) {
      alert("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted)
    return (
      <div className="mt-2 rounded-xl border p-2 bg-green-50 text-green-700">
        Thanks for your feedback! ⭐
      </div>
    );

  return (
    <div className="mt-2 rounded-xl border p-2 bg-gray-50">
      <p className="mb-1 font-medium">Rate this lesson:</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            className={`text-xl transition ${
              rating >= n ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="mt-1 w-full rounded-xl border p-1 text-sm focus:ring focus:ring-blue-200"
        placeholder="Optional feedback..."
        maxLength={300}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={submit}
        disabled={rating === 0 || submitting}
        className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-1 text-white disabled:opacity-50 hover:enabled:bg-blue-700"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
