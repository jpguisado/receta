import { z } from "zod";

export const mealSchema = z.union([
    z.object({ order: z.literal(0), name: z.literal('BREAKFAST') }),
    z.object({ order: z.literal(1), name: z.literal('MIDMORNING') }),
    z.object({ order: z.literal(2), name: z.literal('LUNCH') }),
    z.object({ order: z.literal(3), name: z.literal('DINNER') }),
    z.object({ order: z.literal(4), name: z.literal('SNACK') }),
    z.object({ order: z.literal(5), name: z.literal('COMPLEMENTARY') }),
])