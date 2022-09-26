import create from "zustand";
import { loginRequest } from "../../services/auth-service";
import { ErrorResponse, LoginResponse } from "../../services/auth-service/dto";

interface User {
    id: number
    name: string
    lastname: string
    email: string
    role: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

interface AuthState {
    user?: User
    login: (email: string, password: string) => Promise<LoginResponse | undefined>
}

const useAuthStore = create<AuthState>((set) => ({
    user: undefined,
    login: async (email, password) => {
        const response = await loginRequest(email, password)
        return response
    }
}))

export default useAuthStore