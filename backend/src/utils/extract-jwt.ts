import { Request } from "express";
import { CustomException } from "./custom-exception";
import HTTPStatusCode from "./http-status-code";

export default (req: Request) => {
    const authorization = req.headers.authorization

    if (!authorization?.startsWith('Bearer ')) throw new CustomException(
        HTTPStatusCode.UNAUTHORIZED,
        'Debes autenticarte para realizar esta acción'
    )

    return authorization.substring(7, authorization.length)
}