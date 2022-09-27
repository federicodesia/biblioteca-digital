import { AccessCode } from "../../interfaces"

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

export type LoginResponse = FormResponseType<{
    accessToken: string
    refreshToken: string
}>

export type VerifyAccessCodeResponse = FormResponseType<AccessCode>

export type RegisterResponse = FormResponseType<{
    accessToken: string
    refreshToken: string
}>

export type ResponseType<T> = {
    errorType: 'string'
    error: string
} | {
    errorType: undefined,
    data: T
}

export type AccessTokenResponse = ResponseType<{
    accessToken: string
}>