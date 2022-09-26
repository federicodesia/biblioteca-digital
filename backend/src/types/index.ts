export const roles = ['Administrador', 'Profesor', 'Alumno'] as const

export type RoleType = typeof roles[number]