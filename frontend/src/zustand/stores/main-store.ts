import { immer } from 'zustand/middleware/immer'
import create from "zustand"
import { Category, DocumentData } from "../../interfaces"
import { deleteDocument, DocumentResponse, DocumentsResponse, fetchDocument, fetchDocuments, FetchDocumentsProps, likeOrDislikeDocument } from '../../services/documents-service'
import { fetchCategories, getCategory, GetCategoryResponse } from '../../services/categories-service'

interface MainState {
    categories: {
        items: Category[]
        fetch: () => void
        get: (id: number) => Promise<GetCategoryResponse>
    },
    documents: {
        fetch: (props: FetchDocumentsProps) => Promise<DocumentsResponse>
        get: (id: number) => Promise<DocumentResponse>
        delete: (id: number) => Promise<DocumentResponse>
        likeOrDislike: (id: number, like?: boolean) => Promise<DocumentResponse>
        latest: {
            items: DocumentData[],
            fetch: () => void
        }
        mostDownloaded: {
            items: DocumentData[],
            fetch: () => void
        },
        search: {
            items: DocumentData[],
            filters: {
                q: string
            },
            update: (q: string) => void
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
            fetch: async (props) => await fetchDocuments(props),
            get: async (id) => await fetchDocument(id),
            delete: async (id) => await deleteDocument(id),
            likeOrDislike: async (id, like) => await likeOrDislikeDocument({ id, like }),
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
                    const response = await fetchDocuments({ orderBy: 'downloads', limit: 3 })
                    if (!response.errorType) set((state) => {
                        state.documents.mostDownloaded.items = response.data.documents
                    })
                },
            },
            search: {
                items: [],
                filters: {
                    q: ''
                },
                update: (q: string) => {
                    set((state) => {
                        state.documents.search.filters.q = q
                        if (q === '') state.documents.search.items = []
                    })
                    if (q !== '') get().documents.search.fetch()
                },
                fetch: async () => {
                    const filters = get().documents.search.filters
                    const response = await fetchDocuments(filters)
                    if (!response.errorType) set((state) => {
                        state.documents.search.items = response.data.documents
                    })
                }
            }
        }
    }))
)

export default useMainStore