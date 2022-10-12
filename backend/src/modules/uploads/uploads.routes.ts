import { Response, Router } from "express"
import { CustomException } from "../../utils/custom-exception"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { getUploadSchema } from "./uploads.schemas"
import fs from "fs"
import { prismaClient } from "../.."

const router = Router()

const getFile = ({ res, path, contentType, notFound }: {
    res: Response,
    path: string,
    contentType: string,
    notFound: string
}) => {
    try {
        const file = fs.readFileSync(path)
        res.writeHead(200, { 'Content-type': contentType })
        return res.end(file)
    }
    catch (e) {
        throw new CustomException(
            HTTPStatusCode.NOT_FOUND,
            notFound
        )
    }
}

router.get('/documents/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params

    const document = await prismaClient.document.findFirst({
        where: { fileName: fileName.split('.').at(0) }
    })

    if (document) {
        const updated = await prismaClient.document.update({
            where: { id: document.id },
            data: { downloads: { increment: 1 } }
        })
    }

    return await getFile({
        res,
        path: `uploads/documents/${fileName}`,
        contentType: 'application/pdf',
        notFound: 'No se encontró el documento'
    })
})

router.get('/previews/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params
    return await getFile({
        res,
        path: `uploads/previews/${fileName}`,
        contentType: 'image/png',
        notFound: 'No se encontró la imagen de vista previa'
    })
})

router.get('/category/card/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params
    return await getFile({
        res,
        path: `uploads/categories/cards/${fileName}`,
        contentType: 'image/png',
        notFound: 'No se encontró la imagen de la categoría'
    })
})

router.get('/category/results/:fileName', async (req, res) => {
    const { params } = await schemaValidator(getUploadSchema, req)
    const { fileName } = params
    return await getFile({
        res,
        path: `uploads/categories/results/${fileName}`,
        contentType: 'image/png',
        notFound: 'No se encontró la imagen de la categoría'
    })
})

export default router