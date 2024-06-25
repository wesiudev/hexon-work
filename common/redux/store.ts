import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./slices/imagesSlice";
import userReducer from "./slices/userSlice";
import actionReducer from "./slices/actionSlice";
import lightReducer from "./slices/lightSlice";
export const store = configureStore({
  reducer: {
    images: imagesReducer,
    user: userReducer,
    action: actionReducer,
    light: lightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
