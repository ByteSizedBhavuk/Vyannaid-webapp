import { api } from './authApi';

// GET /profile
export const getProfile = () => api.get('/profile');

// PATCH /profile — { name, bio, avatarColor }
export const updateProfile = (data) => api.patch('/profile', data);