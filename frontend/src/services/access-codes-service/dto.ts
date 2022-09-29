import { AccessCode } from "../../interfaces"
import { ResponseType } from "../dto"

export type AccessCodesResponse = ResponseType<{
    codes: AccessCode[]
}>

export type CreateAccessCodeResponse = ResponseType<AccessCode>
export type DeleteAccessCodeResponse = ResponseType<AccessCode>