import { Request, Response } from "express";
import Card from "../models/card.model";
import User from "../models/user.model";

export const createCard = async (req: Request, res: Response) => {
  try {
    const { title, userId, columnId } = req.body;

    const cardData = {
      title,
      userId,
      columnId,
    };

    await Card.create(cardData);
    res.status(201).send({ message: "Card created successfuly" });
  } catch (error) {
    res.status(500).send({ message: "Failed to create card" });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { columnId, userId } = req.body;

    const cardData = {
      columnId,
    };

    const user = await User.findOne({
      where: {
        id: userId,
        role: "ADMIN",
      },
    });

    const card = await Card.findOne({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (user || card) {
      await Card.update(cardData, {
        where: {
          id: id,
        },
      });
      res.status(201).send({ message: "Card updated successfully" });
    } else {
      res.status(201).send({ message: "Permission denied" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to update card" });
  }
};

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.findAll();
    if (!cards) {
      res.status(404).send({ message: "Failed to get cards" });
    }
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: "Failed to get cards" });
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const card = await Card.findByPk(id);
    if (!card) {
      res.status(404).send({ message: "card not found" });
    }
    res.status(200).send([card]);
  } catch (error) {
    res.status(500).send({ message: "Failed to get card by Id" });
  }
};

export const getCardsByColumnId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const options = {
      columnId: id,
    };

    const cards = await Card.findAll({
      where: options,
    });
    if (!cards) {
      res.status(404).send({ message: "Cards not found" });
    }
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: "Failed to get cards by column" });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const user = await User.findOne({
      where: {
        id: userId,
        role: "ADMIN",
      },
    });

    const card = await Card.findOne({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (user || card) {
      await Card.destroy({
        where: {
          id: id,
        },
      });
      res.status(201).send({ message: "Card deleted successfully" });
    } else {
      res.status(201).send({ message: "Permission denied" });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to delete card" });
  }
};
