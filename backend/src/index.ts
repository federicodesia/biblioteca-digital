import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import "express-async-errors";
import errorHandler from "./middleware/error-handler";
import authRoutes from "./modules/auth/auth.routes";

const PORT = 3000
const app = express()

export const prismaClient = new PrismaClient();

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))