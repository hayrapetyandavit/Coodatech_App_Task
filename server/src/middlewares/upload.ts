import { Request } from "express";
import multer from "multer";
import path from "path";

const __basedir = path.resolve();

const filter = (req: Request, file: any, cb: any) => {
  const fileTypes = /jpeg|jpg|png|gif|pdf|mp4/;
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-uploadedfile-${file.originalname}`);
  },
});

export const uploadFile = multer({ storage: storage, fileFilter: filter });
