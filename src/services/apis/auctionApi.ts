import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const auctionApi = createApi({
  reducerPath: 'auctionApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL  }),
  endpoints: (builder) => ({
    getAuctionById: builder.query({
      query: (id) => `api/auction/biddes/${id}`,
    }),
    placeBid: builder.mutation({
      query: ({ auctionId, bidderId, currentBid, bidAmount, time, sellerId }) => ({
        url: '/api/auction',
        method: 'POST',
        body: { auctionId, bidderId, currentBid, bidAmount, time, sellerId },
      }),
    }),
    checkAuctionWinner: builder.mutation({
      query: (auctionId) => ({
        url: `/api/auction/${auctionId}/winner`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetAuctionByIdQuery, usePlaceBidMutation, useCheckAuctionWinnerMutation } =
  auctionApi;
