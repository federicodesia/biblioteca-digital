import { RoleType } from "../../interfaces"
import request from "../../utils/request"
import { accessTokenApi } from "../api"
import { AccessCodesResponse, CreateAccessCodeResponse, DeleteAccessCodeResponse } from "./dto"

export const searchAccessCodeRequest = async (search: string) => {
    return await request(() => accessTokenApi.get<AccessCodesResponse>('/access-codes', {
        params: search !== '' ? { q: search } : {}
    }))
}

export const createAccessCodeRequest = async (data: { role: RoleType, expiresIn: number }) => {
    return await request(() => accessTokenApi.post<CreateAccessCodeResponse>('/access-codes', data))
}

export const deleteAccessCodeRequest = async (code: string) => {
    return await request(() => accessTokenApi.delete<DeleteAccessCodeResponse>(`/access-codes/${code}`))
}