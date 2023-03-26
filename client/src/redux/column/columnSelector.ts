import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const columnsSelector = createSelector(selectSelf, (state) => state.column.columns);
const loadingSelector = createSelector(selectSelf, (state) => state.column.loading);
const errorSelector = createSelector(selectSelf, (state) => state.column.error);
const messageSelector = createSelector(selectSelf, (state) => state.column.message);

export { columnsSelector, loadingSelector, errorSelector, messageSelector };