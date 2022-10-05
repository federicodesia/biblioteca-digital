import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { UploadRequest } from "../../interfaces"
import { createUploadRequest, CreateUploadRequestResponse, searchUploadRequest, SearchUploadRequestResponse } from '../../services/upload-requests'
import useAuthStore from './auth-store'

interface MainState {
    uploadRequests: {
        items: UploadRequest[],
        fetch: () => Promise<SearchUploadRequestResponse | undefined>,
        create: (title: string, description: string, document: Blob) => Promise<CreateUploadRequestResponse>
    }
}

const useMainStore = create<MainState>()(
    immer((set) => ({
        uploadRequests: {
            items: [],
            fetch: async () => {
                const { user } = useAuthStore.getState()
                if (!user) return

                const response = await searchUploadRequest(undefined, user.id)
                if (!response.errorType) set((state) => {
                    state.uploadRequests.items = response.data.uploadRequests
                })
                return response
            },
            create: async (title, description, document) => {
                const response = await createUploadRequest({ title, description, document })
                if (!response.errorType) set((state) => {
                    state.uploadRequests.items.push(response.data)
                })
                return response
            }
        }
    }))
)

export default useMainStore