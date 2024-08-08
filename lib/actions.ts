"use server";

import { RecipePayload } from "@/types";
import prisma from "./prisma";
import { type Recipe } from "@prisma/client";

export async function createRecipe(body: RecipePayload) {
  await prisma.recipe.create({
    data: {
      userId: body.clerkId,
      title: body.title,
      description: body.description,
      photo: body.photo,
      ingredients: body.ingredients,
      instructions: body.instructions,
      category: body.category,
    },
  });
}

export async function getRelatedRecipes(
  category: string
): Promise<Recipe[] | null> {
  try {
    const data = await prisma.recipe.findMany({
      where: {
        category: category,
      },
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
