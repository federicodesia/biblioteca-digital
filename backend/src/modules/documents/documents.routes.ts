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
    const { q, filterByUserId } = query

    const result = await prismaClient.document.findMany({
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
                    NOT: [
                        { publishedAt: null }
                    ]
                }
            ]
        },
        include: documentInclude,
    })

    return res.json({
        documents: result
    })
})

export default router