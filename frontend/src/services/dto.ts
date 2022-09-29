export type ResponseType<T> = {
    errorType: 'string'
    error: string
} | {
    errorType: undefined,
    data: T
}

export interface FormError {
    path: string
    message: string
}

export type FormResponseType<T> = {
    errorType: 'form',
    error: FormError[]
} | {
    errorType: 'string'
    error: string
} | {
    errorType: undefined,
    data: T
}