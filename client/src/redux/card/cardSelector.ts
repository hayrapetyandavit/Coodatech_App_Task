import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const cardsSelector = createSelector(selectSelf, (state) => state.card.cards);
const cardsByColSelector = createSelector(selectSelf, (state) => state.card.cardsByColumn);
const messageSelector = createSelector(selectSelf, (state) => state.column.message);

export { cardsSelector, cardsByColSelector, messageSelector };