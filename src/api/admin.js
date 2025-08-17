// src/api/admin.js
import { BASE_URL, getAuthHeader } from "./index.js";

export async function getPendingCourses(token) {
    const res = await fetch(`${BASE_URL}/admin/pending`, {
        headers: getAuthHeader(token),
    });
    return res.json();
}

export async function approveCourse(id, token) {
    const res = await fetch(`${BASE_URL}/admin/approve/${id}`, {
        method: "PATCH",
        headers: getAuthHeader(token),
    });
    return res.json();
}

export async function rejectCourse(id, token) {
    const res = await fetch(`${BASE_URL}/admin/reject/${id}`, {
        method: "PATCH",
        headers: getAuthHeader(token),
    });
    return res.json();
}

export async function getAllCoursesAdmin(token) {
    const res = await fetch(`${BASE_URL}/admin/courses`, {
        headers: getAuthHeader(token),
    });
    return res.json();
}

export const getAllAdminsAPI = async (token) => {
    const res = await fetch(`${BASE_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch admins");
    return await res.json();
};