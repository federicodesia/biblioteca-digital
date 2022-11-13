import { Prisma } from "@prisma/client"
import { Router } from "express"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { documentInclude } from "../../types/prisma"
import { CustomException } from "../../utils/custom-exception"
import extractUser from "../../utils/extract-user"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { deleteDocumentSchema, getDocumentSchema, likeDislikeDocumentSchema, searchDocumentSchema } from "./documents.schemas"
import fs from "fs"

const router = Router()
router.use(authGuardAccessToken)

router.get('/', async (req, res) => {
    const { query } = await schemaValidator(searchDocumentSchema, req)
    const { q, filterByUserId, filterByCategoryId, orderBy, limit } = query

    const orderByOptions: Record<string, Prisma.DocumentOrderByWithRelationInput> = {
        'publishedAt': { publishedAt: 'desc' },
        'downloads': { downloads: 'desc' }
    }

    const result = await prismaClient.document.findMany({
        take: limit ? parseInt(limit) : undefined,
        where: {
            AND: [
                q !== undefined ? {
                    OR: [
                        { title: { contains: q } },
                        { description: { contains: q } },
                        {
                            createdBy: {
                                OR: [
                                    { name: { contains: q } },
                                    { lastname: { contains: q } },
                                ]
                            }
                        }
                    ]
                } : {},
                {
                    createdById: filterByUserId ? parseInt(filterByUserId) : undefined
                },
                {
                    DocumentCategory: filterByCategoryId ? {
                        some: { categoryId: parseInt(filterByCategoryId) }
                    } : undefined
                },
                {
                    NOT: [
                        { publishedAt: null }
                    ]
                }
            ]
        },
        include: documentInclude,
        orderBy: orderBy ? orderByOptions[orderBy] : undefined
    })

    return res.json({
        documents: result
    })
})

router.get('/:id', async (req, res) => {
    const { params } = await schemaValidator(getDocumentSchema, req)
    const { id } = params

    const document = await prismaClient.document.findUnique({
        where: { id: parseInt(id) },
        include: documentInclude
    })

    if (!document || !document.publishedAt) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'No se encontró el documento'
    )

    return res.json(document)
})

router.delete('/:id', async (req, res) => {
    const { params } = await schemaValidator(deleteDocumentSchema, req)
    const { id } = params
    const documentId = parseInt(id)
    const { user, userRole } = extractUser(req)

    const document = await prismaClient.document.findUnique({
        where: { id: documentId },
        include: documentInclude
    })

    if (!document) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'No se encontró el documento'
    )

    if (document.createdById !== user.id || userRole !== 'Administrador') throw new CustomException(
        HTTPStatusCode.UNAUTHORIZED,
        'No tienes permisos para realizar esta acción'
    )

    const deletedDocument = await prismaClient.document.delete({
        where: { id: documentId },
        include: documentInclude
    })

    const { fileName } = deletedDocument
    if (fileName) {
        fs.unlinkSync(`uploads/documents/${fileName}.pdf`)
        fs.unlinkSync(`uploads/previews/${fileName}.png`)
    }

    return res.json(deletedDocument)
})

router.post('/likeOrDislike', async (req, res) => {
    const { body } = await schemaValidator(likeDislikeDocumentSchema, req)
    const { id, like } = body
    const { user } = extractUser(req)

    if (like !== undefined) {
        const document = await prismaClient.document.update({
            where: { id: id },
            data: {
                Opinion: {
                    upsert: {
                        where: {
                            documentId_userId: {
                                documentId: id,
                                userId: user.id
                            }
                        },
                        create: {
                            user: {
                                connect: { id: user.id }
                            },
                            like: like
                        },
                        update: {
                            like: like
                        }
                    }
                }
            },
            include: documentInclude
        })

        return res.json(document)
    }

    const document = await prismaClient.document.update({
        where: { id: id },
        data: {
            Opinion: {
                delete: {
                    documentId_userId: {
                        documentId: id,
                        userId: user.id
                    }
                }
            }
        },
        include: documentInclude
    })
    return res.json(document)
})

export default router