import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthResponse } from '../../interface/userTypes/apiTypes';
import { getToken } from '../../utils/getHelper';
import { Address } from '../../interface/userTypes/apiTypes';
import { Category } from '../../interface/adminTypes/adminApiTypes';
import { ChangePasswordType } from '../../interface/userTypes/changePasswordType';

export const ApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL ,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    isBlocked: builder.query<boolean, void>({
      query: () => '/api/auth/isBlocked',
    }),
    signup: builder.mutation<AuthResponse, AuthRequest>({
      query: (signupData) => ({
        url: '/api/auth/signup',
        method: 'POST',
        body: signupData,
      }),
    }),
    sendOtp: builder.mutation<void, { email: string; otp: number }>({
      query: (otpData) => ({
        url: '/api/auth/send-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (loginData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    googleAuth: builder.mutation<AuthResponse, { idToken: string }>({
      query: (tokenData) => ({
        url: '/api/auth/google-auth',
        method: 'POST',
        body: tokenData,
      }),
    }),
    emailSend: builder.mutation<AuthResponse, { email: string }>({
      query: (emailData) => ({
        url: '/api/auth/forget-password-request',
        method: 'POST',
        body: emailData,
      }),
    }),
   forgetPassword: builder.mutation<AuthResponse, { token: string; newPassword: string }>({
  query: (newPasswordData) => {
    console.log('Data sent to /api/auth/forget-password:', newPasswordData);
    return {
      url: '/api/auth/forget-password',
      method: 'POST',
      body: newPasswordData,
    };
  },
}),

    addAddress: builder.mutation<AuthResponse, { address: Address }>({
      query: (addressData) => ({
        url: '/api/user/address',
        method: 'POST',
        body: addressData,
      }),
    }),
    updateAddress: builder.mutation<AuthResponse, { id: string; address: Address }>({
      query: ({ id, address }) => ({
        url: `/api/user/address/${id}`,
        method: 'PUT',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/api/user/address/${id}`,
        method: 'DELETE',
      }),
    }),
    getAddress: builder.query<Address[], string>({
      query: (userId) => `/api/user/address/${userId}`,
    }),
    updateProfile: builder.mutation<AuthResponse, FormData>({
      query: (formData) => ({
        url: `/api/user/user`,
        method: 'PUT',
        body: formData,
      }),
    }),
    fetchUserById: builder.query<AuthResponse, string>({
      query: (userId) => `/api/user/user/${userId}`,
    }),
    fetchCategories: builder.query<Category[], void>({
      query: () => '/api/user/categories',
    }),

    changePassword: builder.mutation<ChangePasswordType, { userId:string,currentPassword: string; newPassword: string; confirmPassword: string }>({
      query: ({userId, currentPassword, newPassword, confirmPassword }) => ({
        url: '/api/user/change-password',
        method: 'POST',
        body: {userId, currentPassword, newPassword, confirmPassword }
      })
    }),
    fetchAuctionHistory: builder.query({
      query: (userId) => ({
        url: `/api/user/auction-history?userId=${userId}`, 
        method: 'GET',
      }),
    }),

    
  }),
  
});

export const {
  useSignupMutation,
  useSendOtpMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useEmailSendMutation,
  useForgetPasswordMutation,
  useIsBlockedQuery,
  useAddAddressMutation,
  useGetAddressQuery,
  useUpdateProfileMutation,
  useFetchUserByIdQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useFetchCategoriesQuery,
  useChangePasswordMutation,
  useFetchAuctionHistoryQuery
} = ApiSlice;
