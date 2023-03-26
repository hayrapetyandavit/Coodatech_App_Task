import { Application } from "express";
import { createColumn, getAllColums } from "../controllers/column.controller";
import { verifyToken } from "../middlewares/verifyToken";

export default (app: Application) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/column", verifyToken, createColumn);
  app.get("/columns", verifyToken, getAllColums);
};
