import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  cardsByColumn: [],
  card: [],
  message: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState: initialState,
  reducers: {
    createCardAction: (state, action) => {},
    createCardSuccesed: (state, action) => {
      state.message = action.payload;
    },
    createCardFailed: (state, action) => {
      state.message = action.payload;
    },

    getAllCardsAction: (state) => {},
    getAllCardsSuccesed: (state, action) => {
      state.cards = action.payload;
    },
    getAllCardsFailed: (state, action) => {
      state.message = action.payload;
    },

    getCardByIdAction: (state, action) => {},
    getCardByIdSuccesed: (state, action) => {
      state.card = action.payload;
    },
    getCardByIdFailed: (state, action) => {
      state.message = action.payload;
    },
    getAllCardsByColumIdAction: (state, action) => {},
    getAllCardsByColumIdSuccesed: (state, action) => {
      state.cardsByColumn = action.payload;
    },
    getAllCardsByColumIdFailed: (state, action) => {
      state.message = action.payload;
    },
    updateCardByIdAction: (state, action) => {},
    updateCardByIdSuccesed: (state, action) => {
      state.message = action.payload;
    },
    updateCardByIdFailed: (state, action) => {
      state.message = action.payload;
    },
    deleteCardByIdAction: (state, action) => {},
    deleteCardByIdSuccesed: (state, action) => {
      state.message = action.payload;
    },
    deleteCardByIdFailed: (state, action) => {
      state.message = action.payload;
    },

    cardsReset: () => {
      return initialState;
    },
  },
});

export const {
  createCardAction,
  createCardSuccesed,
  createCardFailed,
  getAllCardsAction,
  getAllCardsSuccesed,
  getAllCardsFailed,
  getCardByIdAction,
  getCardByIdSuccesed,
  getCardByIdFailed,
  getAllCardsByColumIdAction,
  getAllCardsByColumIdSuccesed,
  getAllCardsByColumIdFailed,
  updateCardByIdAction,
  updateCardByIdSuccesed,
  updateCardByIdFailed,
  deleteCardByIdAction,
  deleteCardByIdSuccesed,
  deleteCardByIdFailed,
  cardsReset,
} = cardSlice.actions;

export default cardSlice;
