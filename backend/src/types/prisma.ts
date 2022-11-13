import { Prisma } from "@prisma/client";

export const userSelect: Prisma.UserSelect = {
    id: true,
    name: true,
    lastname: true
}

export const documentInclude: Prisma.DocumentInclude = {
    createdBy: {
        select: userSelect
    },
    DocumentCategory: {
        select: {
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    },
    Opinion: {
        select: {
            userId: true,
            like: true
        }
    }
}

export const uploadRequestIncude: Prisma.UploadRequestInclude = {
    document: {
        include: documentInclude
    },
    status: true,
    reviewedBy: {
        select: userSelect
    }
}