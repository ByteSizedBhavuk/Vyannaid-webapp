import { api } from "./authApi";

// POST /api/mood  — { moodScore: 1–10 }
export const logMood = (moodScore) => api.post("/api/mood", { moodScore });

// GET /api/mood/stats — returns { weekly, monthly, yearly }
export const getMoodStats = () => api.get("/api/mood/stats");
