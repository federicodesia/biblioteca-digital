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
        orderBy: orderBy === 'publishedAt' ? { publishedAt: 'desc' } : undefined
    })

    return res.json({
        documents: result
    })
})

export default router