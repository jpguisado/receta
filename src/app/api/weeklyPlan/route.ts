import { db } from "@/db";
import { daySchema } from "@/lib/types/day.td";
import { dishSchema } from "@/lib/types/dish.td";
import { mealSchema } from "@/lib/types/meals.td";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { week, day, meal, dish } = z.object({
            week: z.object({weekNumber: z.number()}),
            day: daySchema,
            meal: mealSchema,
            dish: dishSchema.array(),
        }).parse(body);
        await db.weeklyPlan.create({
            data: {
                meal: meal!                
            },
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
    }
}