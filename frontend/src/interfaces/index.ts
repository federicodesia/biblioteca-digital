export type RoleType = 'Administrador' | 'Profesor' | 'Alumno'

export interface Role {
    id: number
    name: RoleType
}

export interface User {
    id: number
    name: string
    lastname: string
    email: string
    role: Role
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface AccessCode {
    code: string
    role: Role
    createdBy: {
        id: number
        name: string
        lastname: string
    }
    createdAt: string
    timesUsed: number
    expiresAt: string
}

export interface UserSession {
    refreshToken: string
    accessToken: string
}