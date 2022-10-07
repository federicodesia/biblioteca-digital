import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { DocumentData, UploadRequest } from "../../interfaces"
import { createUploadRequest, CreateUploadRequestResponse, fetchUploadRequests, UploadRequestResponse } from '../../services/upload-requests'
import useAuthStore from './auth-store'
import { DocumentsResponse, fetchDocuments } from '../../services/documents-service'

interface MainState {
    uploadRequests: {
        items: UploadRequest[],
        fetch: () => Promise<UploadRequestResponse | undefined>,
        create: (title: string, description: string, document: Blob) => Promise<CreateUploadRequestResponse>
    },
    documents: {
        items: DocumentData[]
        fetch: () => Promise<DocumentsResponse | undefined>,
    }
}

const useMainStore = create<MainState>()(
    immer((set, get) => ({
        uploadRequests: {
            items: [],
            fetch: async () => {
                const { user } = useAuthStore.getState()
                if (!user) return

                const response = await fetchUploadRequests(undefined, user.id)
                if (!response.errorType) set((state) => {
                    const items = response.data.uploadRequests.filter(u => u.status.name !== 'Aceptado')
                    state.uploadRequests.items = items
                })
                return response
            },
            create: async (title, description, document) => {
                const response = await createUploadRequest({ title, description, document })
                if (!response.errorType) get().uploadRequests.fetch()
                return response
            }
        },
        documents: {
            items: [],
            fetch: async () => {
                const { user } = useAuthStore.getState()
                if (!user) return

                const response = await fetchDocuments(undefined, user.id)
                if (!response.errorType) set((state) => {
                    state.documents.items = response.data.documents
                })
                return response
            },
        }
    }))
)

export default useMainStore