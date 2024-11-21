
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../interface/chatTypes/chat';

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('receive_message', (newMessage: Message) => {
            console.log('Received message in frontend:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Modified typing event handlers
        newSocket.on('typing', ({room }) => {
            setTypingUsers((prev) => {
                console.log('Setting typing state for room:', room, 'to true');
                return { ...prev, [room]: true };
            });
        });

        newSocket.on('stop_typing', ({ userId, room }) => {
            console.log('Received stop typing event:', { userId, room });
            setTypingUsers((prev) => {
                console.log('Setting typing state for room:', room, 'to false');
                return { ...prev, [room]: false };
            });
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendMessage = useCallback((message: Message) => {
        console.log('Sending message:', message);
        socket?.emit('send_message', message);
    }, [socket]);

    const joinRoom = useCallback((userId: string, receiverId: string) => {
        console.log(`Joining room for users: ${userId} and ${receiverId}`);
        socket?.emit('join chat', userId, receiverId);
    }, [socket]);

    const handleTyping = useCallback((userId: string, room: string, isTyping: boolean) => {
        console.log('Handling typing event:', { userId, room, isTyping });
        if (isTyping) {
            socket?.emit('typing', { userId, room });
        } else {
            socket?.emit('stop_typing', { userId, room });
        }
    }, [socket]);

    return {socket, messages, sendMessage, joinRoom, typingUsers, handleTyping };
};