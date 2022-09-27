import create from "zustand";
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { User, UserSession } from "../../interfaces";
import { loginRequest, logoutRequest, registerRequest, verifyAccessCodeRequest } from "../../services/auth-service";
import { LoginResponse, RegisterResponse, VerifyAccessCodeResponse } from "../../services/auth-service/dto";
import jwt_decode from "jwt-decode";

interface AuthState {
    user?: User
    userSession?: UserSession,
    login: (email: string, password: string) => Promise<LoginResponse>,
    verifyAccessCode: (code: string) => Promise<VerifyAccessCodeResponse>,
    register: (code: string, name: string, lastname: string, email: string, password: string) => Promise<RegisterResponse>,
    logout: () => void
}

const useAuthStore = create<AuthState>()(
    persist(
        subscribeWithSelector(
            (set) => ({
                user: undefined,
                userSession: undefined,
                login: async (email, password) => {
                    const response = await loginRequest({ email, password })
                    if (response.errorType === undefined) set({ userSession: response.data })
                    return response
                },
                verifyAccessCode: async (code) => {
                    return await verifyAccessCodeRequest(code)
                },
                register: async (code, name, lastname, email, password) => {
                    const response = await registerRequest({ code, name, lastname, email, password })
                    if (response.errorType === undefined) set({ userSession: response.data })
                    return response
                },
                logout: () => {
                    logoutRequest()
                    set({ userSession: undefined })
                }
            })
        ),
        {
            name: 'auth-storage'
        }
    )

)

const unsubUserSession = useAuthStore.subscribe(
    (state) => state.userSession,
    (userSession) => {
        if (!userSession) return useAuthStore.setState({ user: undefined })

        const decoded = jwt_decode<{ user: User }>(userSession.accessToken)
        useAuthStore.setState({ user: decoded.user })
    }
)

export default useAuthStore