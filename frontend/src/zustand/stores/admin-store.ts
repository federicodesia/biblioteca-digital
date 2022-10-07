import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { AccessCode, RoleType, UploadRequest, User } from "../../interfaces"
import { AccessCodesResponse, createAccessCodeRequest, CreateAccessCodeResponse, deleteAccessCodeRequest, DeleteAccessCodeResponse, fetchAccessCodesRequest } from "../../services/access-codes-service"
import { fetchUsersRequest, updateUserStatusRequest, UsersResponse, UserStatusResponse } from "../../services/users-service"
import { answerUploadRequest, AnswerUploadRequestResponse, fetchUploadRequests, SearchUploadRequestResponse } from '../../services/upload-requests'

interface AdminState {
    users: {
        items: User[]
        filters: {
            search: string
        },
        fetch: () => Promise<UsersResponse>
        search: (search: string) => void
        updateStatus: (userId: number, isActive: boolean) => Promise<UserStatusResponse>
    }
    accessCodes: {
        items: AccessCode[],
        filters: {
            search: string
        },
        fetch: () => Promise<AccessCodesResponse>
        search: (search: string) => void
        create: (role: RoleType, expiresIn: number) => Promise<CreateAccessCodeResponse>
        delete: (code: string) => Promise<DeleteAccessCodeResponse>
    }
    uploadRequests: {
        items: UploadRequest[],
        filters: {
            search: string
        },
        fetch: () => Promise<SearchUploadRequestResponse>
        search: (search: string) => void
        answer: (documentId: number, approved: boolean, review?: string) => Promise<AnswerUploadRequestResponse>
    }
}

const useAdminStore = create<AdminState>()(
    immer((set, get) => ({
        users: {
            items: [],
            filters: {
                search: ''
            },
            fetch: async () => {
                const { search } = get().users.filters
                const response = await fetchUsersRequest(search)
                if (!response.errorType) set((state) => {
                    state.users.items = response.data.users
                })
                return response
            },
            search: async (search) => {
                set((state) => { state.users.filters.search = search })
                get().users.fetch()
            },
            updateStatus: async (userId, isActive) => {
                const response = await updateUserStatusRequest({ userId, isActive })
                if (!response.errorType) get().users.fetch();
                return response
            },
        },
        accessCodes: {
            items: [],
            filters: {
                search: ''
            },
            fetch: async () => {
                const { search } = get().accessCodes.filters
                const response = await fetchAccessCodesRequest(search)
                if (!response.errorType) set((state) => {
                    state.accessCodes.items = response.data.codes
                })
                return response
            },
            search: async (search) => {
                set((state) => { state.accessCodes.filters.search = search })
                get().accessCodes.fetch()
            },
            create: async (role, expiresIn) => {
                const response = await createAccessCodeRequest({ role, expiresIn })
                if (!response.errorType) get().accessCodes.fetch()
                return response
            },
            delete: async (code) => {
                const response = await deleteAccessCodeRequest(code)
                if (!response.errorType) get().accessCodes.fetch()
                return response
            },
        },
        uploadRequests: {
            items: [],
            filters: {
                search: ''
            },
            fetch: async () => {
                const { search } = get().uploadRequests.filters
                const response = await fetchUploadRequests(search !== '' ? search : undefined)
                if (!response.errorType) set((state) => {
                    state.uploadRequests.items = response.data.uploadRequests
                })
                return response
            },
            search: async (search) => {
                set((state) => { state.uploadRequests.filters.search = search })
                get().uploadRequests.fetch()
            },
            answer: async (documentId, approved, review) => {
                const response = await answerUploadRequest({ documentId, approved, review })
                if (!response.errorType) get().uploadRequests.fetch()
                return response
            }
        }
    }))
)

export default useAdminStore