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

export const getDocumentSchema = z.object({
    params: z.object({
        id: z.string({ required_error: 'Ingresa el ID del documento' })
    })
})

export const likeDislikeDocumentSchema = z.object({
    body: z.object({
        id: z.number({ required_error: 'Ingresa el ID del documento' })
            .int({ message: 'Debe ser un número entero' })
            .positive({ message: 'Debe ser un número positivo' }),
        like: z.boolean({ required_error: 'Indica si te gusta el documento' })
            .optional()
    })
})