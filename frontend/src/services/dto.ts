export type ResponseType<T> = {
    errorType: 'string'
    error: string
} | {
    errorType: undefined,
    data: T
}