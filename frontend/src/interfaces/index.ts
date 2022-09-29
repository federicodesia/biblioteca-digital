export const roles = ['Administrador', 'Profesor', 'Alumno'] as const
export type RoleType = typeof roles[number]

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
    invitedBy?: {
        id: number
        name: string
        lastname: string
        email: string
    }
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