<<<<<<< Updated upstream
import { api } from './authApi';
=======
import { api } from "./authApi";
>>>>>>> Stashed changes

// POST /api/journal  — { title, body, prompt?, tags? }
export const createJournalEntry = (data) => api.post('/journal', data);

// GET /journal  — optionally ?year=&month=
export const getJournalEntries = (year, month) =>
  api.get('/journal', { params: { year, month } });

// GET /api/journal/:id
export const getJournalEntry = (id) => api.get(`/journal/${id}`);

// PATCH /api/journal/:id  — { title?, body?, tags? }
export const updateJournalEntry = (id, data) => api.patch(`/journal/${id}`, data);

// DELETE /api/journal/:id
export const deleteJournalEntry = (id) => api.delete(`/journal/${id}`);

// GET /journal/calendar?year=&month=
export const getJournalCalendar = (year, month) =>
  api.get('/journal/calendar', { params: { year, month } });