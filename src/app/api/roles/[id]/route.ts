import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

interface Params {
    params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params
        const body = await request.json()
        const { name } = body

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            )
        }

        const role = await prisma.role.update({
            where: { id: parseInt(id) },
            data: { name }
        })

        return NextResponse.json(role)
    } catch (error) {
        console.error("Failed to update role:", error)
        return NextResponse.json(
            { error: "Failed to update role" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params

        await prisma.role.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: "Role deleted" })
    } catch (error) {
        console.error("Failed to delete role:", error)
        return NextResponse.json(
            { error: "Failed to delete role" },
            { status: 500 }
        )
    }
}
