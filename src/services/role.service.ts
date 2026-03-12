import { prisma } from "@/src/lib/prisma"

export async function getRoles() {
    return prisma.role.findMany(
        {
            orderBy: {
                name: 'asc',
            },
        }
    )
}

export async function createRole(name: string) {
    return prisma.role.create({
        data: {
            name
        }
    })
}   