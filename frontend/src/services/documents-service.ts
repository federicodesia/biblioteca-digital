import { DocumentData } from "../interfaces"
import request from "../utils/request"
import { accessTokenApi } from "./api"
import { ResponseType } from "./dto"

export type DocumentsResponse = ResponseType<{ documents: DocumentData[] }>

export type FetchDocumentsProps = {
    q?: string,
    filterByUserId?: number
    filterByCategoryId?: number
    orderBy?: 'publishedAt'
    limit?: number
}

export const fetchDocuments = async (params: FetchDocumentsProps) => {
    return await request(() => accessTokenApi.get<DocumentsResponse>('/documents', {
        params: params
    }))
}