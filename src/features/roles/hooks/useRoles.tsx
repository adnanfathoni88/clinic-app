import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Role } from "../../../app/generated/prisma/client";
import { getRoles, createRole, updateRole, deleteRole } from "../api/roles.api";

// get roles
export const useRoles = () => {
    return useQuery<Role[]>({
        queryKey: ["roles"],
        queryFn: getRoles
    })
}

// create role
export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    });
}

// update
export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    });
}

// delete
export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] })
        }
    });
}