import { NavigateFunction } from "react-router-dom";

export interface authState {
  name?: string;
  email: string;
  password: string;
}

export interface AuthData {
  type: string;
  payload: {
    form: authState;
    navigate: NavigateFunction;
  };
}

export type Users = {
  id: number;
  name: string;
  email: string;
  role: string;
  passwoard?: string;
};
