import { type Recipe } from "@prisma/client";

export interface User {
  username: string;
  firstname: string;
  lastname?: string;
  photo: string;
  clerkId: string;
  recipes: Recipe[];
}

export interface RecipePayload {
  clerkId: string;
  category: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  photo: string;
  title: string;
}
