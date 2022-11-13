import { PrismaClient } from '@prisma/client';
import { categories, roles } from '../src/types';

import * as bcrypt from "bcrypt";
import fs from "fs"

const prisma = new PrismaClient()

async function seed() {

    try{
        fs.rmSync('uploads/documents', { recursive: true, force: true })
        fs.rmSync('uploads/previews', { recursive: true, force: true })
    }
    catch(e){
        console.log(e)
    }

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

    await prisma.uploadRequestState.createMany({
        data: [
            { name: 'Esperando respuesta' },
            { name: 'Aceptado' },
            { name: 'Rechazado' }
        ]
    })

    await prisma.category.createMany({
        data: categories.map(category => ({
            name: category,
            image: category
        }))
    })
}

seed()