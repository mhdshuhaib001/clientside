
  
  export interface Message {
    createdAt?: any ;
    id?: string; 
    senderId: string; 
    receiverId?: string;
    message: string;
    timestamp?: string;
  }

  
  export interface Contact {
    unreadCount: number;
    timestamp: any;
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    online: boolean;
  }