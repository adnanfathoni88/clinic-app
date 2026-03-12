"use client"

import React, { useState } from "react"
import { useUpdateRole } from "../hooks/useRoles"

type Props = {
    role: {
        id: number,
        name: string
    }
}

export default function EditRoleModal({ role }: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState(role.name)
    const { mutate: updateRole, isPending } = useUpdateRole()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        updateRole({ id: role.id, name },
            {
                onSuccess: () => {
                    setIsOpen(false)
                }
            }
        )
    }

    return (
        <>
            {/* trigger */}
            <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => setIsOpen(true)}>
                Edit
            </button>

            {/* modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black p-4 rounded w-1/2">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold mb-4">Edit Role</h2>
                            <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}