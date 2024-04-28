import { db } from "@/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name } = z.object({
            name: z.string().min(1)
        }).parse(body);
        await db.ingredient.create({
            data: {
                name: name,
            },
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
    }
}