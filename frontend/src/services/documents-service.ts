import { DocumentData } from "../interfaces"
import request from "../utils/request"
import { accessTokenApi } from "./api"
import { ResponseType } from "./dto"

export type DocumentsResponse = ResponseType<{ documents: DocumentData[] }>
export const fetchDocuments = async (search?: string, filterByUserId?: number) => {
    return await request(() => accessTokenApi.get<DocumentsResponse>('/documents', {
        params: {
            q: search,
            filterByUserId: filterByUserId
        }
    }))
}