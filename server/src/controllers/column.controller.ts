import { Request, Response } from "express";
import Column from "../models/column.model";

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const columnData = {
      title,
    };

    await Column.create(columnData);
    res.status(201).send({ message: "Column created successfuly" });
  } catch (error) {
    res.status(500).send({ message: "Failed to create column" });
  }
};

export const getAllColums = async (req: Request, res: Response) => {
  try {
    const columns = await Column.findAll();
    if (!columns) {
      return res.status(404).send({ message: "Columns not found" });
    }
    res.status(200).send(columns);
  } catch (error) {
    res.status(500).send({ message: "Get all columns failed" });
  }
};
