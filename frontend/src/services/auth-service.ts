import { api, refreshTokenApi } from "./api";
import request from "../utils/request";
import { AccessCode, UserSession } from "../interfaces";
import { FormResponseType, ResponseType } from "./dto";

export type LoginResponse = FormResponseType<UserSession>
export const loginRequest = async (data: {
    email: string,
    password: string
}) => request(() => api.post<LoginResponse>('/auth/login', data))

export type VerifyAccessCodeResponse = FormResponseType<AccessCode>
export const verifyAccessCodeRequest = async (
    code: string
) => request(() => api.get<VerifyAccessCodeResponse>(`/auth/verify-access-code/${code}`))

export type RegisterResponse = FormResponseType<UserSession>
export const registerRequest = async (data: {
    code: string,
    name: string,
    lastname: string,
    email: string,
    password: string
}) => request(() => api.post<RegisterResponse>('/auth/register', data))

export type AccessTokenResponse = ResponseType<{ accessToken: string }>
export const accessTokenRequest = async () => {
    return request(() => refreshTokenApi.post<AccessTokenResponse>('/auth/access-token'))
}

export const logoutRequest = async () => {
    return request(() => refreshTokenApi.post('/auth/logout'))
}