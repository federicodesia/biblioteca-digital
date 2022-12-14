import { Prisma, User } from "@prisma/client"
import { prismaClient } from "../..";
import excludeKey from "../../utils/exclude-key";

import jwt from "jsonwebtoken";
import envVars from "../../utils/env-vars";
import HTTPStatusCode from "../../utils/http-status-code";
import { RoleType } from "../../types";
import { FormException } from "../../utils/form-exception";
import { CustomException } from "../../utils/custom-exception";

export type JWTPayload = {
    user: Prisma.UserGetPayload<{ include: { role: true } }>
}

const getUser = async <Include extends Prisma.UserInclude>(
    idOrEmail: string | number,
    include?: Include
) => {
    return await prismaClient.user.findFirst({
        where: typeof idOrEmail === 'number'
            ? { id: idOrEmail }
            : { email: idOrEmail },
        include
    }) as Prisma.UserGetPayload<{ include: Include }> | null
}

const generateAccessToken = async (
    user: Prisma.UserGetPayload<{ include: { role: true } }>
) => {
    if (!user.isActive) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'La cuenta se encuentra deshabilitada'
    )

    const userWithoutPassword = excludeKey(user, 'password')
    return jwt.sign(
        { user: userWithoutPassword },
        envVars.jwtAccessSecret,
        {
            expiresIn: '5m'
        }
    )
}

const generateRefreshToken = async (user: User) => {
    const userWithoutPassword = excludeKey(user, 'password')
    return jwt.sign(
        { user: userWithoutPassword },
        envVars.jwtRefreshSecret
    )
}

const generateSession = async (
    user: Prisma.UserGetPayload<{ include: { role: true } }>
) => {
    const refreshToken = await generateRefreshToken(user)

    const session = await prismaClient.userSession.create({
        data: {
            token: refreshToken,
            user: {
                connect: { id: user.id }
            }
        }
    })

    return {
        accessToken: await generateAccessToken(user),
        refreshToken: session.token
    }
}

const validateAccessCode = async (code: string) => {
    const accessCode = await prismaClient.accessCode.findUnique({
        where: { code: code },
        include: { role: true }
    })

    if (!accessCode) throw new FormException(
        HTTPStatusCode.NOT_FOUND,
        [{ path: 'code', message: 'El c??digo de acceso no es v??lido' }]
    )

    if (accessCode.expiresAt < new Date()) throw new FormException(
        HTTPStatusCode.CONFLICT,
        [{ path: 'code', message: 'El c??digo de acceso est?? expirado' }]
    )

    const accessCodeRole = accessCode.role.name as RoleType
    if (accessCodeRole !== 'Alumno' && accessCode.timesUsed > 0) throw new FormException(
        HTTPStatusCode.CONFLICT,
        [{ path: 'code', message: 'El c??digo de acceso ya fue utilizado' }]
    )

    return accessCode
}

const authUtils = {
    getUser,
    generateAccessToken,
    generateRefreshToken,
    generateSession,
    validateAccessCode
}

export default authUtils