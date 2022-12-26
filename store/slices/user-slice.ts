import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";


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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

// Export the actions
export const { setUserState } = userSlice.actions;

// Export the selector
export const selectUserState = (state: AppState) => state.user.userState;

// Export the reducer
export default userSlice.reducer;
