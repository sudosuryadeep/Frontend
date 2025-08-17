const API = import.meta.env.VITE_API_URL;

export async function createRating({ videoId, rating, note }) {
  const res = await fetch(`${API}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videoId, rating, note }),
  });
  if (!res.ok) throw new Error("Failed to submit rating");
  return res.json();
}

export async function getRatings(videoId) {
  const res = await fetch(`${API}/ratings/${videoId}`);
  if (!res.ok) throw new Error("Failed to fetch ratings");
  return res.json();
}
