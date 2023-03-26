import { Application } from "express";
import {
  uploadFiles,
  downloadFile,
  getAllFiles,
  deleteFile,
} from "../controllers/file.controller";
import { uploadFile } from "../middlewares/upload";
import { verifyToken } from "../middlewares/verifyToken";

export default (app: Application) => {
  app.post("/upload", verifyToken, uploadFile.single("file"), uploadFiles);
  app.get("/download/:id", verifyToken, downloadFile);
  app.get("/files", verifyToken, getAllFiles);
  app.delete("/file/:id", verifyToken, deleteFile);
};
