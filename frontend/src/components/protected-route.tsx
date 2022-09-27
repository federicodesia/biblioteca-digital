import { Navigate, Outlet } from "react-router-dom"
import { RoleType } from "../interfaces"
import useAuthStore from "../zustand/stores/auth-store"

interface ProtectedRouteProps {
    requiresAuth?: boolean,
    requiredRoles?: RoleType[],
    navegateTo?: string
}

const ProtectedRoute = ({
    requiresAuth = true,
    requiredRoles,
    navegateTo = '/'
}: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user)
    const isAuth = user !== undefined

    const hasRole = requiredRoles?.some(r => r === user?.role.name) ?? true
    const hasPermissions = hasRole && (isAuth === requiresAuth)
    return hasPermissions ? <Outlet /> : <Navigate to={navegateTo} />
}

export default ProtectedRoute