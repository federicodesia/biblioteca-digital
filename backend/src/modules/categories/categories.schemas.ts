import { z } from "zod";

export const searchCategorySchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Ingresa el ID de la categoría' }),
    })
})