import { NavigateFunction } from "react-router-dom";
import { call, put } from "redux-saga/effects";
import {
  registerUser,
  login,
  logout,
  getAllUsersService,
} from "../../services/authService";

import { AuthData, authState, Users } from "../../types/authTypes";
import {
  getAllUsersFailed,
  getAllUsersSuccesed,
  loginFailed,
  loginSuccesed,
  logoutSuccesed,
  userReset,
} from "./authSlice";

interface Data {
  type: string;
  payload: NavigateFunction;
}

export function* logoutUser(data: Data) {
  yield call(logout);
  yield put(logoutSuccesed());
  yield data.payload("login");
  yield localStorage.removeItem("user");
  yield resetStore();
}

export function* resetStore() {
  yield put(userReset());
}

export function* userRegister(data: AuthData) {
  try {
    const response: Response = yield call(registerUser, data.payload.form);

    if (!response.ok) {
      throw new Error("Register failed");
    }
    const user: Users = yield response.json() as Promise<Users>;

    if (user) {
      data.payload.navigate("/login");
    }
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

export function* userLogin(data: AuthData) {
  try {
    const response: Response = yield call(login, data.payload.form);

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const user: Users = yield response.json() as Promise<Users>;

    yield localStorage.setItem("user", JSON.stringify(user));
    yield put(loginSuccesed(user));
  } catch (error: any) {
    yield put(loginFailed(error.message));
  }
}

export function* getAllUsers() {
  try {
    const response: Response = yield call(getAllUsersService);
    if (!response.ok) {
      throw new Error("Users get failed");
    }
    const users: authState[] = yield response.json() as Promise<authState[]>;
    yield put(getAllUsersSuccesed(users));
  } catch (error: any) {
    yield put(getAllUsersFailed(error.message));
  }
}
