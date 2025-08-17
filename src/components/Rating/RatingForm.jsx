import { useState } from "react";
import { createRating } from "../../api";

function RatingForm({ videoId, onRated }) {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(
    !!localStorage.getItem(`rated:${videoId}`)
  );

  const submit = async () => {
    try {
      setSubmitting(true);
      await createRating({ videoId, rating, note });
      setSubmitted(true);
      localStorage.setItem(`rated:${videoId}`, "1");
      if (onRated) onRated();
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
      <p className="mb-1 font-medium">Rate this course:</p>
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

export default RatingForm;
