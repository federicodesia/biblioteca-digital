import create from "zustand"
import { AccessCode, RoleType, User } from "../../interfaces"
import { AccessCodesResponse, createAccessCodeRequest, CreateAccessCodeResponse, deleteAccessCodeRequest, DeleteAccessCodeResponse, searchAccessCodeRequest } from "../../services/access-codes-service"
import { searchUserRequest, updateUserStatusRequest, UsersResponse, UserStatusResponse } from "../../services/users-service"

interface AdminState {
    users: User[]
    accessCodes: AccessCode[]
    searchUser: (search: string) => Promise<UsersResponse>
    updateUserStatus: (userId: number, isActive: boolean) => Promise<UserStatusResponse>
    searchAccessCode: (search: string) => Promise<AccessCodesResponse>
    createAccessCode: (role: RoleType, expiresIn: number) => Promise<CreateAccessCodeResponse>
    deleteAccessCode: (code: string) => Promise<DeleteAccessCodeResponse>
}

const useAdminStore = create<AdminState>()(
    (set) => ({
        users: [],
        accessCodes: [],
        searchUser: async (search) => {
            const response = await searchUserRequest(search)
            if (response.errorType === undefined) set({ users: response.data.users })
            return response
        },
        updateUserStatus: async (userId, isActive) => {
            const response = await updateUserStatusRequest({ userId, isActive })
            if (response.errorType === undefined) {
                const updatedUser = response.data.user
                set((state) => ({
                    users: state.users.map(user => user.id === updatedUser.id ? updatedUser : user)
                }))
            }
            return response
        },
        searchAccessCode: async (search) => {
            const response = await searchAccessCodeRequest(search)
            if (response.errorType === undefined) set({
                accessCodes: response.data.codes
            })
            return response
        },
        createAccessCode: async (role, expiresIn) => {
            const response = await createAccessCodeRequest({ role, expiresIn })
            if (response.errorType === undefined) set((state) => ({
                accessCodes: [...state.accessCodes, response.data]
            }))
            return response
        },
        deleteAccessCode: async (code) => {
            const response = await deleteAccessCodeRequest(code)
            if (response.errorType === undefined) set((state) => ({
                accessCodes: state.accessCodes.filter(c => c.code !== code)
            }))
            return response
        }
    })
)

export default useAdminStore