import { baseURL } from "./api"

const getDocument = (fileName: string) => {
    return `${baseURL}uploads/document/${fileName}`
}

const uploadsService = {
    getDocument
}

export default uploadsService