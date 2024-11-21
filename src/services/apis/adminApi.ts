import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminLoginRequest, AdminLoginResponse ,AddCategoryRequest, FetchCategoriesResponse,AddReportRequest,AddReportResponse, FetchReportsResponse} from '../../interface/adminTypes/adminApiTypes';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (loginData) => ({
        url: '/api/auth/admin-login',
        method: 'POST',
        body: loginData,
      }),
    }),
    fetchAllUsers: builder.query<any, void>({
      query: () => ({
        url: '/api/admin/get-user',
        method: 'GET',
      }),
    }),
    updateUserStatus: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/api/admin/user-status`,
        method: 'POST',
        body: { userId },
      }),
    }),
    addCategory: builder.mutation<AddCategoryRequest, FormData>({
      query: (formData) => ({
        url: `/api/admin/categories`,
        method: 'POST',
        body: formData,
      }),
    }),
    fetchCategory:builder.query<FetchCategoriesResponse,{page:number,limit:number}>({
      query:({ page, limit })=>({
        url:`api/admin/categories?page=${page}$limit=${limit}`,
        method: 'GET'
      })
    }),
    updateCategory: builder.mutation<FetchCategoriesResponse, {id:string ; formData:FormData}>({
      query: ({ id, formData }) => ({
        url: `/api/admin/categories/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (categoryId) => ({
        url: `/api/admin/categories/${categoryId}`,
        method: 'DELETE',
      }),
    }),

    addReport:builder.mutation<AddReportResponse,AddReportRequest>({
      query:(reportData)=>({
        url:'/api/admin/report',
        method:'POST',
        body:reportData
      })
    }),
    fetchReports:builder.query<FetchReportsResponse,void>({
      query: () => ({
        url: '/api/admin/getreports',
        method: 'GET',
      }),
    }),
    updateReportStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/status/${id}`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    subscribeNotification: builder.mutation<any, any>({
      query: (notificationData) => ({
        url: '/api/admin/auction-notification',
        method: 'POST',
        body: notificationData,
      }),
    }),
    

  }),
    
  })


export const {
  useAdminLoginMutation,
  useFetchAllUsersQuery,
  useUpdateUserStatusMutation,
  useAddCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddReportMutation,
  useFetchReportsQuery,
  useUpdateReportStatusMutation,
  useSubscribeNotificationMutation
} = adminApi;
