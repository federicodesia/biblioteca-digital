import { Router } from "express"
import multer from "multer"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { uploadRequestIncude } from "../../types/prisma"
import { CustomException } from "../../utils/custom-exception"
import extractUser from "../../utils/extract-user"
import { FormException } from "../../utils/form-exception"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { validateRole } from "../../utils/validate-role"
import { answerUploadRequestSchema, createUploadRequestSchema, searchUploadRequestSchema } from "./upload-requests.schemas"
import fs from "fs"
import { customAlphabet } from "nanoid"

const router = Router()
router.use(authGuardAccessToken)

const uploadPdf = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 16 * 1024 * 1024
    },
    fileFilter: async (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') return cb(new FormException(
            HTTPStatusCode.NOT_ACCEPTABLE,
            [{ path: file.fieldname, message: 'El archivo debe ser formato .PDF' }]
        ))

        return cb(null, true)
    }
})

router.post('/', uploadPdf.single('document'), async (req, res) => {
    const { body } = await schemaValidator(createUploadRequestSchema, req)
    const { title, description } = body

    const { user } = extractUser(req)
    const verify = await prismaClient.uploadRequest.findMany({
        where: {
            document: { createdById: user.id },
            status: { name: 'Esperando respuesta' }
        }
    })

    if (verify.length >= 3) throw new CustomException(
        HTTPStatusCode.CONFLICT,
        'No puedes tener más de tres solicitudes de carga pendientes'
    )

    const { file } = req
    if (!file) throw new CustomException(
        HTTPStatusCode.INTERNAL_SERVER_ERROR,
        'No se encontró el documento'
    )

    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const nanoid = customAlphabet(alphabet, 32)

    const extension = file.mimetype.split('/').at(-1)?.toLowerCase()
    const fileName = `${nanoid()}.${extension}`

    const path = 'uploads'
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    fs.writeFileSync(`${path}/${fileName}`, file.buffer)

    const document = await prismaClient.document.create({
        data: {
            title: title,
            description: description,
            createdBy: {
                connect: { id: user.id }
            },
            fileName: fileName
        }
    })

    const uploadRequest = await prismaClient.uploadRequest.create({
        data: {
            document: {
                connect: { id: document.id }
            },
            status: {
                connect: { name: 'Esperando respuesta' }
            }
        },
        include: uploadRequestIncude
    })

    return res.json(uploadRequest)
})

router.get('/', async (req, res) => {
    const { query } = await schemaValidator(searchUploadRequestSchema, req)
    const { filterByUserId, q } = query

    const { user, userRole } = extractUser(req)

    const _filterByUserId = filterByUserId ? parseInt(filterByUserId) : undefined;
    if (_filterByUserId !== undefined && _filterByUserId !== user.id) validateRole(['Administrador'], userRole)

    const result = await prismaClient.uploadRequest.findMany({
        where: {
            AND: [
                q !== undefined ? {
                    document: {
                        OR: [
                            { title: { contains: q } },
                            {
                                createdBy: {
                                    OR: [
                                        { name: { contains: q } },
                                        { lastname: { contains: q } }
                                    ]
                                }
                            }
                        ]
                    }
                } : {},
                {
                    document: {
                        createdById: userRole !== 'Administrador'
                            ? user.id
                            : _filterByUserId
                    }
                }
            ]
        },
        include: uploadRequestIncude,
    })

    return res.json({
        uploadRequests: result
    })
})

router.patch('/answer', async (req, res) => {
    const { body } = await schemaValidator(answerUploadRequestSchema, req)
    const { documentId, approved, review } = body

    const { user, userRole } = extractUser(req)
    validateRole(['Administrador'], userRole)

    const verify = await prismaClient.uploadRequest.findUnique({
        where: { documentId: documentId },
        include: { status: true }
    })

    if (verify?.status.name !== 'Esperando respuesta') throw new CustomException(
        HTTPStatusCode.CONFLICT,
        'La solicitud de carga ya había sido respondida'
    )

    const now = new Date()

    if (approved) {
        const document = await prismaClient.document.update({
            where: { id: documentId },
            data: { publishedAt: now }
        })
    }

    const uploadRequest = await prismaClient.uploadRequest.update({
        where: { documentId: documentId },
        data: {
            status: {
                connect: { name: approved ? 'Aceptado' : 'Rechazado' }
            },
            review: review,
            reviewedBy: {
                connect: { id: user.id }
            },
            reviewedAt: now
        },
        include: uploadRequestIncude
    })

    return res.json(uploadRequest)
})

export default router