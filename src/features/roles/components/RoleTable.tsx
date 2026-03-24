'use client'

import { useState } from "react"
import { useRoles, useBulkDeleteRoles } from "../useRoles"
import EditRoleModal from "./EditRoleModal"
import DeleteRoleModal from "./DeleteRoleModal"
import BulkDeleteModal from "./BulkDeleteModal"

import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";


export default function RoleTable() {
    const { data: roles, isLoading } = useRoles()
    const [search, setSearch] = useState("")
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)

    const filteredRoles = roles?.filter((role) =>
        role.name.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(filteredRoles?.map((role) => role.id) || [])
        } else {
            setSelectedIds([])
        }
    }

    const handleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const handleBulkDelete = () => {
        setIsBulkDeleteOpen(true)
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="bg-primary-900 p-6 rounded-lg shadow-md">
            {/* Search & Bulk Delete */}
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center bg-primary-950 rounded-lg relative w-full md:w-64 px-3 py-2">

                    {/* icon  */}
                    <div className="absolute text-primary-500 left-3 top-1/2 transform -translate-y-1/2">
                        <FaSearch />
                    </div>

                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 pl-8 pr-4"
                    />
                </div>

                {/* Bulk Delete Button */}
                {selectedIds.length > 0 && (
                    <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaTrash />
                        <span>Delete ({selectedIds.length})</span>
                    </button>
                )}
            </div>

            <table className="w-full table-auto">
                <thead className="text-left text-[#7D8FA9] border-b border-[#3B4758]">
                    <tr>
                        <th className="py-3 px-3">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                                onChange={handleSelectAll}
                                checked={filteredRoles?.length === selectedIds.length && selectedIds.length > 0}
                            />
                        </th>
                        <th className="py-3 px-3">#</th>
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#3B4758] text-[#DDE1E8]">
                    {filteredRoles?.map((role) => (
                        <tr key={role.id} className="hover:bg-[#2A3445]">

                            {/* bulk */}
                            <td className="py-3 px-3 text-center w-0 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                    checked={selectedIds.includes(role.id)}
                                    onChange={() => handleSelectOne(role.id)}
                                />
                            </td>

                            <td className="py-3 px-3 text-center w-0 whitespace-nowrap">{role.id}</td>
                            <td className="py-3 px-3">{role.name}</td>
                            <td className="py-3 px-3">
                                {/* circle red */}
                                <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                <span>Active</span>
                            </td>
                            <td className="py-3 px-3">
                                <div className="flex items-center space-x-4">
                                    <EditRoleModal role={role} />
                                    <DeleteRoleModal role={role} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bulk Delete Modal */}
            <BulkDeleteModal
                roleIds={selectedIds}
                isOpen={isBulkDeleteOpen}
                onClose={() => setIsBulkDeleteOpen(false)}
            />
        </div>
    )
}