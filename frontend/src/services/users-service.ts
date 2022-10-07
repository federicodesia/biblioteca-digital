import { accessTokenApi } from "./api"
import request from "../utils/request"
import { ResponseType } from "./dto"
import { User } from "../interfaces"

export type UsersResponse = ResponseType<{users: User[]}>
export const fetchUsersRequest = async (search: string) => {
    return await request(() => accessTokenApi.get<UsersResponse>('/users', {
        params: search !== '' ? { q: search } : {}
    }))
}

export type UserStatusResponse = ResponseType<{user: User}>
export const updateUserStatusRequest = async (data: {
    userId: number,
    isActive: boolean
}) => {
    return await request(() => accessTokenApi.patch<UserStatusResponse>('/users/update-user-status', data))
}