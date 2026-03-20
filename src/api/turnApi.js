// src/api/turnApi.js
// Fetches short-lived Cloudflare TURN credentials from our backend.
// Called once per VideoCall component mount.

import { api } from './authApi';

/**
 * Returns an array of RTCIceServer objects ready for use in RTCPeerConnection.
 * Falls back to Google STUN only if the request fails.
 */
export const getTurnCredentials = async () => {
  try {
    const res = await api.get('/api/turn/credentials');
    return res.data.iceServers || getStunFallback();
  } catch {
    return getStunFallback();
  }
};

const getStunFallback = () => [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];