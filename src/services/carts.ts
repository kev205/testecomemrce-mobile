import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@/api/endpoints";

type Pagination = {
  limit: number;
  skip: number;
};

type CartPayload = {
  id: number;
  userId: number;
  products: { id: number; quantity: number }[];
};

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const session: any = {};

  const urlSuffix = typeof args === "string" ? args : args.url;
  const adjustedUrl = `${urlSuffix}`;
  const adjustedArgs =
    typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };

  return fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/carts`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${session.token}`);
    },
  })(adjustedArgs, api, extraOptions);
};

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    cartsByUser: builder.query<any, { id: number } & Partial<Pagination>>({
      query: ({ id, ...page }) => ({
        url: `/user/${id}?`,
        params: { ...page },
      }),
      providesTags: () => ["Cart"],
    }),
    addCart: builder.mutation<any, Partial<CartPayload>>({
      query: ({ userId, products }) => {
        return {
          url: "/add",
          methood: "POST",
          body: { userId, products },
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
    updateCart: builder.mutation<any, Partial<CartPayload>>({
      query: ({ id, products }) => {
        return {
          url: `/${id}`,
          method: "PATCH",
          body: { products, merge: false },
          headers: { "Content-Type": "application/json" },
        };
      },
    }),
    deleteCart: builder.mutation<any, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          methood: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLazyCartsByUserQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = cartsApi;
