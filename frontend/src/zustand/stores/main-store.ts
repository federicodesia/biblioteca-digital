import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { Category, DocumentData } from "../../interfaces"
import { DocumentsResponse, fetchDocuments, FetchDocumentsProps } from '../../services/documents-service'
import { fetchCategories, getCategory, GetCategoryResponse } from '../../services/categories-service'

interface MainState {
    categories: {
        items: Category[]
        fetch: () => void
        get: (id: number) => Promise<GetCategoryResponse>
    },
    documents: {
        fetch: (props: FetchDocumentsProps) => Promise<DocumentsResponse>
        latest: {
            items: DocumentData[],
            fetch: () => void
        }
        mostDownloaded: {
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
            get: async (id) => {
                return await getCategory(id)
            }
        },
        documents: {
            fetch: async (props) => {
                return await fetchDocuments(props)
            },
            latest: {
                items: [],
                fetch: async () => {
                    const response = await fetchDocuments({ orderBy: 'publishedAt', limit: 3 })
                    if (!response.errorType) set((state) => {
                        state.documents.latest.items = response.data.documents
                    })
                },
            },
            mostDownloaded: {
                items: [],
                fetch: async () => {
                    const response = await fetchDocuments({ orderBy: 'downloads', limit: 4 })
                    if (!response.errorType) set((state) => {
                        state.documents.mostDownloaded.items = response.data.documents
                    })
                },
            }
        }
    }))
)

export default useMainStore