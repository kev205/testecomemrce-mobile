import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// reducers
import authSlice from "../reducers/auth/authSlice";
import productsSlice from "@/reducers/auth/productsSlice";
import cartsSlice from "@/reducers/auth/cartsSlice";
// apis
import { authenticationApi } from "../services/authentication";
import { productsApi } from "@/services/products";
import { cartsApi } from "@/services/carts";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    carts: cartsSlice,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      authenticationApi.middleware,
      productsApi.middleware,
      cartsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
