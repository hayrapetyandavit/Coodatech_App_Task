import { call, put } from "redux-saga/effects";
import { TCard, ICard, ICardId } from "../../types/cardTypes";
import {
  createCardSuccesed,
  createCardFailed,
  getAllCardsAction,
  getAllCardsSuccesed,
  getAllCardsFailed,
  getAllCardsByColumIdSuccesed,
  getAllCardsByColumIdFailed,
  updateCardByIdSuccesed,
  updateCardByIdFailed,
  deleteCardByIdSuccesed,
  deleteCardByIdFailed,
} from "./cardSlice";

import {
  createCardService,
  getAllCardsService,
  updateCardByIdService,
  getCardByColumnIdService,
  deleteCardByIdService,
} from "../../services/cardService";
import { notify } from "../../utils/notifyMessage";

export function* createCard(data: ICard) {
  try {
    const response: Response = yield call(createCardService, data.payload);
    if (!response.ok) {
      throw new Error("Card create failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    yield put(createCardSuccesed(message));
    yield put(getAllCardsAction());
  } catch (error: any) {
    yield put(createCardFailed(error.message));
  }
}

export function* getCardData() {
  try {
    const response: Response = yield call(getAllCardsService);
    if (!response.ok) {
      throw new Error("Columns get failed");
    }
    const cards: TCard[] = yield response.json() as Promise<TCard[]>;
    yield put(getAllCardsSuccesed(cards));
  } catch (error: any) {
    yield put(getAllCardsFailed(error.message));
  }
}

export function* getCardsByColumnId(data: ICardId) {
  try {
    const response: Response = yield call(
      getCardByColumnIdService,
      data.payload
    );
    if (!response.ok) {
      throw new Error("Cards get failed");
    }
    const cards: TCard[] = yield response.json() as Promise<TCard[]>;

    yield put(getAllCardsByColumIdSuccesed(cards));
  } catch (error: any) {
    yield put(getAllCardsByColumIdFailed(error.message));
  }
}

export function* updateCardById(data: ICard) {
  try {
    const response: Response = yield call(updateCardByIdService, data.payload);
    if (!response.ok) {
      throw new Error("Card updated failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    if (message === "Permission denied") {
      notify(message);
    }
    yield put(updateCardByIdSuccesed(message));
    yield put(getAllCardsAction());
  } catch (error: any) {
    yield put(updateCardByIdFailed(error.message));
  }
}

export function* deleteCardById(data: ICard) {
  try {
    const response: Response = yield call(deleteCardByIdService, data.payload);
    if (!response.ok) {
      throw new Error("Card delete failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    if (message === "Permission denied") {
      notify(message);
    }
    yield put(deleteCardByIdSuccesed(message));
    yield put(getAllCardsAction());
  } catch (error: any) {
    yield put(deleteCardByIdFailed(error.message));
  }
}
