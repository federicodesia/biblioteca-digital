import { PrismaClient } from '@prisma/client';
import { categories, roles } from '../src/types';

import * as bcrypt from "bcrypt";
import fs from "fs"
import envVars from '../src/utils/env-vars';

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

    const hashedPassword = await bcrypt.hash(envVars.adminPassword, 10);
    await prisma.user.create({
        data: {
            name: 'Usuario',
            lastname: 'Administrador',
            email: envVars.adminEmail,
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
            image: category.toLocaleLowerCase()
        }))
    })
}

seed()