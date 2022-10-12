import { Prisma } from "@prisma/client"
import { Router } from "express"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { documentInclude } from "../../types/prisma"
import { schemaValidator } from "../../utils/schema-validator"
import { searchDocumentSchema } from "./documents.schemas"

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
                    categories: filterByCategoryId ? {
                        some: { id: parseInt(filterByCategoryId) }
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

export default router