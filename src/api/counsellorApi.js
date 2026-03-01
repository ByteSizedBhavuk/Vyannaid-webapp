import { api } from "./authApi";

// GET /counsellor/profile
export const getCounsellorProfile = () => api.get("/counsellor/profile");

// PATCH /counsellor/profile — { bio, specialization, availability }
export const updateCounsellorProfile = (data) => api.patch("/counsellor/profile", data);

// GET /counsellor/students/:studentId
export const getAssignedStudentDashboard = (studentId) =>
  api.get(`/counsellor/students/${studentId}`);
