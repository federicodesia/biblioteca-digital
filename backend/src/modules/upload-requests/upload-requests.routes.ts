import { Router } from "express"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { uploadRequestIncude } from "../../types/prisma"
import { CustomException } from "../../utils/custom-exception"
import extractUser from "../../utils/extract-user"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { validateRole } from "../../utils/validate-role"
import { answerUploadRequestSchema, createUploadRequestSchema, searchUploadRequestSchema } from "./upload-requests.schemas"

const router = Router()
router.use(authGuardAccessToken)

router.post('/', async (req, res) => {
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

    const document = await prismaClient.document.create({
        data: {
            title: title,
            description: description,
            createdBy: {
                connect: { id: user.id }
            }
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
    const { q } = query

    const { user, userRole } = extractUser(req)

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
                userRole !== 'Administrador' ? {
                    document: { createdById: user.id }
                } : {}
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