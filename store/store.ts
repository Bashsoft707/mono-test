import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth-slice";
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./slices/user-slice";
import { accountSlice } from "./slices/account-slice";
import { transactionSlice } from "./slices/transaction-slice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [accountSlice.name]: accountSlice.reducer,
      [transactionSlice.name]: transactionSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper(makeStore, { debug: true });
