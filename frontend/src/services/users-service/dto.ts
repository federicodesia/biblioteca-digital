import { User } from "../../interfaces"
import { ResponseType } from "../dto"

export type UsersResponse = ResponseType<{
    users: User[]
}>

export type UserStatusResponse = ResponseType<{
    user: User
}>