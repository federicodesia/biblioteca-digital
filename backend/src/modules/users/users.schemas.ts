import { z } from "zod";

export const updateUserStatusSchema = z.object({
    body: z.object({
        userId: z.number({ required_error: 'Ingresa el ID de la cuenta de usuario' })
            .int({ message: 'Debe ser un número entero' })
            .min(0, { message: 'Debe ser un número positivo' }),
        
        isActive: z.boolean({ required_error: 'Ingresa el nuevo estado de la cuenta' })
    }),
})

export const searchUserSchema = z.object({
    query: z.object({
        q: z.string({ required_error: 'Ingresa el texto de búsqueda' }).optional()
    })
})