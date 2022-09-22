import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function seed() {

    await prisma.role.createMany({
        data: [
            { name: 'Administrador' },
            { name: 'Profesor' },
            { name: 'Alumno' }
        ]
    })
}

seed()