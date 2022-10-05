import { z } from "zod";

export const createUploadRequestSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Ingresa el título del documento' })
            .min(16, { message: 'Debe contener 16 caracteres como mínimo' })
            .max(128, { message: 'Debe contener 128 caracteres como máximo' }),

        description: z.string({ required_error: 'Ingresa la descripción del documento' })
            .min(32, { message: 'Debe contener 32 caracteres como mínimo' })
            .max(256, { message: 'Debe contener 256 caracteres como máximo' })
    })
})

export const searchUploadRequestSchema = z.object({
    query: z.object({
        filterByUserId: z.string({ required_error: 'Ingresa el ID del usuario' }).optional(),
        q: z.string({ required_error: 'Ingresa el texto de búsqueda' }).optional(),
    })
})

export const answerUploadRequestSchema = z.object({
    body: z.object({
        documentId: z.number({ required_error: 'Ingresa el ID del documento' })
            .int({ message: 'Debe ser un número entero' })
            .min(0, { message: 'Debe ser un número positivo' }),

        approved: z.boolean({ required_error: 'Ingresa el tipo de respuesta' }),

        review: z.string({ required_error: 'Ingresa la razón por la cual es rechazado' })
            .max(128, 'Debe contener 128 caracteres como máximo')
            .optional()
    })
})