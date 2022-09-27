import { Request } from 'express';
import { AnyZodObject, z, ZodError } from 'zod';
import { CustomException } from './custom-exception';
import { FormException } from './form-exception';
import HTTPStatusCode from './http-status-code';

export async function schemaValidator<T extends AnyZodObject>(
    schema: T,
    req: Request,
): Promise<z.infer<T>> {
    try {
        return await schema.parseAsync(req)
    } catch (error) {
        if (error instanceof ZodError) {
            throw new FormException(
                HTTPStatusCode.BAD_REQUEST,
                error.errors.map(e => ({
                    path: e.path.at(-1)?.toString() ?? '',
                    message: e.message
                }))
            )
        }
        throw new CustomException(HTTPStatusCode.INTERNAL_SERVER_ERROR);
    }
}