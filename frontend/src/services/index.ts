import axios from "axios";
import useAuthStore from "../zustand/stores/auth-store";
import { accessTokenRequest } from "./auth-service";

const baseURL = 'http://localhost:3000/'

export const api = axios.create({ baseURL: baseURL })
export const refreshTokenApi = axios.create({ baseURL: baseURL })
export const accessTokenApi = axios.create({ baseURL: baseURL })

refreshTokenApi.interceptors.request.use(
    (config) => {
        if (config.headers) {
            const userSession = useAuthStore.getState().userSession
            if (userSession) config.headers['Authorization'] = `Bearer ${userSession.refreshToken}`
        }
        return config
    }
)

refreshTokenApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response?.status == 401) {
                useAuthStore.setState({ userSession: undefined })
            }
        }
        return Promise.reject(error)
    }
)

accessTokenApi.interceptors.response.use(
    (response) => response,
    async (error) => {

        if (axios.isAxiosError(error)) {
            if (error.response?.status == 401) {

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