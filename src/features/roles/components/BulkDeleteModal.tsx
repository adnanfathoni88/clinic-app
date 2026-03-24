"use client"

import React, { useState } from "react"
import { useBulkDeleteRoles } from "../useRoles"

import { IoIosClose } from "react-icons/io";


type Props = {
    roleIds: number[]
    isOpen: boolean
    onClose: () => void
}


export default function BulkDeleteModal({ roleIds, isOpen, onClose }: Props) {
    const [isDeleting, setIsDeleting] = useState(false)
    const { mutate: bulkDelete } = useBulkDeleteRoles()

    const handleDelete = () => {
        setIsDeleting(true)
        bulkDelete(roleIds, {
            onSuccess: () => {
                setIsDeleting(false)
                onClose()
            }
        })
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-primary-800/90 flex items-center justify-center z-50">
            <div className="bg-primary-900 text-white p-6 rounded w-full max-w-md">
                <div className="flex items-center justify-between mb-4 border-b border-primary-700 pb-2">
                    <h2 className="text-xl font-bold">Bulk Delete Roles</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer" onClick={onClose}>
                        <IoIosClose size={20} />
                    </button>
                </div>
                <p>Are you sure you want to delete <span className="text-red-400 font-bold">{roleIds.length}</span> selected role(s)? This action cannot be undone.</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" 
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-700 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}
