import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import employeeService from '../services/employeeService';

export const EMPLOYEE_QUERY_KEYS = {
    all: ['employees'],
    list: (search) => ['employees', 'list', { search }],
    detail: (id) => ['employees', 'detail', id],
};

/**
 * Hook to fetch all employees with search functionality
 */
export const useEmployeesList = (search = '') => {
    return useQuery({
        queryKey: EMPLOYEE_QUERY_KEYS.list(search),
        queryFn: () => employeeService.getEmployees(search),
        staleTime: 1 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
};

/**
 * Hook to fetch a single employee by ID
 */
export const useEmployee = (id) => {
    return useQuery({
        queryKey: EMPLOYEE_QUERY_KEYS.detail(id),
        queryFn: () => employeeService.getEmployeeById(id),
        enabled: !!id,
    });
};

/**
 * Hook to handle employee hard deletion
 */
export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => employeeService.hardDeleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.all });
            toast.error("Employee deleted successfully", {
                style: {
                    background: "#fee2e2",
                    color: "#991b1b",
                    border: "1px solid #fecaca"
                }
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete employee');
        },
    });
};

/**
 * Hook to handle employee soft deletion (archive)
 */
export const useSoftDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => employeeService.softDeleteEmployee(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.all });
            toast.error('Employee archived successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to archive employee');
        },
    });
};

/**
 * Hook to handle employee creation
 */
export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => employeeService.createEmployee(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.all });
            toast.success('Employee Added Successfully 🎉');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to create employee');
        },
    });
};

/**
 * Hook to handle employee update
 */
export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => employeeService.updateEmployee(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: EMPLOYEE_QUERY_KEYS.detail(variables.id) });
            toast.success('Employee updated successfully! 🎉');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update employee');
        },
    });
};
