import { cartsApi } from "@/services/carts";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  carts?: any;
};

const slice = createSlice({
  name: "auth",
  initialState: {} as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cartsApi.endpoints.cartsByUser.matchFulfilled,
      (state, { payload }) => {
        state.carts = payload;
      }
    );
    builder.addMatcher(
      cartsApi.endpoints.addCart.matchFulfilled,
      (state, { payload }) => {
        console.log("cart added", payload);
      }
    );
    builder.addMatcher(
      cartsApi.endpoints.cartsByUser.matchRejected,
      (_, error) => {
        console.error("cartsByUser failed", error);
      }
    );
    builder.addMatcher(cartsApi.endpoints.addCart.matchRejected, (_, error) => {
      console.error("addCart failed", error);
    });
  },
});

export const {} = slice.actions;

export default slice.reducer;
