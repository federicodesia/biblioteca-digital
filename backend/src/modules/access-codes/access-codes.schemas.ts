import { z } from "zod";
import { roles } from "../../types";

export const createAccessCodeSchema = z.object({
    body: z.object({
        role: z
            .enum(roles, { required_error: 'El rol ingresado no existe' }),

        expiresIn: z
            .number({ required_error: 'Ingresa la cantidad de días en que expirará' })
            .int({ message: 'Debe ser un número entero' })
            .min(1, { message: 'Debe ser como mínimo 1 día' })
            .max(7, { message: 'Debe ser como máximo 7 días' })
    }),
})

export const searchAccessCodeSchema = z.object({
    query: z.object({
        q: z.string({ required_error: 'Ingresa el texto de búsqueda' }).optional()
    })
})

export const deleteAccessCodeSchema = z.object({
    params: z.object({
        code: z
            .string({ required_error: "Ingresa el código de acceso" })
            .length(5, { message: "Debe contener 5 caracteres" })
    })
})