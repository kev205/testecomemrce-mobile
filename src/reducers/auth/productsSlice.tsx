import { productsApi } from "@/services/products";
import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

type ProductsState = {
  topGoods?: any[];
  categories?: any;
};

const slice = createSlice({
  name: "auth",
  initialState: { categories: {}, topGoods: [] } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.topProducts.matchPending,
      (state) => {
        console.log("fetching top products");
      }
    );
    builder.addMatcher(
      productsApi.endpoints.topProducts.matchFulfilled,
      (state, payload) => {
        state.topGoods = payload.payload.products;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.topProducts.matchFulfilled,
      (state, err) => {
        console.error(err);
      }
    );
    builder.addMatcher(
      productsApi.endpoints.productsByCategory.matchPending,
      (state) => {
        console.log("fetching top products");
      }
    );
    builder.addMatcher(
      productsApi.endpoints.productsByCategory.matchFulfilled,
      (
        state,
        {
          meta: {
            arg: {
              originalArgs: { category },
            },
          },
          payload,
        }
      ) => {
        state.categories[category] = payload.products;
      }
    );
    builder.addMatcher(
      productsApi.endpoints.productsByCategory.matchFulfilled,
      (state, err) => {
        console.error(err);
      }
    );
  },
  selectors: {
    productsByCategory: (state, category) => state.categories[category],
  },
});

export const {} = slice.actions;

export const { productsByCategory } = slice.selectors;

export default slice.reducer;

export const selectTopProducts = (state: RootState) => state.products.topGoods;
