import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { UploadRequest } from "../../interfaces"
import { createUploadRequest, CreateUploadRequestResponse } from '../../services/upload-requests'

interface MainState {
    uploadRequests: {
        items: UploadRequest[],
        create: (title: string, description: string, document: Blob) => Promise<CreateUploadRequestResponse>
    }
}

const useMainStore = create<MainState>()(
    immer((set) => ({
        uploadRequests: {
            items: [],
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