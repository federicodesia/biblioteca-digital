import { NextFunction, Request, Response } from 'express';
import { CustomException } from '../utils/custom-exception';
import extractJwt from '../utils/extract-jwt';

import jwt from "jsonwebtoken";
import envVars from '../utils/env-vars';
import HTTPStatusCode from '../utils/http-status-code';

type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void

const authGuard = (
    secret: string,
    req: Request,
    next: NextFunction,
) => {
    const token = extractJwt(req)

    jwt.verify(token, secret, (error, decoded) => {
        if (error) throw new CustomException(
            HTTPStatusCode.UNAUTHORIZED,
            'El token no es válido'
        );

        (req as any).jwtPayload = decoded
        next()
    })
}

export const authGuardRefreshToken: Middleware = (req, _, next) => authGuard(envVars.jwtRefreshSecret, req, next)
export const authGuardAccessToken: Middleware = (req, _, next) => authGuard(envVars.jwtAccessSecret, req, next)