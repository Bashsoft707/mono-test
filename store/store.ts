import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { userSlice } from "./slices/user-slice";
import { accountSlice } from "./slices/account-slice";
import { transactionSlice } from "./slices/transaction-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootRedcuer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [accountSlice.name]: accountSlice.reducer,
  [transactionSlice.name]: transactionSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootRedcuer);

export const makeStore = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export type AppState = ReturnType<typeof makeStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const persistor = persistStore(makeStore);
