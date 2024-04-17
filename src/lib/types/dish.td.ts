import { z } from "zod";
import { ingredientSchema } from "./ingredient.td";

export const dishSchema = z.object({
  name: z.string().min(1),
  ingredients: ingredientSchema.array()
});

export const dishList = dishSchema.array();