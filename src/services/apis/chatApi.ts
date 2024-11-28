import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Message } from '../../interface/chatTypes/chat';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SOCKET_URL  }),
  endpoints: (builder) => ({

    createRoom: builder.mutation<any, { userId: string; selectedChatId: string }>({
      query: ({ userId, selectedChatId }) => ({
        url: `/api/chat/create-room`,
        method: "POST",
        body: { userId, selectedChatId },
      }),
    }),  getMessages: builder.query<Message[], { senderId: string; receiverId: string }>({
      query: ({ senderId, receiverId }) => {
        return `/api/chat/get-message/${senderId}/${receiverId}`;
      },
    }),

    sendMessage: builder.mutation<void, Message>({
      query: (message) => ({
        url: '/api/chat/send-message',
        method: 'POST',
        body: message,
      }),
    }),
    chatBot: builder.mutation<{ message: string }, { message: string; itemDetails: any }>({
      query: ({ message, itemDetails }) => ({
        url: '/api/chat/chatbot',
        method: 'POST',
        body: {
          message,
          itemDetails,
        },
      }),
    }),  }),
});

export const { useCreateRoomMutation, useGetMessagesQuery, useSendMessageMutation ,useChatBotMutation} = chatApi;
