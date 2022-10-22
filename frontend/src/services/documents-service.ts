import { DocumentData } from "../interfaces"
import request from "../utils/request"
import { accessTokenApi } from "./api"
import { ResponseType } from "./dto"

export type DocumentsResponse = ResponseType<{ documents: DocumentData[] }>

export type FetchDocumentsProps = {
    q?: string,
    filterByUserId?: number
    filterByCategoryId?: number
    orderBy?: 'publishedAt' | 'downloads'
    limit?: number
}

export const fetchDocuments = async (params: FetchDocumentsProps) => {
    return await request(() => accessTokenApi.get<DocumentsResponse>('/documents', {
        params: params
    }))
}

export type DocumentResponse = ResponseType<DocumentData>
export const fetchDocument = async (id: number) => {
    return await request(() => accessTokenApi.get<DocumentResponse>(`/documents/${id}`))
}

export const likeOrDislikeDocument = async (data: {
    id: number,
    like?: boolean
}) => {
    return await request(() => accessTokenApi.post<DocumentResponse>('/documents/likeOrDislike', data))
}