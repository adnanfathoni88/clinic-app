"use client"

import React, { useState } from "react"
import { useUpdateRole } from "../useRoles"

import { BiSolidPencil } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";



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
            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsOpen(true)}>
                <BiSolidPencil />
            </button>

            {/* modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-primary-800/90 flex items-center justify-center z-50">
                    <div className="bg-primary-900 text-white p-6 rounded w-1/2">
                        <div className="flex items-center justify-between mb-4 border-b border-primary-700 pb-2">
                            <h2 className="text-xl font-bold">Edit Role</h2>
                            <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer" onClick={() => setIsOpen(false)}>
                                <IoIosClose size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <label className="block mb-2 font-medium" htmlFor="roleName">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400" disabled={isPending}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}