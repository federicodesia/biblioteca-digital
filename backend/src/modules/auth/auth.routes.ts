import { Router } from "express";
import { schemaValidator } from "../../utils/schema-validator";
import { loginSchema, registerSchema } from "./auth.schema";

const router = Router()

router.post("/login", async (req, res) => {
    const { body } = await schemaValidator(loginSchema, req);
    const { email, password } = body;

    res.json(true)
})

router.post("/register", async (req, res) => {
    const { body } = await schemaValidator(registerSchema, req);
    const { code, name, lastname, email, password } = body;

    res.json(true)
})

export default router