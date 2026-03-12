'use client'

import { useRoles } from "../hooks/useRoles"
import EditRoleModal from "./EditRoleModal"
import DeleteRoleModal from "./DeleteRoleModal"

export default function RoleTable() {
    const { data: roles, isLoading } = useRoles()

    if (isLoading) return <div>Loading...</div>

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {roles?.map((role) => (
                    <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                            <EditRoleModal role={role} />
                            <DeleteRoleModal role={role} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}