import { z } from "zod";
import { mealSchema } from "./meals.td";
import { dishSchema } from "./dish.td";

export const plannedMealSchema = z.object({
    time: mealSchema,
    dishList: dishSchema.array()
})