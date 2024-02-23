import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

export const createDefaultUser = async () => {
  try {
    const prismaClient = new PrismaClient();

    if (process.env.DEFAULT_USER_PASSWORD) {
      const defaultUserData = {
        name: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 10),
        phone: "111111",
        address: "CALLE 123",
      };
      const user = await prismaClient.user.findFirst({
        where: {
          name: defaultUserData.name,
          password: defaultUserData.password,
        },
      });

      if (!user) {
        await prismaClient.user.create({
          data: {
            ...defaultUserData,
          },
        });
      }
    }
  } catch (error) {
    throw new Error("Error al crear el usuario por defecto");
  }
};
