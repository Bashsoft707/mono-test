import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

export interface IAccount {
  _id: string;
 balance: number;
 user: string
bankLogo: string;
name: string;
bankName: string;
}

const initialState = {
  accountState: [] as IAccount[],
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setAccountState: (state, action) => {
      const { payload } = action;
      return {
        ...state.accountState,
        accountState: payload,
      }
    },
  },
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...action.payload.transactions,
//       };
//     },
//   },
});

export const { setAccountState } = accountSlice.actions;

export const selectAccountState = (state: AppState) =>
  state.accounts.accountState;

export default accountSlice.reducer;
