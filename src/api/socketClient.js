/**
 * src/api/socketClient.js
 *
 * Singleton Socket.io client.
 * Created once per session, reused across all components.
 * Prevents multiple connections forming when VideoCall remounts.
 */

import { io } from 'socket.io-client';

let socket = null;

/**
 * Returns the existing socket or creates a new one.
 * @param {string} token — JWT from localStorage
 */
export function getSocket(token) {
  if (!socket || socket.disconnected) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
      auth:       { token },       // Sent to server on connect for JWT auth
      transports: ['websocket'],   // Skip long-polling — WebSocket only
      reconnectionAttempts: 5,
    });

    socket.on('connect_error', (err) => {
      console.error('[Socket] connection error:', err.message);
    });
  }
  return socket;
}

/**
 * Disconnects and clears the singleton.
 * Call this on logout.
 */
export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}