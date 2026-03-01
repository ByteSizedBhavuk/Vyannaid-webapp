import { api } from "./authApi";

// GET /dashboard/student
export const getStudentDashboard = () => api.get("/dashboard/student");

// PATCH /dashboard/student — { mentalStats, goals, journalEntries }
export const updateStudentDashboard = (data) => api.patch("/dashboard/student", data);
