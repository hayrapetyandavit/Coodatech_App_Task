import { call, put } from "redux-saga/effects";
import { TColumn, IColumn } from "../../types/columnTypes";
import {
  createColumnSuccesed,
  createColumnFailed,
  getAllColumnsAction,
  getAllColumnsSuccesed,
  getAllColumnsFailed,
} from "./columnSlice";
import {
  createColumnService,
  getAllColumsService,
} from "../../services/columnService";

export function* createColumn(data: IColumn) {
  try {
    const response: Response = yield call(createColumnService, data.payload);
    if (!response.ok) {
      throw new Error("Column create failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    yield put(createColumnSuccesed(message));
    yield put(getAllColumnsAction());
  } catch (error: any) {
    yield put(createColumnFailed(error.message));
  }
}

export function* getColumnsData() {
  try {
    const response: Response = yield call(getAllColumsService);
    if (!response.ok) {
      throw new Error("Columns get failed");
    }
    const columns: TColumn[] = yield response.json() as Promise<TColumn[]>;
    yield put(getAllColumnsSuccesed(columns));
  } catch (error: any) {
    yield put(getAllColumnsFailed(error.message));
  }
}
