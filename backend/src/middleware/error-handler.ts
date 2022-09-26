import { NextFunction, Request, Response } from 'express';
import { CustomException } from '../utils/custom-exception';

const errorHandler = (
    err: CustomException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof CustomException)
        return res
            .status(err?.code ?? 500)
            .json({ error: err.customMessage ?? "Internal Server Error" })

    return res
        .status(500)
        .json({ error: "Internal Server Error" })
}

export default errorHandler;