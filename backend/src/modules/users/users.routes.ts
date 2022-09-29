import { Prisma } from "@prisma/client";
import { Router } from "express";
import { prismaClient } from "../..";
import { authGuardAccessToken } from "../../middleware/auth-guard";
import { CustomException } from "../../utils/custom-exception";
import excludeKey from "../../utils/exclude-key";
import extractUser from "../../utils/extract-user";
import HTTPStatusCode from "../../utils/http-status-code";
import { schemaValidator } from "../../utils/schema-validator";
import { validateRole } from "../../utils/validate-role";
import { searchUserSchema, updateUserStatusSchema } from "./users.schemas";

const router = Router()
router.use(authGuardAccessToken)

const userInclude: Prisma.UserInclude = {
    role: true,
    invitedBy: {
        select: {
            id: true,
            name: true,
            lastname: true,
            email: true
        }
    }
}

router.get('/', async (req, res) => {
    const { query } = await schemaValidator(searchUserSchema, req)
    const { q } = query

    validateRole(['Administrador'], req)

    const result = await prismaClient.user.findMany({
        where: q !== undefined ? {
            OR: [
                { name: { contains: q } },
                { lastname: { contains: q } },
                { email: { contains: q } }
            ]
        } : {},
        include: userInclude
    })

    return res.json({
        users: result.map(user => excludeKey(user, 'password'))
    })
})

router.patch('/update-user-status', async (req, res) => {
    const { body } = await schemaValidator(updateUserStatusSchema, req);
    const { userId, isActive } = body;

    const { user, userRole } = extractUser(req)
    validateRole(['Administrador'], userRole)

    if (user.id === userId) throw new CustomException(
        HTTPStatusCode.CONFLICT,
        'No puedes modificar el estado de tu propia cuenta'
    )

    try {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: { isActive: isActive },
            include: userInclude
        })

        if (!isActive) {
            const deletedSessions = await prismaClient.userSession.deleteMany({
                where: { userId: userId }
            })
        }

        return res.json({
            user: excludeKey(updatedUser, 'password')
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') throw new CustomException(
                HTTPStatusCode.NOT_FOUND,
                'No se encontró la cuenta de usuario'
            )
        }
        throw e
    }
})

export default router