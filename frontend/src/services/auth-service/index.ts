import { api, refreshTokenApi } from "..";
import request from "../../utils/request";
import { AccessTokenResponse, LoginResponse, RegisterResponse, VerifyAccessCodeResponse } from "./dto";

export const loginRequest = async (data: {
    email: string,
    password: string
}) => request(() => api.post<LoginResponse>('/auth/login', data))

export const verifyAccessCodeRequest = async (
    code: string
) => request(() => api.get<VerifyAccessCodeResponse>(`/auth/verify-access-code/${code}`))

export const registerRequest = async (data: {
    code: string,
    name: string,
    lastname: string,
    email: string,
    password: string
}) => request(() => api.post<RegisterResponse>('/auth/register', data))

export const accessTokenRequest = async () => {
    return request(() => refreshTokenApi.post<AccessTokenResponse>('/auth/access-token'))
}

export const logoutRequest = async () => {
    return request(() => refreshTokenApi.post('/auth/logout'))
}