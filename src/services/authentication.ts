import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../constants/api";

type TokenPayload = { id: string; platform: "android" | "ios"; token: string };

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/app/`,
  }),
  endpoints: (builder) => ({
    requestToken: builder.mutation<any, string>({
      query: (email) => ({
        url: "request-token-v2",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation<any, { email: string; code: string }>({
      query: ({ email, code }) => ({
        url: "verify-otp",
        method: "POST",
        body: { email, code },
      }),
    }),
    getLocations: builder.mutation<any, string>({
      query: (email) => ({
        url: "retrieve",
        method: "GET",
        params: { email },
      }),
    }),
    saveDeviceToken: builder.mutation<any, TokenPayload>({
      query: ({ id, platform, token }) => ({
        url: "save-device-token",
        method: "POST",
        body: { id, platform, token },
      }),
    }),
  }),
});

export const {
  useRequestTokenMutation,
  useGetLocationsMutation,
  useSaveDeviceTokenMutation,
  useVerifyOtpMutation,
} = authenticationApi;
