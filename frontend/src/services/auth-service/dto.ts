import { AccessCode } from "../../interfaces"

export interface FormError {
    path: string
    message: string
}

export type ResponseType<T> = {
    errorType: 'form',
    error: FormError[]
} | {
    errorType: 'string'
    error: string
} | {
    errorType: undefined,
    data: T
}

export type LoginResponse = ResponseType<{
    accessToken: string
    refreshToken: string
}>

export type VerifyAccessCodeResponse = ResponseType<AccessCode>

export type RegisterResponse = ResponseType<{
    accessToken: string
    refreshToken: string
}>