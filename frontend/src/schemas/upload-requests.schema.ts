import { z } from "zod";

export const createUploadRequestSchema = z.object({
    title: z.string({ required_error: 'Ingresa el título del documento' })
        .min(16, { message: 'Debe contener 16 caracteres como mínimo' })
        .max(128, { message: 'Debe contener 128 caracteres como máximo' }),

    description: z.string({ required_error: 'Ingresa la descripción del documento' })
        .min(32, { message: 'Debe contener 32 caracteres como mínimo' })
        .max(256, { message: 'Debe contener 256 caracteres como máximo' }),

    categories: z.custom((obj) => obj)
        .refine(obj => {
            const parsed = obj as { [key: string]: boolean }
            const values = Object.values(parsed)
            return values.filter(v => v === true).length <= 3
        }, 'No puedes seleccionar más de 3 categorías')
        .refine(obj => {
            const parsed = obj as { [key: string]: boolean }
            const values = Object.values(parsed)
            return values.filter(v => v === true).length > 0
        }, 'Debes seleccionar 1 categoría como mínimo'),

    document: z.instanceof(File, { message: 'Selecciona un archivo' })
        .refine(file => file.size <= 16 * 1024 * 1024, 'El tamaño máximo del archivo es 16MB')
        .refine(file => file.type === 'application/pdf', 'El archivo debe ser formato .PDF')
})

export const rejectUploadRequestSchema = z.object({
    review: z.string({ required_error: 'Ingresa el motivo por el cual se rechaza' })
        .max(128, 'Debe contener 128 caracteres como máximo')
        .optional()
})