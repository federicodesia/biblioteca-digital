import express from "express";
import "express-async-errors";
import errorHandler from "./middleware/error-handler";
import authRoutes from "./modules/auth/auth.routes";

const PORT = 3000
const app = express()

app.use(express.json())

app.use(authRoutes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))