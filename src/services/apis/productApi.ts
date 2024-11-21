import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType } from '../../interface/productTypes/productType';
import { getToken } from '../../utils/getHelper';
import { ProductsResponse } from '../../interface/sellerTypes/sellerApiTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
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
    fetchAllProducts: builder.query<ProductsResponse, void>({
      query: () => '/api/products/getallproduct',
    }),
    getProductById: builder.query<ProductType, any>({
      query: (id) => ({ url: `/api/products/${id}` }),
    }),
    getProduct: builder.query<ProductType, any>({
      query: (id) => ({ url: `/api/products/getProduct/${id}` }),
    }),
    // createProduct: builder.mutation<Product, Partial<Product>>({
    //   query: (productData) => ({
    //     url: '/api/products',
    //     method: 'POST',
    //     body: productData,
    //   }),
    // }),
    updateProduct: builder.mutation<ProductType, { id: string; productData: Partial<ProductType> }>({
      query: ({ id, productData }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body: productData,
      }),
    }),

    // deleteProduct: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/api/products/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductQuery,
  useFetchAllProductsQuery,
  useGetProductByIdQuery,
  // useCreateProductMutation,
  useUpdateProductMutation,
  // useDeleteProductMutation,
} = productApi;
