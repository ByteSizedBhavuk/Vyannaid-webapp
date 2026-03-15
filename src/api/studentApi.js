import { api } from "./authApi";

// GET /dashboard/student
export const getStudentDashboard = () =>
  api.get("/dashboard/student");

// PATCH /dashboard/student — { mentalStats, goals, journalEntries }
export const updateStudentDashboard = (data) =>
  api.patch("/dashboard/student", data);

// GET /dashboard/student/sessions?upcoming=true
// Returns this student's own sessions with counsellor info attached
export const getStudentSessions = (params = {}) =>
  api.get("/dashboard/student/sessions", { params });

// GET /dashboard/student/counsellor
// Returns the counsellor assigned to this student, or null if none yet
export const getStudentCounsellor = () =>
  api.get("/dashboard/student/counsellor");