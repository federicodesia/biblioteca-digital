import { z } from "zod";

export const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Ingresa tu correo electrónico' })
            .email({ message: 'Ingresa un correo electrónico válido' }),

        password: z.string({ required_error: 'Ingresa tu contraseña' })
            .min(8, { message: 'Debe contener como mínimo 8 caracteres' })
            .max(32, { message: 'Debe contener como máximo 32 caracteres' })
    }),
})

export const verifyAccessCodeSchema = z.object({
    body: z.object({
        code: z.string({ required_error: "Ingresa el código de acceso" })
            .length(5, { message: "Debe contener 5 caracteres" }),
    }),
})

export const registerSchema = z.object({
    body: z.object({
        code: z.string({ required_error: "Ingresa el código de acceso" })
            .length(5, { message: "Debe contener 5 caracteres" }),

        name: z.string({ required_error: 'Ingresa tu nombre' })
            .min(4, { message: 'Debe contener como mínimo 4 caracteres' })
            .max(32, { message: 'Debe contener como máximo 32 caracteres' }),

        lastname: z.string({ required_error: 'Ingresa tu apellido' })
            .min(4, { message: 'Debe contener como mínimo 4 caracteres' })
            .max(32, { message: 'Debe contener como máximo 32 caracteres' }),

        email: z.string({ required_error: 'Ingresa tu correo electrónico' })
            .email({ message: 'Ingresa un correo electrónico válido' }),

        password: z.string({ required_error: 'Ingresa tu contraseña' })
            .min(8, { message: 'Debe contener como mínimo 8 caracteres' })
            .max(32, { message: 'Debe contener como máximo 32 caracteres' })
    }),
})