import { baseURL } from "./api"

const getDocument = (fileName: string) => {
    return `${baseURL}uploads/documents/${fileName}.pdf`
}

const getPreview = (fileName: string) => {
    return `${baseURL}uploads/previews/${fileName}.png`
}

const uploadsService = {
    getDocument,
    getPreview
}

export default uploadsService