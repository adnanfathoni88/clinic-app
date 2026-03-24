"use client"

import React, { useState } from "react"
import { useCreateRole } from "../useRoles"

// icon close
import { IoIosClose } from "react-icons/io";


export default function CreateRoleModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")

    const { mutate, isPending } = useCreateRole()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        mutate(name, {
            onSuccess: () => {
                setIsOpen(false)
                setName("")
            }
        })

    }


    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Roles</h1>
                <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create
                </button>
            </div>

            {isOpen && (
                <div>
                    <div className="fixed inset-0 bg-primary-800/90 flex items-center justify-center z-50">
                        <div className="bg-primary-900 rounded-lg p-6 w-full max-w-lg">

                            {/* header */}
                            <div className="flex items-center justify-between mb-4 border-b border-primary-700 pb-2">
                                <h1 className="text-xl font-bold">Create Role</h1>
                                <div>
                                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">
                                        <IoIosClose size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* body */}
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="roleName" className="block mb-2 font-medium">Name</label>
                                    <input type="text" id="roleName" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mb-4 border border-primary-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400" disabled={isPending} type="submit">
                                        Save
                                    </button>
                                </form>
                            </div>


                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}