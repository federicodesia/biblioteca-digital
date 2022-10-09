import { DocumentData } from "../interfaces"
import request from "../utils/request"
import { accessTokenApi } from "./api"
import { ResponseType } from "./dto"

export type DocumentsResponse = ResponseType<{ documents: DocumentData[] }>
export const fetchDocuments = async (params: {
    q?: string,
    filterByUserId?: number
    orderBy?: 'publishedAt'
    limit?: number
}) => {
    return await request(() => accessTokenApi.get<DocumentsResponse>('/documents', {
        params: params
    }))
}