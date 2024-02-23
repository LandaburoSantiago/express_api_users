import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcryptjs";
import { codeErrors, messageErrors } from "../shared/enum-values";

const prismaClient = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany();
  const hashedUsers = users.map((user) => ({
    ...user,
    password: undefined,
  }));
  res.json(hashedUsers);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      res
        .status(codeErrors.error)
        .json({ message: messageErrors.userNotFound });
    } else {
      res.json({ ...user, password: undefined });
    }
  } catch (error) {
    res.status(codeErrors.error).json({ message: messageErrors.generalError });
  }
};

// Login

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        phone,
      },
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          name: user.name,
          id: user.id,
          expired_date: moment().add(5, "d").toString(),
        },
        process.env.TOKEN_SECRET || "secreto"
      );
      res.json({
        ...user,
        password: undefined,
        token_type: "bearer",
        access_token: token,
      });
    } else {
      res
        .status(codeErrors.error)
        .json({ message: messageErrors.invalidCredentials });
    }
  } catch (error) {
    res
      .status(codeErrors.error)
      .json({ message: messageErrors.invalidCredentials });
  }
};

// Signup
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    res.status(codeErrors.error).json({ message: messageErrors.missingParams });
  }
  const newUser = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    phone,
    address,
  };
  try {
    await prismaClient.user.create({
      data: {
        ...newUser,
      },
    });
    res.status(200).json({ ...newUser });
  } catch (error) {
    res
      .status(codeErrors.error)
      .json({ message: messageErrors.createUserError });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, phone, address } = req.body;
  const newUser = {
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    phone,
    address,
  };
  try {
    await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data: {
        ...newUser,
      },
    });
    res.status(200).json({ ...newUser });
  } catch (error) {
    res
      .status(codeErrors.error)
      .json({ message: messageErrors.createUserError });
  }
};

// // Delete user by email
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prismaClient.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).json({ message: "OK" });
  } catch (error) {
    res.status(codeErrors.error).json({ message: messageErrors.userNotFound });
  }
};
