import create from "zustand"
import { User } from "../../interfaces"
import { getUsersRequest, updateUserStatusRequest } from "../../services/users-service"
import { UsersResponse, UserStatusResponse } from "../../services/users-service/dto"

interface AdminState {
    users: User[]
    getUsers: () => Promise<UsersResponse>,
    updateUserStatus: (userId: number, isActive: boolean) => Promise<UserStatusResponse>
}

const useAdminStore = create<AdminState>()(
    (set) => ({
        users: [],
        getUsers: async () => {
            const response = await getUsersRequest()
            if (response.errorType === undefined) set({ users: response.data.users })
            return response
        },
        updateUserStatus: async (userId, isActive) => {
            const response = await updateUserStatusRequest({ userId, isActive })
            if (response.errorType === undefined) {
                const updatedUser = response.data.user
                set((state) => ({ users: state.users.map(user => user.id === updatedUser.id ? updatedUser : user) }))
            }
            return response
        },
    })
)

export default useAdminStore