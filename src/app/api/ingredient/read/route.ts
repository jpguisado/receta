import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
    try {
        const data = await db.ingredient.findMany()
        const json = JSON.stringify(data)
        return new NextResponse(JSON.stringify(json))
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
    }
}