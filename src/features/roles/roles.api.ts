// get roles
export async function getRoles() {
    const res = await fetch("/api/roles")

    if (!res.ok) {
        throw new Error("Failed to fetch roles")
    }

    return res.json()
}

// create role
export async function createRole(name: string) {
    const res = await fetch("/api/roles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })

    if (!res.ok) {
        throw new Error("Failed to create role")
    }

    return res.json()
}

// update role
export async function updateRole({ id, name }: { id: number, name: string }) {
    const res = await fetch(`/api/roles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })

    if (!res.ok) {
        throw new Error("Failed to update role")
    }

    return res.json()
}

// delete role
export async function deleteRole(id: number) {
    const res = await fetch(`/api/roles/${id}`, {
        method: "DELETE"
    })

    if (!res.ok) {
        throw new Error("Failed to delete role")
    }
}

// bulk delete roles
export async function bulkDeleteRoles(ids: number[]) {
    const res = await fetch("/api/roles/bulk-delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ids })
    })

    if (!res.ok) {
        throw new Error("Failed to delete roles")
    }

    return res.json()
}