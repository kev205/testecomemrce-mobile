import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user?: any;
  session?: any;
};

const slice = createSlice({
  name: "auth",
  initialState: {} as AuthState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = slice.actions;

export default slice.reducer;
