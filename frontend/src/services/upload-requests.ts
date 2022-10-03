import { UploadRequest } from "../interfaces"
import request from "../utils/request"
import { accessTokenApi } from "./api"
import { FormResponseType, ResponseType } from "./dto"

export type CreateUploadRequestResponse = FormResponseType<UploadRequest>
export const createUploadRequest = async (data: {
    title: string,
    description: string
}) => {
    return await request(() => accessTokenApi.post<CreateUploadRequestResponse>('/upload-requests', data))
}

export type SearchUploadRequestResponse = ResponseType<{ uploadRequests: UploadRequest[] }>
export const searchUploadRequest = async (search: string) => {
    return await request(() => accessTokenApi.get<SearchUploadRequestResponse>('/upload-requests', {
        params: search !== '' ? { q: search } : {}
    }))
}

export type AnswerUploadRequestResponse = FormResponseType<UploadRequest>
export const answerUploadRequest = async (data: {
    documentId: number,
    approved: boolean,
    review?: string
}) => {
    return await request(() => accessTokenApi.patch<AnswerUploadRequestResponse>('/upload-requests/answer', data))
}