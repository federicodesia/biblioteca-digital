import { baseURL } from "./api"

const getDocument = (fileName: string) => `${baseURL}uploads/documents/${fileName}.pdf`
const getDownloadDocument = (fileName: string) => `${baseURL}uploads/download-document/${fileName}.pdf`
const getPreview = (fileName: string) => `${baseURL}uploads/previews/${fileName}.png`
const getCategoryCardImage = (image: string) => `${baseURL}uploads/category/card/${image}.png`
const getCategoryResultsImage = (image: string) => `${baseURL}uploads/category/results/${image}.png`

const uploadsService = {
    getDocument,
    getDownloadDocument,
    getPreview,
    getCategoryCardImage,
    getCategoryResultsImage
}

export default uploadsService