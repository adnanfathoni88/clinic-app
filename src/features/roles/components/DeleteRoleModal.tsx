"use client"

import React, { useState } from "react"
import { useDeleteRole } from "../useRoles"

import { FaTrash } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";


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
            <button className="text-[#7D8FA9]"
                onClick={() => setIsOpen(true)}>
                <FaTrash />
            </button>

            {/* modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-primary-800/90 flex items-center justify-center z-50">
                    <div className="bg-primary-900 text-white p-6 rounded w-1/2">
                        <div className="flex items-center justify-between mb-4 border-b border-primary-700 pb-2">
                            <h2 className="text-xl font-bold">Delete Role</h2>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer" onClick={() => setIsOpen(false)}>
                                <IoIosClose size={20} />
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