export const roles = ['Administrador', 'Profesor', 'Alumno'] as const

export type RoleType = typeof roles[number]

export const categories = [
    'Arte',
    'Derecho',
    'Filosofia',
    'Historia',
    'Geografia',
    'Negocios',
    'Ciencia',
    'Tecnologia'
]