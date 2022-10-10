import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { Category, DocumentData } from "../../interfaces"
import { fetchDocuments } from '../../services/documents-service'
import { fetchCategories } from '../../services/categories-service'

interface MainState {
    categories: {
        items: Category[]
        fetch: () => void
    },
    documents: {
        latest: {
            items: DocumentData[],
            fetch: () => void
        }
    }
}

const useMainStore = create<MainState>()(
    immer((set, get) => ({
        categories: {
            items: [],
            fetch: async () => {
                const response = await fetchCategories()
                if (!response.errorType) set((state) => {
                    state.categories.items = response.data.categories
                })
            },
        },
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