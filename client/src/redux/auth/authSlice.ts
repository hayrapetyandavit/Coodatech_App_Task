import { createSlice } from "@reduxjs/toolkit";

const localUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: localUser || {},
  users: [],
  auth: !!localUser,
  message: {},
};

const authSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginAction: (state, action) => {},
    loginSuccesed: (state, action) => {
      state.user = action.payload;
      state.auth = true;
    },
    loginFailed: (state, action) => {
      state.message = action.payload;
    },
    registerAction: (state, action) => {},
    registerSuccesed: (state, action) => {
      state.user = action.payload;
    },
    registerFailed: (state, action) => {
      state.message = action.payload;
    },
    logoutAction: (state, action) => {},
    logoutSuccesed: (state) => {
      state.auth = false;
    },
    getAllUsersAction: () => {},
    getAllUsersSuccesed: (state, action) => {
      state.users = action.payload;
    },
    getAllUsersFailed: (state, action) => {
      state.message = action.payload;
    },
    refreshAction: () => {},
    userReset: (state) => {
      state.user = localUser || {};
      state.auth = false;
    },
  },
});

export const {
  loginAction,
  loginFailed,
  registerAction,
  registerSuccesed,
  registerFailed,
  loginSuccesed,
  logoutAction,
  logoutSuccesed,
  getAllUsersAction,
  getAllUsersSuccesed,
  getAllUsersFailed,
  refreshAction,
  userReset,
} = authSlice.actions;

export default authSlice;
