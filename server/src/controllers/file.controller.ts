import { Request, Response } from "express";
import fs from "fs";
import File from "../models/file.model";
import path from "path";
import download from "download";
import User from "../models/user.model";
import Card from "../models/card.model";

const __basedir = path.resolve();

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const { userId, cardId } = req.body;
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    const admin = await User.findOne({
      where: {
        id: userId,
        role: "ADMIN",
      },
    });

    const card = await Card.findByPk(cardId);

    const auth = +userId === card?.dataValues.userId || admin ? true : false;

    if (req.file.size > 150000) {
      return res.status(201).send({ message: "Large file size" });
    }

    if (auth) {
      const fileData = {
        type: req.file.mimetype,
        name: req.file.originalname,
        size: req.file.size,
        data: fs.readFileSync(
          __basedir + "/assets/uploads/" + req.file.filename
        ),
        userId: userId,
        cardId: cardId,
      };

      await File.create(fileData).then((file) => {
        fs.writeFileSync(__basedir + "/assets/tmp/" + file.name, file.data);
      });
    } else {
      res.status(201).send({ message: "Permission denied" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error when trying upload files" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const file = await File.findOne({
      where: {
        id: id,
      },
    });

    const filePath = __basedir + "/assets/tmp/" + file?.dataValues.name;

    res.download(filePath);
  } catch (error) {
    res.status(500).send({ message: "File download failed" });
  }
};

export const getAllFiles = async (req: Request, res: Response) => {
  try {
    const files = await File.findAll();
    const sedFiles = files.map((item) => ({
      id: item.id,
      name: item.name,
      userId: item.userId,
      cardId: item.cardId,
    }));

    if (files) {
      res.status(200).send(sedFiles);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to get Files" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
        role: "ADMIN",
      },
    });

    const file = await File.findOne({
      where: {
        userId: userId,
        id: id,
      },
    });

    const fileName = file?.dataValues.name;
    const directoryPath = __basedir + "/assets/tmp/";

    if (user || file) {
      await File.destroy({
        where: {
          id: id,
        },
      });

      fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the file. " + err,
          });
        }
      });

      res.status(200).send({ message: "File deleted successfully" });
    } else {
      res.status(200).send({ message: "Permission denied" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete file" });
  }
};
