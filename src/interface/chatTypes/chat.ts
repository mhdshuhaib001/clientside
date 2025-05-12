export interface Message {
  createdAt?: any;
  id?: string;
  senderId: string;
  receiverId?: string;
  timestamp?: string;

  message: string;
}

export interface Contact {
  unreadCount: number;
  timestamp: any;
  role?: string;
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  online: boolean;
}
