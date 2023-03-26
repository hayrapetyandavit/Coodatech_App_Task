import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import authConfig from "../config/auth.config";
import { roles } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      res.status(400).send("Inputes are required!");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("Please Login!");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
      role: roles.USER,
    });

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!(email && password)) {
      res.status(400).send("Inputes are required!");
    }

    if (!user) {
      res.status(400).send("Invalid email or password!");
    } else {
      const compare = await bcrypt.compare(password, user.password);

      if (compare) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          authConfig.ACCESS_JWT_SECRET,
          {
            expiresIn: 3600,
          }
        );
        const refreshToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          authConfig.REFRESH_JWT_SECRET,
          {
            expiresIn: 24 * 60 * 60,
          }
        );

        res.cookie("access_token", accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).send({
          id: user.id,
          name: user.name,
          role: user.role,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).send("Logged out successfully");
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    const sendUsers = users.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      email: item.email,
    }));
    if (users) {
      res.status(200).send(sendUsers);
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to get users" });
  }
};
