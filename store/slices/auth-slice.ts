import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
}

// Initial state
const initialState: AuthState = {
  authState: false,
};

// Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.auth,
  //     };
  //   },
  // },
});

// Export the actions
export const { setAuthState } = authSlice.actions;

// Export the selector
export const selectAuthState = (state: AppState) => state.auth.authState;

// Export the reducer
export default authSlice.reducer;
