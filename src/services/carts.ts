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
    baseUrl: `${BASE_API_URL}/cats`,
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
    cartsByUser: builder.query<any, number>({
      query: (id) => {
        return {
          url: `/user/${id}`,
          methood: "GET",
        };
      },
      providesTags: () => ["Cart"],
    }),
    addCart: builder.mutation<any, CartPayload>({
      query: ({ userId, products }) => {
        return {
          url: "add",
          methood: "POST",
          body: { userId, products },
        };
      },
      invalidatesTags: () => ["Cart"],
    }),
  }),
});

export const { useLazyCartsByUserQuery, useAddCartMutation } = cartsApi;
