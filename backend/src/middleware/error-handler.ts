import { NextFunction, Request, Response } from 'express';
import { CustomException } from '../utils/custom-exception';
import { FormException } from '../utils/form-exception';

const errorHandler = (
    err: CustomException | FormException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(err instanceof CustomException)
    console.log(err instanceof FormException)

    if (err instanceof CustomException) return res
        .status(err?.code ?? 500)
        .json({
            errorType: 'string',
            error: err.customMessage ?? "Internal Server Error"
        })

    if (err instanceof FormException) return res
        .status(err.code)
        .json({
            errorType: 'form',
            error: err.formError
        })

    return res
        .status(500)
        .json({
            errorType: 'string',
            error: "Internal Server Error"
        })
}

export default errorHandler;