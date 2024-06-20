import { authenticationApi } from "@/services/authentication";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user?: any;
  session?: any;
};

const slice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {
    setSession: (state, { payload }: PayloadAction<any>) => {
      const { token, refreshToken, ...user } = payload;

      state.user = user;
      state.session = { token, refreshToken };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authenticationApi.endpoints.login.matchFulfilled,
      (state, payload) => {
        const { token, refreshToken, ...user } = payload.payload;

        state.user = user;
        state.session = { token, refreshToken };
      }
    );
  },
  selectors: {
    getSession: (state) => state.session,
    getUser: (state) => state.user,
  },
});

export const { setSession } = slice.actions;

export const { getSession, getUser } = slice.selectors;

export default slice.reducer;
