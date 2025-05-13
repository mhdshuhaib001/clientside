import { io, Socket } from 'socket.io-client';


class SocketConnection {
  private static instance: Socket | null = null;

  static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io(import.meta.env.VITE_SERVER_URL, {
        path: '/socket.io',
        // transports: ['websocket', 'polling'],
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 5000,
      });
      

      // Comprehensive connection logging
      this.instance.on('connect', () => {
        console.log(
          '🟢 Socket Connected:',
          'Socket ID:',
          this.instance?.id,
          'Connected:',
          this.instance?.connected,
        );
      });

      this.instance.on('connect_error', (error) => {
        console.error('🔴 Socket Connection Error:', error);
      });

      this.instance.on('disconnect', (reason) => {
        console.warn('🔶 Socket Disconnected:', reason);
      });
    }
    return this.instance;
  }

  static connectUser(userId: string) {
    if (this.instance && this.instance.connected) {
      this.instance.emit('user_connected', userId);
    }
  }
}

export default SocketConnection;
