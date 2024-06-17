import { createSlice } from "@reduxjs/toolkit";

type CartState = {};

const slice = createSlice({
  name: "auth",
  initialState: { templates: [], links: [], locations: [] } as CartState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = slice.actions;

export default slice.reducer;
