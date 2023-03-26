import { Application } from "express";
import {
  createCard,
  getAllCards,
  getCardById,
  getCardsByColumnId,
  updateCard,
  deleteCard,
} from "../controllers/card.controller";
import { verifyToken } from "../middlewares/verifyToken";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/card", verifyToken, createCard);
  app.put("/card/:id", verifyToken, updateCard);
  app.get("/cards", verifyToken, getAllCards);
  app.get("/card/:id", verifyToken, getCardById);
  app.get("/cards/column/:id", verifyToken, getCardsByColumnId);
  app.delete("/card/:id", verifyToken, deleteCard);
};
