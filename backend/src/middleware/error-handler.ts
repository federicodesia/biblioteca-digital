import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { CustomException } from '../utils/custom-exception';
import { FormException } from '../utils/form-exception';
import HTTPStatusCode from '../utils/http-status-code';

const errorHandler = (
    err: CustomException | FormException | Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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

    if (err instanceof MulterError) {
        const { field, code, message } = err
        return res
            .status(HTTPStatusCode.NOT_ACCEPTABLE)
            .json({
                errorType: 'form',
                error: [{
                    path: field,
                    message: code === 'LIMIT_FILE_SIZE'
                        ? 'El tamaño del archivo es demasiado grande'
                        : message
                }]
            })
    }

    return res
        .status(500)
        .json({
            errorType: 'string',
            error: "Internal Server Error"
        })
}

export default errorHandler;