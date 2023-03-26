import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: [],
  message: {},
};

const filesSlice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    uploadFileAction: (state, action) => {},
    uploadFileSuccesed: (state, action) => {
      state.message = action.payload;
    },
    uploadFileFailed: (state, action) => {
      state.message = action.payload;
    },

    getAllfilesAction: (state) => {},
    getAllfilesSuccesed: (state, action) => {
      state.files = action.payload;
    },
    getAllfilesFailed: (state, action) => {
      state.message = action.payload;
    },
    deleteFileByIdAction: (state, action) => {},
    deleteFileByIdSuccesed: (state, action) => {
      state.message = action.payload;
    },
    deleteFileByIdFailed: (state, action) => {
      state.message = action.payload;
    },
    filesReset: () => {
      return initialState;
    },
  },
});

export const {
  uploadFileAction,
  uploadFileSuccesed,
  uploadFileFailed,
  getAllfilesAction,
  getAllfilesSuccesed,
  getAllfilesFailed,
  deleteFileByIdAction,
  deleteFileByIdSuccesed,
  deleteFileByIdFailed,
} = filesSlice.actions;

export default filesSlice;
