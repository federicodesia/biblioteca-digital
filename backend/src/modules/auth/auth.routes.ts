import { Router } from "express";
import { CustomException } from "../../utils/custom-exception";
import HTTPStatusCode from "../../utils/http-status-code";
import { schemaValidator } from "../../utils/schema-validator";
import { loginSchema, registerSchema, verifyAccessCodeSchema } from "./auth.schemas";
import authUtils from "./auth.utils";

import { prismaClient } from "../..";
import extractJwt from "../../utils/extract-jwt";

import * as bcrypt from "bcrypt";
import { authGuardRefreshToken } from "../../middleware/auth-guard";
import extractUser from "../../utils/extract-user";
import { FormException } from "../../utils/form-exception";

const router = Router()

router.post('/login', async (req, res) => {
    const { body } = await schemaValidator(loginSchema, req);
    const { email, password } = body;

    const user = await authUtils.getUser(email, { role: true })

    if (!user) throw new FormException(
        HTTPStatusCode.NOT_FOUND,
        [{ path: 'email', message: 'El correo electrónico no está registrado' }]
    )

    const matches = await bcrypt.compare(password, user.password)
    if (!matches) throw new FormException(
        HTTPStatusCode.FORBIDDEN,
        [{ path: 'password', message: 'Contraseña incorrecta' }]
    )

    const session = await authUtils.generateSession(user)
    return res.json(session)
})

router.get('/verify-access-code/:code', async (req, res) => {
    const { params } = await schemaValidator(verifyAccessCodeSchema, req);
    const accessCode = await authUtils.validateAccessCode(params.code)
    return res.json(accessCode)
})

router.post('/register', async (req, res) => {
    const { body } = await schemaValidator(registerSchema, req);
    const { code, name, lastname, email, password } = body;

    const accessCode = await authUtils.validateAccessCode(code)

    const checkEmail = await authUtils.getUser(email)
    if (checkEmail) throw new FormException(
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

router.post('/access-token', authGuardRefreshToken, async (req, res) => {
    const { user } = extractUser(req)

    const updatedUser = await authUtils.getUser(user.id, { role: true })
    if (!updatedUser) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'Usuario no encontrado'
    )

    const accessToken = await authUtils.generateAccessToken(updatedUser)
    return res.json({
        accessToken: accessToken
    })
})

router.post('/logout', authGuardRefreshToken, async (req, res) => {
    const token = extractJwt(req)

    const userSession = await prismaClient.userSession.findFirst({
        where: { token: token }
    })
    if (!userSession) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'No se encontró la sesión de usuario'
    )

    const deleteUserSession = await prismaClient.userSession.delete({
        where: { id: userSession.id }
    })

    return res.json(deleteUserSession)
})

export default router