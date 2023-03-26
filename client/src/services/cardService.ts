import { TCard } from "../types/cardTypes";

export const createCardService = async (data: TCard): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/card`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getAllCardsService = async (): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/cards`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateCardByIdService = async (data: TCard): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/card/${data.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const getCardByIdService = async (id: string): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/card/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getCardByColumnIdService = async (
  id: string
): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/cards/column/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const deleteCardByIdService = async (data: TCard): Promise<Response> => {
  const response = await fetch(`http://localhost:3001/card/${data.id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
