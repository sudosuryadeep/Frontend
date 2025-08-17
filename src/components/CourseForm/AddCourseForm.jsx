// import { useState } from "react";

// export default function AddCourseForm({ user, onSubmit }) {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     year: "",
//     level: "",
//     duration: "",
//     thumbnail: "",
//     videoId: "", // optional, placeholder tells user admin will set it
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user || !user.token) {
//       alert("Login required");
//       return;
//     }

//     // Call backend API
//     const res = await fetch("http://localhost:4000/api/courses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Course submitted for review!");
//       onSubmit(data.course);
//       setForm({
//         title: "",
//         description: "",
//         category: "",
//         year: "",
//         level: "",
//         duration: "",
//         thumbnail: "",
//         videoId: "",
//       });
//     } else {
//         alert("Course submitted for review!");
//         onSubmit(data.course);
//         setForm({
//           title: "",
//           description: "",
//           category: "",
//           year: "",
//           level: "",
//           duration: "",
//           thumbnail: "",
//           videoId: "",
//         });




//     //   alert(data.error || "Error submitting course");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 border rounded"
//     >
//       <h2 className="text-xl font-bold mb-4">Submit New Course</h2>

//       <input
//         type="text"
//         name="title"
//         placeholder="Course Title"
//         value={form.title}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <textarea
//         name="description"
//         placeholder="Course Description"
//         value={form.description}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="category"
//         placeholder="Category (React, Node, etc.)"
//         value={form.category}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="year"
//         placeholder="Year / Batch"
//         value={form.year}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="level"
//         placeholder="Level (Beginner/Intermediate/Advanced)"
//         value={form.level}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="duration"
//         placeholder="Duration (10:00)"
//         value={form.duration}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         required
//       />

//       <input
//         type="text"
//         name="thumbnail"
//         placeholder="Thumbnail URL (optional)"
//         value={form.thumbnail}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//       />

//       <input
//         type="text"
//         name="videoId"
//         placeholder="YouTube Link / Video ID (admin will set)"
//         value={form.videoId}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 border rounded"
//         disabled
//       />

//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Submit Course
//       </button>
//     </form>
//   );
// }








import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"; // optional: if you have sonner installed; safe no-op if not
import { Loader2, Rocket, Shield, CheckCircle2 } from "lucide-react";

/**
 * Ultra-fast, minimal-friction Course form
 * - Required: title only (super fast). Everything else is one-tap chips.
 * - Presets: course types (multi-select), level, year/semester.
 * - Great UX: big target chips, keyboard submit (Ctrl/Cmd + Enter), optimistic state.
 * - No duration field (as requested). VideoId locked for admins.
 * - Polished look: glassy/3D hover, soft shadows, micro-animations.
 *
 * Props:
 *   user: { token: string }
 *   onSubmit: (course) => void
 */
export default function AddCourseFormPro({ user, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  const titleRef = useRef(null);

  // Focus title on mount for speed
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Keyboard: Ctrl/Cmd + Enter submits
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const typeOptions = useMemo(
    () => [
      "JavaScript",
      "TypeScript",
      "DSA",
      "Python",
      "Node.js",
      "Express",
      "React",
      "Next.js",
      "MongoDB",
      "SQL",
      "DevOps",
      "Docker",
    ],
    []
  );

  const levelOptions = ["Beginner", "Intermediate", "Advanced"];
  const yearOptions = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Graduate",
  ];

  const toggleType = (t) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setNotice({ kind: "error", text: "Title is required." });
      titleRef.current?.focus();
      return;
    }
    if (!user?.token) {
      setNotice({ kind: "error", text: "Please login to submit a course." });
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim() || "TBD",
      // Join multiple selections for backend that expects a string
      category: selectedTypes.join(", ") || "General",
      year: year || "",
      level: level || "",
      thumbnail: thumbnail || "",
      videoId: "", // admin will set later
    };

    try {
      setSubmitting(true);
      setNotice(null);

      const res = await fetch("http://localhost:4000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || "Submit failed");

      // Success UI
      setNotice({ kind: "success", text: "Course submitted for review!" });
      onSubmit?.(data.course || payload);

      // Reset fast
      setTitle("");
      setDescription("");
      setSelectedTypes([]);
      setLevel("");
      setYear("");
      setThumbnail("");

      try {
        toast?.success?.("Course submitted for review!");
      } catch {}
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      setNotice({ kind: "error", text: msg });
      try {
        toast?.error?.(msg);
      } catch {}
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden border-0 shadow-xl rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl">
          {/* subtle 3D gradient glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(50%_50%_at_70%_60%,rgba(168,85,247,0.18),transparent_60%)]" />

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6" />
              Add Course (Ultra‑Fast)
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Just a title is required. Everything else is one‑tap. Press{" "}
              <kbd className="px-1.5 py-0.5 rounded border text-xs">Ctrl</kbd>+
              <kbd className="px-1.5 py-0.5 rounded border text-xs">Enter</kbd>{" "}
              to submit.
            </p>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            {/* Title (required) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title *</label>
              <Input
                ref={titleRef}
                placeholder="e.g. Mastering JavaScript in 30 Days"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            {/* Quick chips: Course Types (multi) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Course Type (multi‑select)
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((t) => {
                  const active = selectedTypes.includes(t);
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`select-none rounded-2xl px-3 py-1.5 text-sm transition-all shadow ${
                        active
                          ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                          : "bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-800 border"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Level (single) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <div className="flex flex-wrap gap-2">
                {levelOptions.map((l) => (
                  <button
                    type="button"
                    key={l}
                    onClick={() => setLevel(l === level ? "" : l)}
                    className={`rounded-xl px-3 py-1.5 text-sm transition-all border ${
                      level === l
                        ? "bg-emerald-600 text-white shadow-lg scale-[1.02]"
                        : "bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-800"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Year (single) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Year / Batch</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {yearOptions.map((y) => (
                  <button
                    type="button"
                    key={y}
                    onClick={() => setYear(year === y ? "" : y)}
                    className={`rounded-xl px-3 py-2 text-sm transition-all border text-left ${
                      year === y
                        ? "bg-fuchsia-600 text-white shadow-lg scale-[1.02]"
                        : "bg-white/70 dark:bg-zinc-800/70 hover:bg-white dark:hover:bg-zinc-800"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional details (collapsed feel via visual weight) */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Thumbnail URL (optional)
                </label>
                <Input
                  placeholder="https://..."
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Description (optional)
                </label>
                <Textarea
                  placeholder="1‑2 lines. You can skip for speed."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[44px]"
                />
              </div>
            </div>

            {/* Info line */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="rounded-full">
                Admin
              </Badge>
              <span>Video ID is set by admin after approval.</span>
            </div>

            {notice && (
              <div
                className={`text-sm rounded-xl px-3 py-2 border ${
                  notice.kind === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                {notice.kind === "success" ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {notice.text}
                  </div>
                ) : (
                  <div>{notice.text}</div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Quick tip: You can submit with{" "}
                <span className="font-semibold">Ctrl/Cmd + Enter</span>.
              </div>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="h-11 rounded-xl px-5"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Submit Course
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
