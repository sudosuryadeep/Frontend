// // src/api/course.js
// import { BASE_URL } from "./index";

// // ✅ Add a new course
// export const addCourse = async (courseData, token) => {
//   const res = await fetch(`${BASE_URL}/courses`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(courseData),
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || "Failed to submit course");
//   }

//   return await res.json();
// };

// // ✅ Get courses (for user or all, depending on backend role)
// export const getAllCourses = async (token) => {
//   const res = await fetch(`${BASE_URL}/courses`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || "Failed to fetch courses");
//   }

//   return await res.json(); // should return an array of courses
// };




import { BASE_URL } from "./index";

// ✅ Get all courses (for homepage or general listing)
export const getAllCourses = async () => {
  const res = await fetch(`${BASE_URL}/courses`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch courses");
  }
  return await res.json();
};

// ✅ Get courses submitted by the logged-in user
export const getMyCourses = async (token) => {
  const res = await fetch(`${BASE_URL}/courses/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch your courses");
  }
  return await res.json();
};


// get all courses admin
// Get all courses for admin (including pending & rejected)
export const getAllCoursesAdmin = async (token) => {
  const res = await fetch(`${BASE_URL}/admin/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch admin courses");
  }
  return await res.json();
};



// approve and reject course api

export const approveCourseAPI = async (courseId, token) => {
  const res = await fetch(`${BASE_URL}/admin/approve/${courseId}`, {
    method: "PATCH", // ✅ PATCH
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to approve course");
  return res.json();
};

export const rejectCourseAPI = async (courseId, token) => {
  const res = await fetch(`${BASE_URL}/admin/reject/${courseId}`, {
    method: "PATCH", // ✅ PATCH
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to reject course");
  return res.json();
};




// ✅ Add a new course
export const addCourse = async (courseData, token) => {
  const res = await fetch(`${BASE_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to submit course");
  }

  return await res.json();
};