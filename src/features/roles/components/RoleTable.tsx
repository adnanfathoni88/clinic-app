'use client'

import { useRoles } from "../useRoles"
import EditRoleModal from "./EditRoleModal"
import DeleteRoleModal from "./DeleteRoleModal"

export default function RoleTable() {
    const { data: roles, isLoading } = useRoles()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="bg-[#1D232C] p-4 rounded-lg">
            <table className="w-full table-auto">
                <thead className="text-left text-[#7D8FA9] border-b border-[#3B4758]">
                    <tr>
                        <th className="py-3 px-3"></th>
                        <th className="py-3 px-3">#</th>
                        <th className="py-3 px-3">Name</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#3B4758] text-[#DDE1E8]">
                    {roles?.map((role) => (
                        <tr key={role.id} className="hover:bg-[#2A3445]">

                            {/* bulk */}
                            <td className="py-3 px-3 text-center w-0 whitespace-nowrap">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
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
                    {roles?.map((role) => (
                        <tr key={role.id} className="hover:bg-[#2A3445]">
                            <td className="py-3 px-3 text-center w-0 whitespace-nowrap">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            </td>
                            <td className="py-3 px-3 text-center w-0 whitespace-nowrap">{role.id}</td>
                            <td className="py-3 px-3">{role.name}</td>
                            <td className="py-3 px-3">
                                {/* circle red */}
                                <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                                <span>In Active</span>
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
        </div>
    )
}