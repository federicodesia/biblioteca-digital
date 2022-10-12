import { z } from "zod";

export const searchDocumentSchema = z.object({
    query: z.object({
        q: z.string({ required_error: 'Ingresa el texto de búsqueda' }).optional(),
        filterByUserId: z.string({ required_error: 'Ingresa el ID del usuario' }).optional(),
        filterByCategoryId: z.string({ required_error: 'Ingresa el ID de la categoría' }).optional(),
        orderBy: z.enum(
            ['publishedAt', 'downloads'],
            { errorMap: () => ({ message: 'Ingresa un campo válido para ordenar' }) }
        ).optional(),
        limit: z.string({ required_error: 'Ingresa la cantidad de resultados' }).optional()
    })
})