import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

interface ITransaction {
name: string;
amount: number;
date: string;
type: string;
narration: string;
time: string;
}

const initialState = {
  transactionState: [] as ITransaction[],
};

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactionState: (state, action) => {
      const { payload } = action;
      return {
        ...state.transactionState,
        transactionState: payload,
      };
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

export const { setTransactionState } = transactionSlice.actions;

export const selectTransactionState = (state: AppState) =>
  state.transactions?.transactionState;

export default transactionSlice.reducer;
