import { configureStore } from "@reduxjs/toolkit";
import saga from "../saga";
import createSagaMiddleware from "redux-saga";
import authSlice from "../auth/authSlice";
import columnSlice from "../column/columnSlice";
import cardSlice from "../card/cardSlice";
import fileSlice from "../files/filesSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [columnSlice.name]: columnSlice.reducer,
    [cardSlice.name]: cardSlice.reducer,
    [fileSlice.name]: fileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
