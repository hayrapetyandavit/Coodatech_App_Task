import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const userSelector = createSelector(selectSelf, (state) => state.user.user);
const authSelector = createSelector(selectSelf, (state) => state.user.auth);
const usersSelector = createSelector(selectSelf, (state) => state.user.users);

export { authSelector, userSelector, usersSelector };