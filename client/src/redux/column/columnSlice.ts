import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  message: {},
  loading: true,
  error: false,
};

const columnSlice = createSlice({
  name: "column",
  initialState: initialState,
  reducers: {
    createColumnAction: (state, action) => {},
    createColumnSuccesed: (state, action) => {
      state.message = action.payload;
    },
    createColumnFailed: (state, action) => {
      state.message = action.payload;
    },
    getAllColumnsAction: (state) => {
      state.loading = true;
    },
    getAllColumnsSuccesed: (state, action) => {
      state.columns = action.payload;
      state.loading = false;
      state.error = false;
    },
    getAllColumnsFailed: (state, action) => {
      state.message = action.payload;
      state.error = true;
    },
    columnsReset: () => {
      return initialState;
    },
  },
});

export const {
  createColumnAction,
  createColumnSuccesed,
  createColumnFailed,
  getAllColumnsAction,
  getAllColumnsSuccesed,
  getAllColumnsFailed,
  columnsReset,
} = columnSlice.actions;

export default columnSlice;
