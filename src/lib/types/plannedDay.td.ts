import { z } from "zod";
import { daySchema } from "./day.td";
import { plannedMealSchema } from "./plannedMeal.td";

export const plannedDaySchema = z.object({
    day: daySchema,
    mealList: plannedMealSchema.array()
})

export const oneWeekSchema = plannedDaySchema.array();