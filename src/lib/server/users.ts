"use server";
import prisma from "./db";

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

export async function createUser({ email, name, password }: Omit<User, "id">) {
  "use server";
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
  return {
    message: `User ${user.name} created`,
    formData: null,
  };
}

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

export async function getUserByLogin({
  email,
  password,
}: Pick<User, "email" | "password">) {
  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  return user;
}
