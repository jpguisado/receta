import { z } from "zod";

export const daySchema = z.union([
    z.object({ order: z.literal(0), name: z.literal('MONDAY') }),
    z.object({ order: z.literal(1), name: z.literal('TUESDAY') }),
    z.object({ order: z.literal(2), name: z.literal('WEDNESDAY') }),
    z.object({ order: z.literal(3), name: z.literal('THURSDAY') }),
    z.object({ order: z.literal(4), name: z.literal('FRIDAY') }),
    z.object({ order: z.literal(5), name: z.literal('SATURDAY') }),
    z.object({ order: z.literal(6), name: z.literal('SUNDAY') }),
])
