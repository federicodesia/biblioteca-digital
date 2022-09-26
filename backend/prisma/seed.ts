import { PrismaClient } from '@prisma/client';
import { roles } from '../src/types';

import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function seed() {

    await prisma.role.createMany({
        data: roles.map(role => ({
            name: role
        }))
    })

    const hashedPassword = await bcrypt.hash('password', 10);
    await prisma.user.create({
        data: {
            name: 'Usuario',
            lastname: 'Administrador',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: {
                connect: { name: 'Administrador' }
            }
        }
    })
}

seed()