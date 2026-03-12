import CreateRoleModal from "@/src/features/roles/components/CreateRoleModal"
import RoleTable from "@/src/features/roles/components/RoleTable"

export default function RolesPage() {
    return (
        <div>
            <CreateRoleModal />
            <RoleTable />
        </div>
    )
}