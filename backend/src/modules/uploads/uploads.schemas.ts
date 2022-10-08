import { z } from "zod";

export const getDocumentSchema = z.object({
    params: z.object({
        fileName: z.string({ required_error: 'Ingresa el nombre del archivo' })
    })
})

export const getPreviewSchema = z.object({
    params: z.object({
        fileName: z.string({ required_error: 'Ingresa el nombre del archivo' })
    })
})