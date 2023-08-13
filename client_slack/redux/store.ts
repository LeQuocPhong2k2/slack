import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slice/userSlice";
import channelReducer from "@/redux/slice/channelSlice";
import threadReducer from "@/redux/slice/threadSlice";
import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux";
import { userApi } from "./api/userAPI";
import { channelApi } from "./api/chanelAPI";

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
      channels: channelReducer,
      [channelApi.reducerPath]: channelApi.reducer,
      threads: threadReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware,channelApi.middleware),
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch:() => AppDispatch = useDispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;