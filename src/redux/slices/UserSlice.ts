import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";

import { IRootState } from "../store";
import { ILoginRes, IUserUpdate } from "@/api/ApiUser";

const initialState: ILoginRes = {};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (_, action: PayloadAction<ILoginRes>) => {
      return action.payload;
    },
    logoutUser: () => {
      return initialState;
    },
    reloadUser: (state, action: PayloadAction<IUserUpdate>) => {
      return { ...state, ...action.payload, first_login: false };
    },

    updateAvatarUser: (state, action: PayloadAction<IUserUpdate>) => {
      return { ...state, ...action.payload };
    },
  },
});

const useGetUserRedux = () => {
  return useSelector((state: IRootState) => state.user);
};

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, reloadUser, updateAvatarUser } =
  UserSlice.actions;

export { useGetUserRedux };

export default UserSlice.reducer;
