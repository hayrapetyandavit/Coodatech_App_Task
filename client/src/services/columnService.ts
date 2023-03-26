import { TColumn } from "../types/columnTypes";

export const createColumnService = async (data: TColumn): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/column`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getAllColumsService = async (): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/columns`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
