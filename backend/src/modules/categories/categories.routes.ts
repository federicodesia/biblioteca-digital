import { Router } from "express"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { CustomException } from "../../utils/custom-exception"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { searchCategorySchema } from "./categories.schemas"

const router = Router()
router.use(authGuardAccessToken)

router.get('/', async (req, res) => {
    const result = await prismaClient.category.findMany()
    return res.json({ categories: result })
})

router.get('/:id', async (req, res) => {
    const { params } = await schemaValidator(searchCategorySchema, req)
    const { id } = params

    const category = await prismaClient.category.findUnique({
        where: { id: parseInt(id) }
    })

    if (!category) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'No se encontró la categoría'
    )

    return res.json(category)
})

export default router