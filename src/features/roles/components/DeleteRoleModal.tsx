"use client"

import React, { useState } from "react"
import { useDeleteRole } from "../hooks/useRoles"

type Props = {
    role: {
        id: number,
        name: string
    }
}


export default function DeleteRoleModal({ role }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const { mutate: deleteRole, isPending } = useDeleteRole()

    const handleDelete = () => {
        deleteRole(role.id, {
            onSuccess: () => {
                setIsOpen(false)
            }
        })
    }

    return (
        <>
            {/* trigger */}
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => setIsOpen(true)}>
                Delete
            </button>

            {/* modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white text-black p-4 rounded w-1/2">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold mb-4">Delete Role</h2>
                            <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600" onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>
                        <p>Are you sure you want to delete the role "{role.name}"?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setIsOpen(false)}>
                                Cancel
                            </button>
                            <button onClick={() => { handleDelete() }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}