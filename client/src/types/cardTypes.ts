export type TCard = {
  id: number;
  title: string;
  userId: number;
  columnId: number;
  createdAt?: string;
  updatedAt?: string;
};

export type cardFiles = {
  id: number;
  name: string;
  userId: number;
  cardId: number;
};

export interface ICard {
  type: number;
  payload: TCard;
}

export interface ICardId {
  type: number;
  payload: string;
}
