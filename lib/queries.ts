import { type User } from "@/types";
import prisma from "./prisma";
import { type Recipe } from "@prisma/client";

export async function getAllRecipes(): Promise<Recipe[] | null> {
  try {
    const data = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUniqueRecipe(id: string): Promise<Recipe | null> {
  try {
    const data = await prisma.recipe.findUnique({
      where: {
        id,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  try {
    const data = await prisma.user.findMany();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUniqueUser(userId: string): Promise<User | null> {
  const data = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      recipes: true,
    },
  });
  return data;
}

export async function getUserRecipes(userId: string): Promise<Recipe[]> {
  const data = await prisma.recipe.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
