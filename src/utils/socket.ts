import { io, Socket } from 'socket.io-client';

// class SocketConnection {
//   private static instance: Socket | null = null;

//   static getInstance(): Socket {
//     if (!this.instance) {
//       this.instance = io(import.meta.env.VITE_SERVER_URL, {
//         withCredentials: true,
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         timeout: 5000,
//         transports: ['websocket', 'polling']
//       });

//       this.instance.on('connect', () => {
//         console.log('Socket connected successfully:', this.instance?.id);
//       });

//       this.instance.on('connect_error', (error) => {
//         console.error('Socket connection error:', error);
//       });
//     }
//     return this.instance;
//   }
// }

// export default SocketConnection;import { io, Socket } from 'socket.io-client';

class SocketConnection {
  private static instance: Socket | null = null;

  static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:8000', {
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 5000,
        transports: ['websocket', 'polling']
      });

      // Comprehensive connection logging
      this.instance.on('connect', () => {
        console.log('🟢 Socket Connected:', 
          'Socket ID:', this.instance?.id, 
          'Connected:', this.instance?.connected
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