import { accessTokenApi } from "../api"
import request from "../../utils/request"
import { UsersResponse, UserStatusResponse } from "./dto"

export const searchUserRequest = async (search: string) => {
    return await request(() => accessTokenApi.get<UsersResponse>('/users', {
        params: search !== '' ? { q: search } : {}
    }))
}

export const updateUserStatusRequest = async (data: {
    userId: number,
    isActive: boolean
}) => {
    return await request(() => accessTokenApi.patch<UserStatusResponse>('/users/update-user-status', data))
}