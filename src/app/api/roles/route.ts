import { NextRequest, NextResponse } from "next/server"
import { getRoles, createRole } from "@/src/services/role.service"
import { prisma } from "@/src/lib/prisma"
import { error } from "console"

// read
export async function GET() {
    try {
        const roles = await getRoles()
        return NextResponse.json(roles)
    } catch (error) {
        console.error("Failed to fetch roles:", error)
        return NextResponse.json(
            { error: "Failed to fetch roles" },
            { status: 500 }
        )
    }
}

// create
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name } = body

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            )
        }

        const role = await createRole(name)

        return NextResponse.json(role, { status: 201 })
    } catch (error) {
        console.error("Failed to create role:", error)
        return NextResponse.json(
            { error: "Failed to create role" },
            { status: 500 }
        )
    }
}

// update
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, name } = body

        if (!id || !name) {
            return NextResponse.json(
                { error: "ID and Name are required" },
                { status: 400 }
            )
        }

        const role = await prisma.role.update({
            where: { id },
            data: { name },
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