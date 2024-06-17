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

type CategoryQuery = { category: string; page: Pagination };

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const session = {};

  const urlSuffix = typeof args === "string" ? args : args.url;
  const adjustedUrl = `${urlSuffix}`;
  const adjustedArgs =
    typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };

  console.log("adjustedArgs", adjustedArgs);

  return fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/products`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${session.token?.token}`);
    },
  })(adjustedArgs, api, extraOptions);
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    topProducts: builder.query<any, { page: Pagination }>({
      query: ({ page }) => {
        return {
          url: "/",
          methood: "GET",
          params: { ...page },
        };
      },
      providesTags: () => ["Product"],
    }),
    productsOfFavoriteCategory: builder.query<any, CategoryQuery>({
      query: ({ category, page }) => {
        return {
          url: `/category/${category}`,
          methood: "GET",
          params: { ...page },
        };
      },
      providesTags: () => ["Category"],
    }),
    productsByCategory: builder.query<any, CategoryQuery>({
      query: ({ category, page }) => {
        return {
          url: `/category/${category}`,
          methood: "GET",
          params: { ...page },
        };
      },
      providesTags: () => ["Category"],
    }),
    getProduct: builder.query<any, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          methood: "GET",
        };
      },
      providesTags: () => ["Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useLazyGetProductQuery,
  useProductsByCategoryQuery,
  useLazyProductsByCategoryQuery,
  useTopProductsQuery,
  useLazyTopProductsQuery,
  useProductsOfFavoriteCategoryQuery,
} = productsApi;
