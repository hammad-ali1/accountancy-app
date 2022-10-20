import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { AccountancyUser } from "../api/auth";

//redux slice for storing user object globally
const initialState = new AccountancyUser();
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state: AccountancyUser,
      action: PayloadAction<AccountancyUser>
    ) => {
      return (state = action.payload);
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
