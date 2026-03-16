"use client"

import React, { useState } from "react"
import { useCreateRole } from "../useRoles"

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
            <div className="lex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Roles</h1>
                {/* <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Create Role
                </button> */}
            </div>

            {isOpen && (
                <div>
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center">
                        <div className="bg-white text-gray-700 p-6 rounded shadow-md w-1/2">

                            {/* header */}
                            <div className="flex items-center justify-between mb-4 border-b pb-3">
                                <h1>Create Role</h1>
                                <div>
                                    <button onClick={() => setIsOpen(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Close
                                    </button>
                                </div>
                            </div>

                            {/* body */}
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="roleName" className="block mb-2 font-medium">Name</label>
                                    <input type="text" id="roleName" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mb-4" />


                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
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