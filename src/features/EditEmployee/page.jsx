import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft01Icon,
    UserIcon,
    Mail01Icon,
    CallIcon,
    Briefcase01Icon,
    Building01Icon,
    Calendar01Icon
} from 'hugeicons-react';
import apiClient from '@/api/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EditEmployeeSkeleton } from './EditEmployeeSkeleton';

const employeeSchema = z.object({
    fullName: z.string()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must be at most 50 characters"),
    email: z.string()
        .email("Invalid email format")
        .min(1, "Email is required"),
    phoneNumber: z.string()
        .min(1, "Phone number is required")
        .regex(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits only"),
    designation: z.string().min(1, "Role is required"),
    department: z.string().min(1, "Department is required"),
    dateOfJoining: z.string().min(1, "Joining date is required"),
    status: z.enum(["Active", "Inactive"]),
});

export default function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: employee, isLoading, error } = useQuery({
        queryKey: ['employee', id],
        queryFn: async () => {
            const response = await apiClient.get(`/employees/${id}`);
            return response.data.data;
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
        control
    } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            designation: "",
            department: "",
            dateOfJoining: "",
            status: "Active",
        }
    });

    useEffect(() => {
        if (employee) {
            reset({
                fullName: employee.fullName,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                designation: employee.designation,
                department: employee.department,
                dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '',
                status: employee.status
            });
        }
    }, [employee, reset]);

    const currentStatus = watch("status");

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await apiClient.put(`/employees/${id}`, data);
            toast.success('Successfully Updated', {
                description: 'Employee profile updated successfully! 🎉'
            });
            navigate('/employees');
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error(error.response?.data?.message || 'Failed to update employee. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <EditEmployeeSkeleton />;
    }

    if (error || !employee) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <div className="bg-rose-50 p-4 rounded-full">
                    <ArrowLeft01Icon className="h-8 w-8 text-rose-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Employee Not Found</h2>
                <Button onClick={() => navigate('/employees')} variant="outline">
                    Back to Employees
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 border-gray-200"
                    onClick={() => navigate('/employees')}
                >
                    <ArrowLeft01Icon className="h-5 w-5 text-gray-600" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Employee</h1>
                    <p className="text-gray-500 text-sm">Update {employee.fullName}'s profile information</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <Input
                                {...register("fullName")}
                                placeholder="e.g. John Doe"
                                className={`h-11 ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-blue-500'}`}
                            />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                            <Input
                                {...register("email")}
                                type="email"
                                placeholder="e.g. john.doe@company.com"
                                className={`h-11 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-blue-500'}`}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <Input
                                {...register("phoneNumber")}
                                placeholder="e.g. +1 (555) 000-0000"
                                className={`h-11 ${errors.phoneNumber ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-blue-500'}`}
                            />
                            {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
                        </div>

                        {/* Department */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Department</label>
                            <Controller
                                name="department"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger
                                            className={`h-11 ${errors.department ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:ring-blue-500/20'}`}
                                        >
                                            <SelectValue placeholder="Select Department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Engineering">Engineering</SelectItem>
                                            <SelectItem value="Design">Design</SelectItem>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Sales">Sales</SelectItem>
                                            <SelectItem value="Support">Support</SelectItem>
                                            <SelectItem value="HR">HR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
                        </div>

                        {/* Role (Designation) */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Role</label>
                            <Controller
                                name="designation"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger
                                            className={`h-11 ${errors.designation ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:ring-blue-500/20'}`}
                                        >
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                                            <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                            <SelectItem value="Fullstack Developer">Fullstack Developer</SelectItem>
                                            <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                                            <SelectItem value="Product Manager">Product Manager</SelectItem>
                                            <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                                            <SelectItem value="Support Engineer">Support Engineer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.designation && <p className="text-xs text-red-500">{errors.designation.message}</p>}
                        </div>

                        {/* Date of Joining */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Date of Joining</label>
                            <Input
                                {...register("dateOfJoining")}
                                type="date"
                                className={`h-11 ${errors.dateOfJoining ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-200 focus-visible:ring-blue-500'}`}
                            />
                            {errors.dateOfJoining && <p className="text-xs text-red-500">{errors.dateOfJoining.message}</p>}
                        </div>

                        {/* Status */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700 block">Status</label>
                            <div className="flex items-center gap-6 h-11">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            value="Active"
                                            {...register("status")}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${currentStatus === 'Active' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                            {currentStatus === 'Active' && <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${currentStatus === 'Active' ? 'text-gray-900' : 'text-gray-500'}`}>Active</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            value="Inactive"
                                            {...register("status")}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 transition-all ${currentStatus === 'Inactive' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                            {currentStatus === 'Inactive' && <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${currentStatus === 'Inactive' ? 'text-gray-900' : 'text-gray-500'}`}>Inactive</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 px-6 border-gray-200 text-gray-700 hover:bg-gray-50"
                            onClick={() => navigate('/employees')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200 disabled:opacity-70 transition-all font-semibold"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
