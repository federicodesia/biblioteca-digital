import { NextFunction, Request, Response } from 'express';
import { CustomException } from '../utils/custom-exception';
import extractJwt from '../utils/extract-jwt';

import jwt from "jsonwebtoken";
import envVars from '../utils/env-vars';
import HTTPStatusCode from '../utils/http-status-code';
import { prismaClient } from '..';

type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void

const authGuard = async (
    secret: string,
    verifySession: boolean,
    req: Request,
    next: NextFunction,
) => {
    const token = extractJwt(req)

    try {
        const decoded = jwt.verify(token, secret)

        if (verifySession) {
            const userSession = await prismaClient.userSession.findFirstOrThrow({
                where: { token: token }
            });
        }

        (req as any).jwtPayload = decoded
        next()
    }
    catch (e) {
        throw new CustomException(
            HTTPStatusCode.UNAUTHORIZED,
            'El token no es válido'
        );
    }
}

export const authGuardRefreshToken: Middleware = (req, _, next) => authGuard(envVars.jwtRefreshSecret, true, req, next)
export const authGuardAccessToken: Middleware = (req, _, next) => authGuard(envVars.jwtAccessSecret, false, req, next)