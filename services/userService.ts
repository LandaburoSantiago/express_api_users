import {
  CreateUserInput,
  LoginInput,
  UpdateUserInput,
  UserLoginResponse,
  UserResponse,
} from "./../models/User";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import bcrypt from "bcryptjs";
import { codeErrors, messageErrors } from "../shared/enum-values";
import { plainToClass } from "class-transformer";

const prismaClient = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prismaClient.user.findMany();
  const hashedUsers = users.map((user) =>
    plainToClass(UserResponse, user, {
      excludeExtraneousValues: true,
    })
  );
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
      const response = plainToClass(UserResponse, user, {
        excludeExtraneousValues: true,
      });
      res.json(response);
    }
  } catch (error) {
    res.status(codeErrors.error).json({ message: messageErrors.generalError });
  }
};

// Login

export const login = async (req: Request, res: Response) => {
  const { password, phone } = plainToClass(LoginInput, req.body, {
    excludeExtraneousValues: true,
  });

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
      const response = plainToClass(
        UserLoginResponse,
        {
          ...user,
          token_type: "bearer",
          access_token: token,
        },
        {
          excludeExtraneousValues: true,
        }
      );

      res.json(response);
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
  const { name, email, password, phone, address } = plainToClass(
    CreateUserInput,
    req.body,
    {
      excludeExtraneousValues: true,
    }
  );
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

  const { name, email, password, phone, address } = plainToClass(
    UpdateUserInput,
    req.body,
    {
      excludeExtraneousValues: true,
    }
  );
  const updatedUser = {
    name,
    email,
    password: password ? bcrypt.hashSync(password, 10) : undefined,
    phone,
    address,
  };
  try {
    await prismaClient.user.update({
      where: {
        id: Number(id),
      },
      data: {
        ...updatedUser,
      },
    });
    res.status(200).json({ ...updatedUser });
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
