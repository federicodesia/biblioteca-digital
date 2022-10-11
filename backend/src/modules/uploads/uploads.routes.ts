import { Router } from "express"
import { CustomException } from "../../utils/custom-exception"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { getUploadSchema } from "./uploads.schemas"
import fs from "fs"

const router = Router()

router.get('/documents/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params

    try {
        const file = fs.readFileSync(`uploads/documents/${fileName}`)
        res.writeHead(200, { 'Content-type': 'application/pdf' })
        return res.end(file)
    }
    catch (e) {
        throw new CustomException(
            HTTPStatusCode.NOT_FOUND,
            'No se encontró el documento'
        )
    }
})

router.get('/previews/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params

    try {
        const file = fs.readFileSync(`uploads/previews/${fileName}`)
        res.writeHead(200, { 'Content-type': 'image/png' })
        return res.end(file)
    }
    catch (e) {
        throw new CustomException(
            HTTPStatusCode.NOT_FOUND,
            'No se encontró la imagen de vista previa'
        )
    }
})

router.get('/category/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params

    try {
        const file = fs.readFileSync(`uploads/categories/${fileName}`)
        res.writeHead(200, { 'Content-type': 'image/png' })
        return res.end(file)
    }
    catch (e) {
        throw new CustomException(
            HTTPStatusCode.NOT_FOUND,
            'No se encontró la imagen de la categoría'
        )
    }
})

export default router