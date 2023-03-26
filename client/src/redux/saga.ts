import { takeEvery } from "redux-saga/effects";
import {
  loginAction,
  registerAction,
  logoutAction,
  getAllUsersAction,
} from "./auth/authSlice";
import {
  userRegister,
  userLogin,
  logoutUser,
  getAllUsers,
} from "./auth/authSaga";

import { createColumnAction, getAllColumnsAction } from "./column/columnSlice";
import { createColumn, getColumnsData } from "./column/columnSaga";

import {
  createCardAction,
  deleteCardByIdAction,
  getAllCardsAction,
  updateCardByIdAction,
} from "./card/cardSlice";
import {
  createCard,
  deleteCardById,
  getCardData,
  updateCardById,
} from "./card/cardSaga";

import {
  uploadFileAction,
  getAllfilesAction,
  deleteFileByIdAction,
} from "./files/filesSlice";
import { deleteFileById, getFileData, uploadFile } from "./files/filesSaga";

export default function* watchDataSaga() {
  yield takeEvery(loginAction.type, userLogin);
  yield takeEvery(registerAction.type, userRegister);
  yield takeEvery(logoutAction.type, logoutUser);
  yield takeEvery(getAllUsersAction.type, getAllUsers);

  yield takeEvery(createColumnAction.type, createColumn);
  yield takeEvery(getAllColumnsAction.type, getColumnsData);

  yield takeEvery(createCardAction.type, createCard);
  yield takeEvery(getAllCardsAction.type, getCardData);
  yield takeEvery(updateCardByIdAction.type, updateCardById);
  yield takeEvery(deleteCardByIdAction.type, deleteCardById);

  yield takeEvery(uploadFileAction.type, uploadFile);
  yield takeEvery(getAllfilesAction.type, getFileData);
  yield takeEvery(deleteFileByIdAction.type, deleteFileById);
}
