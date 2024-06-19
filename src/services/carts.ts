import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@/api/endpoints";
import { RootState } from "@/store/store";

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
    prepareHeaders(headers, { getState }) {
      const { token } = (getState() as RootState).auth.session ?? {};
      console.log("token", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
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
          method: "POST",
          body: { userId, products },
          headers: { "Content-Type": "application/json" },
        };
      },
      // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     createApi.util.updateQueryData("getPost", id, (draft) => {
      //       Object.assign(draft, patch);
      //     })
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
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
          method: "DELETE",
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
