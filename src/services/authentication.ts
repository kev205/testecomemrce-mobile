import { BASE_API_URL } from "@/api/endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/auth/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => {
        return {
          url: "login",
          method: "POST",
          body: { username, password, expiresInMins: 30 },
        };
      },
      invalidatesTags: () => ["User"],
    }),
  }),
});

export const { useLoginMutation } = authenticationApi;
