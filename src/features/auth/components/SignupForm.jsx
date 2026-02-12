import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signupSchema } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register: signup, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            full_name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            await signup(data);
        } catch (error) {
            // Error handled in useAuth
        }
    };

    return (
        <div className="w-full max-w-md border border-gray-300 bg-white rounded-2xl p-8 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-blue-200">
                    <span className="text-white font-bold text-xl">EMS</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-gray-500 text-center text-sm">
                    Join us today! Please enter your details to register.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="full_name">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={18} />
                        </div>
                        <Input
                            id="full_name"
                            placeholder="John Doe"
                            className="pl-10 h-11"
                            {...register("full_name")}
                        />
                        {errors.full_name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.full_name.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                        Email address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Mail size={18} />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10 h-11"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Lock size={18} />
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 h-11"
                            {...register("password")}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute inset-y-0 right-0 h-full px-3 text-gray-400 hover:text-gray-600 hover:bg-transparent transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                    </div>
                    {errors.password && (
                        <p className="text-xs mt-2 text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Signup Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mt-4 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 font-medium">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-600 hover:text-blue-700 font-bold underline-offset-4 hover:underline transition-all">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;