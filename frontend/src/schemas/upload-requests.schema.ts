import { z } from "zod";

export const createUploadRequestSchema = z.object({
    title: z.string({ required_error: 'Ingresa el título del documento' })
        .min(16, { message: 'Debe contener 16 caracteres como mínimo' })
        .max(128, { message: 'Debe contener 128 caracteres como máximo' }),

    description: z.string({ required_error: 'Ingresa la descripción del documento' })
        .min(32, { message: 'Debe contener 32 caracteres como mínimo' })
        .max(256, { message: 'Debe contener 256 caracteres como máximo' })
})

export const uploadRequestFileSchema = z.object({
    file: z.any({ required_error: 'Selecciona un archivo PDF' })
})

export const rejectUploadRequestSchema = z.object({
    review: z.string({ required_error: 'Ingresa el motivo por el cual se rechaza' })
        .max(128, 'Debe contener 128 caracteres como máximo')
        .optional()
})