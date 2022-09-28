import { Request } from "express"
import { RoleType } from "../types"
import { CustomException } from "./custom-exception"
import extractUser from "./extract-user"
import HTTPStatusCode from "./http-status-code"

const throwException = () => {
    throw new CustomException(
        HTTPStatusCode.UNAUTHORIZED,
        'No tienes permisos para realizar esta acción'
    )
}

type Payload = RoleType | Request

type Props = (
    roles: RoleType[],
    payload: Payload
) => void

const getRole = (payload: Payload) => {
    if (typeof payload === 'string') return payload
    return extractUser(payload).userRole
}

export const validateRole: Props = (roles, payload) => {
    const currentRole = getRole(payload)
    if (!roles.some(r => r === currentRole)) throwException()
}

export const excludeRole: Props = (roles, payload) => {
    const currentRole = getRole(payload)
    if (roles.some(r => r === currentRole)) throwException()
}