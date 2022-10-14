import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import BookingReducer from "./slices/BookingSlice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    booking: BookingReducer,
  },
});

export default store;
