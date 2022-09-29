import { z } from "zod";
import { roles } from "../interfaces";

export const generateAccessCodeSchema = z.object({
    role: z.enum(roles, { errorMap: () => ({ message: 'Selecciona un tipo de usuario' }) })
})