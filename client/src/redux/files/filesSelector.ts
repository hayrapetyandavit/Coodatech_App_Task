import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const filesSelector = createSelector(selectSelf, (state) => state.files.files);

export { filesSelector};