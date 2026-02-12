import React, { useState } from 'react';
import { toast } from 'sonner';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft01Icon,
    PencilEdit01Icon,
    Delete02Icon,
    Mail01Icon,
    CallIcon,
    Building01Icon,
    Briefcase01Icon,
    Calendar01Icon,
    Clock01Icon
} from 'hugeicons-react';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: employee, isLoading, error } = useQuery({
        queryKey: ['employee', id],
        queryFn: async () => {
            const response = await apiClient.get(`/employees/${id}`);
            return response.data.data;
        },
    });

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton variant="shimmer" className="h-10 w-10 rounded-full" />
                        <Skeleton variant="shimmer" className="h-8 w-48" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Skeleton variant="shimmer" className="h-10 w-28 rounded-md" />
                        <Skeleton variant="shimmer" className="h-10 w-24 rounded-md" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Card Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                            <Skeleton variant="shimmer" className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
                            <div className="mt-6 space-y-3 w-full flex flex-col items-center">
                                <Skeleton variant="shimmer" className="h-6 w-3/4" />
                                <Skeleton variant="shimmer" className="h-4 w-1/2" />
                            </div>
                            <div className="mt-6 w-full pt-6 border-t border-gray-50 flex justify-center">
                                <Skeleton variant="shimmer" className="h-8 w-24 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Right Card Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50">
                                <Skeleton variant="shimmer" className="h-6 w-40" />
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Skeleton variant="shimmer" className="h-4 w-4 rounded" />
                                            <Skeleton variant="shimmer" className="h-3 w-20" />
                                        </div>
                                        <Skeleton variant="shimmer" className="h-5 w-48" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <div className="bg-rose-50 p-4 rounded-full">
                    <ArrowLeft01Icon className="h-8 w-8 text-rose-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Employee Not Found</h2>
                <p className="text-gray-500 max-w-xs text-balance">We couldn't find the employee you're looking for. It might have been deleted or the ID is incorrect.</p>
                <Button onClick={() => navigate('/employees')} variant="outline">
                    Back to Employees
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-gray-200"
                        onClick={() => navigate('/employees')}
                    >
                        <ArrowLeft01Icon className="h-5 w-5 text-gray-600" />
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Employee Profile</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={`/employees/edit/${employee.employeeId}`}>
                        <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
                            <PencilEdit01Icon className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        className="gap-2 bg-rose-600 hover:bg-rose-700"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Delete02Icon className="h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Card - Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400 border-4 border-white shadow-md transition-transform group-hover:scale-105">
                                {getInitials(employee.fullName)}
                            </div>
                            <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${employee.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        </div>

                        <div className="mt-6 space-y-2">
                            <h2 className="text-xl font-bold text-gray-900">{employee.fullName}</h2>
                            <p className="text-gray-500 font-medium text-sm">{employee.designation}</p>
                        </div>

                        <div className="mt-6 w-full pt-6 border-t border-gray-50">
                            <Badge variant={employee.status === 'Active' ? 'success' : 'secondary'} className="px-4 py-1.5 rounded-full text-sm font-semibold">
                                {employee.status}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Right Card - Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50">
                            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {/* Email */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Mail01Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Email Address</span>
                                </div>
                                <p className="text-gray-900 font-semibold">{employee.email}</p>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <CallIcon className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Phone Number</span>
                                </div>
                                <p className="text-gray-900 font-semibold">{employee.phoneNumber}</p>
                            </div>

                            {/* Department */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Building01Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Department</span>
                                </div>
                                <p className="text-gray-900 font-semibold">{employee.department}</p>
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Briefcase01Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Role</span>
                                </div>
                                <p className="text-gray-900 font-semibold">{employee.designation}</p>
                            </div>

                            {/* Joined Date */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Calendar01Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Joined Date</span>
                                </div>
                                <p className="text-gray-900 font-semibold">{new Date(employee.dateOfJoining).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={async (type) => {
                    setIsDeleting(true);
                    try {
                        const endpoint = type === 'soft'
                            ? `/employees/${employee.employeeId}/soft-delete`
                            : `/employees/${employee.employeeId}`;

                        if (type === 'soft') {
                            await apiClient.patch(endpoint);
                        } else {
                            await apiClient.delete(endpoint);
                        }

                        toast.success(`Employee ${type === 'soft' ? 'archived' : 'deleted'} successfully!`);
                        navigate('/employees');
                    } catch (error) {
                        console.error('Error deleting employee:', error);
                        toast.error(error.response?.data?.message || 'Failed to delete employee.');
                    } finally {
                        setIsDeleting(false);
                        setIsDeleteDialogOpen(false);
                    }
                }}
                employeeName={employee?.fullName}
                isSubmitting={isDeleting}
            />
        </div>
    );
};

export default Profile;
