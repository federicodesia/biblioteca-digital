import { baseURL } from "./api"

const getDocument = (fileName: string) => {
    return `${baseURL}uploads/documents/${fileName}.pdf`
}

const getPreview = (fileName: string) => {
    return `${baseURL}uploads/previews/${fileName}.png`
}

const getCategoryImage = (image: string) => {
    return `${baseURL}uploads/category/${image}.png`
}

const uploadsService = {
    getDocument,
    getPreview,
    getCategoryImage
}

export default uploadsService