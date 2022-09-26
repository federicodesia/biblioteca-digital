import { Router } from "express";
import { CustomException } from "../../utils/custom-exception";
import HTTPStatusCode from "../../utils/http-status-code";
import { schemaValidator } from "../../utils/schema-validator";
import { loginSchema, registerSchema, verifyAccessCodeSchema } from "./auth.schema";
import authUtils, { JWTPayload } from "./auth.utils";

import { prismaClient } from "../..";
import extractJwt from "../../utils/extract-jwt";

import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envVars from "../../utils/env-vars";

const router = Router()

router.post('/login', async (req, res) => {
    const { body } = await schemaValidator(loginSchema, req);
    const { email, password } = body;

    const user = await authUtils.getUser(email, { role: true })

    if (!user) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        [{ path: 'email', message: 'El correo electrónico no está registrado' }]
    )

    const matches = await bcrypt.compare(password, user.password)
    if (!matches) throw new CustomException(
        HTTPStatusCode.FORBIDDEN,
        [{ path: 'email', message: 'Contraseña incorrecta' }]
    )

    const session = await authUtils.generateSession(user)
    return res.json(session)
})

router.get('/verify-access-code', async (req, res) => {
    const { body } = await schemaValidator(verifyAccessCodeSchema, req);
    const accessCode = await authUtils.validateAccessCode(body.code)
    return res.json(accessCode)
})

router.post('/register', async (req, res) => {
    const { body } = await schemaValidator(registerSchema, req);
    const { code, name, lastname, email, password } = body;

    const accessCode = await authUtils.validateAccessCode(code)

    const checkEmail = await authUtils.getUser(email)
    if (checkEmail) throw new CustomException(
        HTTPStatusCode.CONFLICT,
        [{ path: 'email', message: 'El correo electrónico ya está en uso' }]
    )

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prismaClient.user.create({
        data: {
            name: name,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            role: {
                connect: { id: accessCode.roleId }
            }
        },
        include: { role: true }
    })

    const updatedAccessCode = await prismaClient.accessCode.update({
        where: { code: code },
        data: { timesUsed: { increment: 1 } }
    })

    const session = await authUtils.generateSession(user)
    return res.json(session)
})

router.post('/access-token', async (req, res) => {
    const token = extractJwt(req)

    jwt.verify(token, envVars.jwtRefreshSecret, async (error, decoded) => {

        if (error) throw new CustomException(
            HTTPStatusCode.UNAUTHORIZED,
            'El token no es válido'
        )

        const payload = decoded as JWTPayload
        const user = await authUtils.getUser(payload.user.id, { role: true })

        if (!user) throw new CustomException(
            HTTPStatusCode.NOT_FOUND,
            'Usuario no encontrado'
        )

        const accessToken = await authUtils.generateAccessToken(user)
        return res.json(accessToken)
    })
})

export default router