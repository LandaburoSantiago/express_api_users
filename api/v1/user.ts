import { Router } from "express";
import {
  getAllUsers,
  login,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
export const publicRouter = Router();
export const protectedRouter = Router();
publicRouter.get("/v1/users", getAllUsers);
publicRouter.post("/v1/users/login", login);
protectedRouter.get("/v1/users/:id", getUserById);
protectedRouter.post("/v1/users/createUser", createUser);
protectedRouter.put("/v1/users/updateUser/:id", updateUser);
protectedRouter.delete("/v1/users/deleteUser/:id", deleteUser);
