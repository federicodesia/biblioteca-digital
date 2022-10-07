import { Prisma } from "@prisma/client"
import { Router } from "express"
import { customAlphabet } from "nanoid"
import { prismaClient } from "../.."
import { authGuardAccessToken } from "../../middleware/auth-guard"
import { CustomException } from "../../utils/custom-exception"
import extractUser from "../../utils/extract-user"
import HTTPStatusCode from "../../utils/http-status-code"
import { schemaValidator } from "../../utils/schema-validator"
import { excludeRole, validateRole } from "../../utils/validate-role"
import { createAccessCodeSchema, deleteAccessCodeSchema, searchAccessCodeSchema } from "./access-codes.schemas"

const router = Router()
router.use(authGuardAccessToken)

const accessCodeInclude: Prisma.AccessCodeInclude = {
    role: true,
    createdBy: {
        select: {
            id: true,
            name: true,
            lastname: true
        }
    }
}

router.post('/', async (req, res) => {
    const { body } = await schemaValidator(createAccessCodeSchema, req)
    const { role, expiresIn } = body

    const { user, userRole } = extractUser(req)
    excludeRole(['Alumno'], userRole)

    if (role !== 'Alumno') validateRole(['Administrador'], userRole)

    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const nanoid = customAlphabet(alphabet, 5)

    const accessCode = await prismaClient.accessCode.create({
        data: {
            code: nanoid(),
            role: {
                connect: { name: role }
            },
            createdBy: {
                connect: { id: user.id }
            },
            expiresAt: new Date(new Date().getTime() + (expiresIn * 1000 * 60 * 60 * 24))
        },
        include: accessCodeInclude
    })

    return res.json(accessCode)
})

router.get('/', async (req, res) => {
    const { query } = await schemaValidator(searchAccessCodeSchema, req)
    const { q } = query

    const { user, userRole } = extractUser(req)
    excludeRole(['Alumno'], userRole)

    const result = await prismaClient.accessCode.findMany({
        where: {
            AND: [
                q !== undefined ? {
                    OR: [
                        { code: { contains: q } },
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
                userRole === 'Profesor' ? { createdById: user.id } : {}
            ]
        },
        include: accessCodeInclude,
        orderBy: [
            { roleId: 'asc' },
            { timesUsed: 'asc' },
            { expiresAt: 'desc' }
        ]
    })

    return res.json({
        codes: result
    })
})

router.delete('/:code', async (req, res) => {
    const { params } = await schemaValidator(deleteAccessCodeSchema, req)
    const { code } = params

    const { user, userRole } = extractUser(req)
    excludeRole(['Alumno'], userRole)

    const accessCode = await prismaClient.accessCode.findUnique({
        where: { code: code }
    })

    if (!accessCode) throw new CustomException(
        HTTPStatusCode.NOT_FOUND,
        'El código de acceso no existe'
    )

    if (accessCode.createdById !== user.id) validateRole(['Administrador'], userRole)

    const deleteAccessCode = await prismaClient.accessCode.delete({
        where: { code: code },
        include: accessCodeInclude
    })

    return res.json(deleteAccessCode)
})

export default router