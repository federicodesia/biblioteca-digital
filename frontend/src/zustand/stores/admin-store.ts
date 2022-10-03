import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { AccessCode, RoleType, UploadRequest, User } from "../../interfaces"
import { AccessCodesResponse, createAccessCodeRequest, CreateAccessCodeResponse, deleteAccessCodeRequest, DeleteAccessCodeResponse, searchAccessCodeRequest } from "../../services/access-codes-service"
import { searchUserRequest, updateUserStatusRequest, UsersResponse, UserStatusResponse } from "../../services/users-service"
import { answerUploadRequest, AnswerUploadRequestResponse, searchUploadRequest, SearchUploadRequestResponse } from '../../services/upload-requests'

interface AdminState {
    users: {
        items: User[]
        search: (search: string) => Promise<UsersResponse>
        updateStatus: (userId: number, isActive: boolean) => Promise<UserStatusResponse>
    }
    accessCodes: {
        items: AccessCode[],
        search: (search: string) => Promise<AccessCodesResponse>
        create: (role: RoleType, expiresIn: number) => Promise<CreateAccessCodeResponse>
        delete: (code: string) => Promise<DeleteAccessCodeResponse>
    }
    uploadRequests: {
        items: UploadRequest[],
        search: (search: string) => Promise<SearchUploadRequestResponse>
        answer: (documentId: number, approved: boolean, review?: string) => Promise<AnswerUploadRequestResponse>
    }
}

const useAdminStore = create<AdminState>()(
    immer((set) => ({
        users: {
            items: [],
            search: async (search) => {
                const response = await searchUserRequest(search)
                if (!response.errorType) set((state) => {
                    state.users.items = response.data.users
                })
                return response
            },
            updateStatus: async (userId, isActive) => {
                const response = await updateUserStatusRequest({ userId, isActive })
                if (!response.errorType) {
                    const updatedUser = response.data.user
                    set((state) => {
                        state.users.items = state.users.items.map(user => user.id === updatedUser.id ? updatedUser : user)
                    })
                }
                return response
            },
        },
        accessCodes: {
            items: [],
            search: async (search) => {
                const response = await searchAccessCodeRequest(search)
                if (!response.errorType) set((state) => {
                    state.accessCodes.items = response.data.codes
                })
                return response
            },
            create: async (role, expiresIn) => {
                const response = await createAccessCodeRequest({ role, expiresIn })
                if (!response.errorType) set((state) => {
                    state.accessCodes.items.push(response.data)
                })
                return response
            },
            delete: async (code) => {
                const response = await deleteAccessCodeRequest(code)
                if (!response.errorType) set((state) => {
                    state.accessCodes.items = state.accessCodes.items.filter(c => c.code !== code)
                })
                return response
            },
        },
        uploadRequests: {
            items: [],
            search: async (search) => {
                const response = await searchUploadRequest(search)
                if (!response.errorType) set((state) => {
                    state.uploadRequests.items = response.data.uploadRequests
                })
                return response
            },
            answer: async (documentId, approved, review) => {
                const response = await answerUploadRequest({ documentId, approved, review })
                if (!response.errorType) {
                    const updated = response.data
                    set((state) => {
                        state.uploadRequests.items = state.uploadRequests.items.map(uploadRequest => {
                            return uploadRequest.id === updated.id ? updated : uploadRequest
                        })
                    })
                }
                return response
            }
        }
    }))
)

export default useAdminStore