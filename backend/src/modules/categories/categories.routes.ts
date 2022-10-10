import { Router } from "express"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"

const router = Router()
router.use(authGuardAccessToken)

router.get('/', async (req, res) => {
    const result = await prismaClient.category.findMany()
    return res.json({ categories: result })
})

export default router