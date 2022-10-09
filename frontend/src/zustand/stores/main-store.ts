import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { DocumentData } from "../../interfaces"
import { fetchDocuments } from '../../services/documents-service'

interface MainState {
    documents: {
        latest: {
            items: DocumentData[],
            fetch: () => void
        }
    }
}

const useMainStore = create<MainState>()(
    immer((set, get) => ({
        documents: {
            latest: {
                items: [],
                fetch: async () => {
                    const response = await fetchDocuments({ orderBy: 'publishedAt', limit: 5 })
                    if (!response.errorType) set((state) => {
                        state.documents.latest.items = response.data.documents
                    })
                },
            }
        }
    }))
)

export default useMainStore