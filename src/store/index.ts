import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { launchesApi } from "../api/launches.api";
import launchesReducer from "./launches/launchesSlice";

export const store = configureStore({
  reducer: {
    [launchesApi.reducerPath]: launchesApi.reducer,
    launches: launchesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(launchesApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
