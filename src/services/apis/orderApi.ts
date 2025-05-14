import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrder } from '../../interface/orderTypes/orderType';
import { getToken } from '../../utils/getHelper';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (orderData) => ({
        url: '/api/orders/payment-intent',
        method: 'POST',
        body: orderData,
      }),
    }),
    checkProductPurchaseStatus: builder.query({
      query: ({ productId }) => ({
        url: `/api/orders/check-purchase-status/${productId}`,
        method: 'GET',
      }),
    }),
    createCheckoutSession: builder.mutation({
      query: (orderData) => ({
        url: '/api/orders/checkout-session',
        method: 'POST',
        body: orderData,
      }),
    }),
    fetchOrderByUser: builder.query<IOrder[], string>({
      query: (userId) => `/api/orders/user-orders/${userId}`,
    }),
    fetchOrderById: builder.query<IOrder, string>({
      query: (orderId) => `/api/orders/order-details/${orderId}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCheckProductPurchaseStatusQuery,
  useCreateCheckoutSessionMutation,
  useFetchOrderByUserQuery,
  useFetchOrderByIdQuery,
} = orderApi;
