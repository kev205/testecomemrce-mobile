import { Cart } from "@/api/models/entities";
import { cartsApi } from "@/services/carts";
import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  carts: Cart[];
  skip?: number;
  isLoaded: boolean;
};

const slice = createSlice({
  name: "carts",
  initialState: { carts: [], isLoaded: false } as CartState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cartsApi.endpoints.cartsByUser.matchFulfilled,
      (state, { payload }) => {
        state.carts = payload.carts;
        state.skip = payload.skip;
        state.isLoaded = true;
      }
    );
    builder.addMatcher(
      cartsApi.endpoints.addCart.matchFulfilled,
      (state, { payload }) => {
        state.carts = [payload, ...state.carts];
        console.log("cart added", payload);
      }
    );
    builder.addMatcher(cartsApi.endpoints.addCart.matchRejected, (_, error) => {
      console.error("addCart failed", error);
    });
    builder.addMatcher(
      cartsApi.endpoints.updateCart.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        const index = state.carts.findIndex((cart) => cart.id === payload.id);
        console.log("index", index);
        state.carts[index] = payload;
      }
    );
    builder.addMatcher(
      cartsApi.endpoints.deleteCart.matchFulfilled,
      (state, { payload }) => {
        state.carts = state.carts.filter((cart) => cart.id !== payload.id);
      }
    );
  },
});

export const {} = slice.actions;

export default slice.reducer;

export const getCarts = (state: RootState) => state.carts.carts;

export const isCartsLoaded = (state: RootState) => state.carts.isLoaded;
