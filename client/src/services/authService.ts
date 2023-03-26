import { authState } from "../types/authTypes";

export const registerUser = async (data: authState): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const login = async (data: authState): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
  return response;
};

export const logout = async () => {
  await fetch(`http://localhost:3001/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllUsersService = async (): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
