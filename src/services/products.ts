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

type Filter = {
  sortBy: string;
  order: string;
};

type Projection = {
  select: string;
};

type Descriptor = Partial<{ page: Partial<Pagination> } & Filter & Projection>;

type CategoryQuery = {
  category: string;
} & Descriptor;

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
    baseUrl: `${BASE_API_URL}/products`,
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${session.token}`);
    },
  })(adjustedArgs, api, extraOptions);
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    topProducts: builder.query<any, Descriptor>({
      query: ({ page }) => {
        return {
          url: "/",
          method: "GET",
          params: { ...page },
        };
      },
      providesTags: () => ["Product"],
    }),
    productsOfFavoriteCategory: builder.query<any, CategoryQuery>({
      query: ({ category, page }) => {
        return {
          url: `/category/${category}`,
          method: "GET",
          params: { ...page },
        };
      },
    }),
    productsByCategory: builder.query<any, CategoryQuery>({
      query: ({ category, page }) => {
        return {
          url: `/category/${category}`,
          method: "GET",
          params: { ...page },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Category", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Category", id: "PARTIAL-LIST" }],
    }),
    getProduct: builder.query<any, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "GET",
        };
      },
      providesTags: (result) => [{ type: "Product", id: result?.id }],
    }),
    listCategories: builder.query<any, Partial<Pagination>>({
      query: (page) => {
        return {
          url: "/categories",
          method: "GET",
          params: { ...page },
        };
      },
      providesTags: () => ["Product"],
    }),
    searchProducts: builder.query<any, { q: string } & Descriptor>({
      query: (params) => {
        return {
          url: "/search",
          method: "GET",
          params,
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
  useListCategoriesQuery,
  useSearchProductsQuery,
  usePrefetch,
} = productsApi;
