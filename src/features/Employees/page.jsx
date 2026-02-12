import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import apiClient from '@/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import useStore from "@/store/useStore";


import {
    MoreHorizontalIcon,
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowLeftDoubleIcon,
    ArrowRightDoubleIcon,
    Search01Icon,
    PlusSignIcon,
    ViewIcon,
    PencilEdit01Icon,
    Delete02Icon
} from 'hugeicons-react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';



const Employees = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const debouncedSearch = useDebounce(globalFilter, 500);
   
    
    const increment = useStore((state) => state.increment);
    const decrement = useStore((state) => state.decrement);
    const { data: employeesData, isLoading, error, refetch } = useQuery({
        queryKey: ['employees', debouncedSearch],
        queryFn: async () => {
            const response = await apiClient.get('/employees', {
                params: { search: debouncedSearch }
            });
            return response.data.data;
        },
        staleTime: 1 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const employees = employeesData || [];

    const columns = useMemo(() => [
        {
            accessorKey: 'fullName',
            header: 'User',
            meta: { className: "w-[140px] max-w-[140px]" },
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{row.original.fullName}</span>
                </div>
            ),
        },
        {
            accessorKey: 'email',
            header: 'Email',
            meta: { className: "hidden sm:table-cell w-[220px] max-w-[220px]" }
        },
        {
            accessorKey: 'phoneNumber',
            header: 'Phone',
            meta: { className: "hidden md:table-cell w-[140px] max-w-[140px]" }
        },
        {
            accessorKey: 'designation',
            header: 'Designation',
            meta: { className: "w-[120px]" }
        },
        {
            accessorKey: 'department',
            header: 'Department',
            meta: { className: "w-[100px]" },
            cell: ({ row }) => {
                const dept = row.getValue('department');
                const variants = {
                    'Engineering': 'info',
                    'HR': 'purple',
                    'Design': 'pink',
                    'Marketing': 'amber',
                    'Operations': 'cyan'
                };
                return (
                    <Badge variant={variants[dept] || 'default'} className="rounded font-medium text-[11px] px-2 py-0 border-0">
                        {dept}
                    </Badge>
                );
            }
        },
        {
            accessorKey: 'status',
            header: 'User status',
            cell: ({ row }) => {
                const status = row.getValue('status');
                const normalizedStatus = status?.toUpperCase();
                let variant = normalizedStatus === 'ACTIVE' ? 'success' : 'slate';

                return (
                    <Badge variant={variant} className="rounded font-bold text-[10px] px-2">
                        {status}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: () => <div className="pl-6">Action</div>,
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={`/employees/${row.original.employeeId}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                                    <ViewIcon className="h-4 w-4" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>View Details</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={`/employees/edit/${row.original.employeeId}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-600 hover:bg-amber-50">
                                    <PencilEdit01Icon className="h-4 w-4" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>Edit Employee</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                onClick={() => {
                                    setSelectedEmployee(row.original);
                                    setIsDeleteDialogOpen(true);
                                }}
                            >
                                <Delete02Icon className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p>Delete Employee</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
        },
    ], []);

    const handleDelete = async (type) => {
        if (!selectedEmployee) return;

        setIsDeleting(true);
        try {
            const endpoint = type === 'soft'
                ? `/employees/${selectedEmployee.employeeId}/soft-delete`
                : `/employees/${selectedEmployee.employeeId}`;

            if (type === 'soft') {
                await apiClient.patch(endpoint);
            } else {
                await apiClient.delete(endpoint);
            }

            toast.success(`Employee ${type === 'soft' ? 'archived' : 'deleted'} successfully!`);
            refetch();
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error(error.response?.data?.message || 'Failed to delete employee.');
        } finally {
            setIsDeleting(false);
            setSelectedEmployee(null);
        }
    };

    const table = useReactTable({
        data: employees,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="p-1 space-y-6">


            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-72">
                    <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by name"
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="pl-9 h-10 border-gray-200"
                    />
                </div>

                <Link to="/employees/add">
                    
                    <Button className="bg-[#2563EB] hover:bg-[#00A4FF] text-white gap-2 h-10 px-4">
                        <PlusSignIcon className="h-5 w-5" />
                        Add Employee
                    </Button>
                </Link>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                "text-gray-900 font-semibold h-11 whitespace-nowrap",
                                                header.column.columnDef.meta?.className
                                            )}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i} className="hover:bg-transparent">
                                        <TableCell className="py-4 w-[140px] max-w-[140px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell py-4 w-[220px] max-w-[220px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 w-[140px] max-w-[140px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="py-4 w-[120px]">
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                        <TableCell className="py-4 w-[100px]">
                                            <Skeleton className="h-6 w-full rounded" />
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Skeleton className="h-6 w-16 rounded" />
                                        </TableCell>
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex items-center gap-1">
                                                <Skeleton className="h-8 w-8 rounded-md" />
                                                <Skeleton className="h-8 w-8 rounded-md" />
                                                <Skeleton className="h-8 w-8 rounded-md" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center text-red-500">
                                        {error}
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    "py-3 whitespace-nowrap",
                                                    cell.column.columnDef.meta?.className
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t text-sm text-gray-500 gap-4">
                    <div className="font-medium text-gray-500">
                        {globalFilter ? (
                            <>
                                <span className="text-gray-900 font-semibold">{table.getFilteredRowModel().rows.length}</span>
                                {` result${table.getFilteredRowModel().rows.length !== 1 ? 's' : ''} found`}
                            </>
                        ) : (
                            <>
                                <span className="text-gray-900 font-semibold">{table.getFilteredRowModel().rows.length}</span>
                                {` employee${table.getFilteredRowModel().rows.length !== 1 ? 's' : ''} total`}
                            </>
                        )}
                    </div>

                    {(table.getFilteredRowModel().rows.length > 5 || table.getPageCount() > 1) && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-gray-500">
                            {table.getFilteredRowModel().rows.length > 5 && (
                                <div className="flex items-center gap-2">
                                    Rows per page:
                                    <select
                                        value={table.getState().pagination.pageSize}
                                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                                        className="bg-white border border-gray-200 rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                                    >
                                        {[5, 10, 20].map((pageSize) => (
                                            <option key={pageSize} value={pageSize}>
                                                {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {table.getPageCount() > 1 && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <ArrowLeft01Icon className="h-4 w-4 text-gray-600" />
                                    </Button>
                                    <div className="flex items-center gap-1.5 px-2">
                                        <span className="text-gray-900 font-bold min-w-[1.25rem] text-center">
                                            {table.getState().pagination.pageIndex + 1}
                                        </span>
                                        <span className="text-gray-400">of</span>
                                        <span className="text-gray-900 font-bold min-w-[1.25rem] text-center">
                                            {table.getPageCount()}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        <ArrowRight01Icon className="h-4 w-4 text-gray-600" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedEmployee(null);
                }}
                onConfirm={handleDelete}
                employeeName={selectedEmployee?.fullName}
                isSubmitting={isDeleting}
            />
        </div>
    );
};

export default Employees;
