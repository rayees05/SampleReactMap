import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./Action";
export const store = configureStore({
  reducer: {
    res_no: reducerSlice,
  },
});
