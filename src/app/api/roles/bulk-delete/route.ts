import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

// bulk delete
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const { ids } = body

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "IDs array is required" },
                { status: 400 }
            )
        }

        await prisma.role.deleteMany({
            where: {
                id: { in: ids }
            }
        })

        return NextResponse.json(
            { message: `Successfully deleted ${ids.length} role(s)` }
        )
    } catch (error) {
        console.error("Failed to bulk delete roles:", error)
        return NextResponse.json(
            { error: "Failed to delete roles" },
            { status: 500 }
        )
    }
}
