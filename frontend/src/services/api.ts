import axios, { AxiosRequestConfig } from "axios";
import envVars from "../utils/env-vars";
import useAuthStore from "../zustand/stores/auth-store";
import { accessTokenRequest } from "./auth-service";

export const baseURL = envVars.apiBaseURL

export const api = axios.create({ baseURL: baseURL })
export const refreshTokenApi = axios.create({ baseURL: baseURL })
export const accessTokenApi = axios.create({ baseURL: baseURL })

const setRequestToken = (
    config: AxiosRequestConfig<any>,
    tokenType: 'refresh' | 'access'
) => {
    if (config.headers) {
        const userSession = useAuthStore.getState().userSession
        if (userSession) {
            const { refreshToken, accessToken } = userSession
            config.headers['Authorization'] = `Bearer ${tokenType === 'refresh' ? refreshToken : accessToken}`
        }
    }
    return config
}

refreshTokenApi.interceptors.request.use(
    (config) => setRequestToken(config, 'refresh')
)

refreshTokenApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status
            if (status === 401 || status === 403) {
                useAuthStore.setState({ userSession: undefined })
            }
        }
        return Promise.reject(error)
    }
)

accessTokenApi.interceptors.request.use(
    (config) => setRequestToken(config, 'access')
)

accessTokenApi.interceptors.response.use(
    (response) => response,
    async (error) => {

        if (axios.isAxiosError(error)) {
            const status = error.response?.status
            if (status === 401 || status === 403) {

                const userSession = useAuthStore.getState().userSession
                if (userSession) {
                    const response = await accessTokenRequest()
                    if (response.errorType === undefined) {

                        const accessToken = response.data.accessToken
                        useAuthStore.setState({
                            userSession: {
                                refreshToken: userSession.refreshToken,
                                accessToken: accessToken
                            }
                        })

                        if (error.config.headers) {
                            error.config.headers['Authorization'] = `Bearer ${accessToken}`
                            return await api(error.config)
                        }
                    }
                }
            }
        }

        return Promise.reject(error)
    }
)