import { authenticationApi } from "@/services/authentication";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user?: any;
  session?: any;
};

const slice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.login.matchFulfilled,
      (state, payload) => {
        const { token, refreshToken, ...user } = payload.payload;

        state.user = user;
        state.session = { token, refreshToken };
      }
    );
    builder.addMatcher(
      authenticationApi.endpoints.login.matchRejected,
      (state, err) => {
        console.error(err);
      }
    );
  },
  selectors: {
    getSession: (state) => state.session,
    getUser: (state) => state.user,
  },
});

export const {} = slice.actions;

export const { getSession, getUser } = slice.selectors;

export default slice.reducer;
