import { api } from "./authApi";

/**
 * GET /api/assessment/recent
 * Returns the most recent assessment for the logged-in student.
 */
export const getRecentAssessment = () => 
  api.get("/assessment/recent");
