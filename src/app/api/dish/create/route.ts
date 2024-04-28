import { db } from "@/db";
import { dishSchema } from "@/lib/types/dish.td";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, ingredients } = dishSchema.parse(body);
        console.log(name, ingredients)
        await db.dish.create({
            data: {
                name: name,
                ingredients: {
                    create: ingredients
                },
            }
        })
        return new NextResponse('OK');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        else {
            console.log(error)
        }
    }
}