import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const payload: any = jwt.verify(
      refreshToken,
      authConfig.REFRESH_JWT_SECRET
    );

    if (!payload) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const accessToken = jwt.sign(
      {
        id: payload.id,
      },
      authConfig.ACCESS_JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({
      message: "success",
    });
  } catch (e) {
    return res.status(401).send({ message: "unauthenticated" });
  }
};
