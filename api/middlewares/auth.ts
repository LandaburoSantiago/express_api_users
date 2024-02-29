import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import moment from "moment";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const prismaClient = new PrismaClient();

  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified: JwtPayload = jwt.verify(
      token,
      process.env.TOKEN_SECRET || "secret"
    ) as JwtPayload;

    const user = await prismaClient.user.findUnique({
      where: {
        id: verified.id,
      },
    });
    if (moment().isAfter(moment(new Date(verified.expired_date)))) {
      res.status(401).json({ error: "Sesión expirada" });
    }
    if (!user) {
      res.status(401).json({ error: "token no es válido" });
    }
    next(); // continuamos
  } catch (error) {
    res.status(401).json({ error: "token no es válido" });
  }
};
