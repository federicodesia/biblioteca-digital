import { z } from "zod";

export const getUploadSchema = z.object({
    params: z.object({
        fileName: z.string({ required_error: 'Ingresa el nombre del archivo' })
    })
})