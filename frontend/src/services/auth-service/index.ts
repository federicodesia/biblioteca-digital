import axios, { AxiosResponse } from "axios";
import { LoginResponse, RegisterResponse, VerifyAccessCodeResponse } from "./dto";

const api = axios.create({ baseURL: 'http://localhost:3000/auth' })

const request = async <T>(
    fn: () => Promise<AxiosResponse<T, any>>
) => {
    try {
        const response = await fn()
        return {
            errorType: undefined,
            data: response.data
        } as T
    }
    catch (e) {
        if (axios.isAxiosError(e)) return e.response?.data as T
        return { errorType: 'string', error: 'Unknown error' } as T
    }
}

export const loginRequest = async (data: {
    email: string,
    password: string
}) => request(() => api.post<LoginResponse>('/login', data))

export const verifyAccessCodeRequest = async (
    code: string
) => request(() => api.get<VerifyAccessCodeResponse>(`/verify-access-code/${code}`))

export const registerRequest = async (data: {
    code: string,
    name: string,
    lastname: string,
    email: string,
    password: string
}) => request(() => api.post<RegisterResponse>('/register', data))

export const logoutRequest = async () => {
    await api.post('/logout')
}