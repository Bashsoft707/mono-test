import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

interface IUserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Initial state
const initialState = {
  userState: {},
};

// Create the slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.userState = action.payload;
    },
    logoutUser: (state) => {
      state.userState = {};
    }
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.user,
  //     };
  //   },
  // },
});

// Export the actions
export const { setUserState, logoutUser } = userSlice.actions;

// Export the selector
export const selectUserState = (state: AppState) => state.user.userState as IUserData;

// Export the reducer
export default userSlice.reducer;
