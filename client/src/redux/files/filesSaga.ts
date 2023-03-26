import { call, put } from "redux-saga/effects";
import {
  uploadFileSuccesed,
  uploadFileFailed,
  getAllfilesAction,
  getAllfilesSuccesed,
  getAllfilesFailed,
  deleteFileByIdSuccesed,
  deleteFileByIdFailed,
} from "./filesSlice";
import {
  getAllFilesService,
  uploadFileService,
  deleteFileByIdService,
} from "../../services/filesService";
import { IFile, IFileDel } from "../../types/fileTypes";
import { notify } from "../../utils/notifyMessage";

export function* uploadFile(data: IFile) {
  try {
    const response: Response = yield call(uploadFileService, data.payload);
    if (!response.ok) {
      throw new Error("Upload file failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    if (message === "Permission denied") {
      notify(message);
    }
    yield put(uploadFileSuccesed(message));
    yield put(getAllfilesAction());
  } catch (error: any) {
    yield put(uploadFileFailed(error.message));
  }
}

export function* getFileData() {
  try {
    const response: Response = yield call(getAllFilesService);
    if (!response.ok) {
      throw new Error("Files get failed");
    }
    const cards: IFile[] = yield response.json() as Promise<IFile[]>;
    yield put(getAllfilesSuccesed(cards));
  } catch (error: any) {
    yield put(getAllfilesFailed(error.message));
  }
}

export function* deleteFileById(data: IFileDel) {
  try {
    const response: Response = yield call(deleteFileByIdService, data.payload);
    if (!response.ok) {
      throw new Error("File delete failed");
    }
    const { message }: { message: string } = yield response.json() as Promise<{
      message: string;
    }>;
    if (message === "Permission denied") {
      notify(message);
    }
    yield put(deleteFileByIdSuccesed(message));
    yield put(getAllfilesAction());
  } catch (error: any) {
    yield put(deleteFileByIdFailed(error.message));
  }
}
