import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Logo } from '@/components/base/Logo';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login, googleLogin, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                email_id: data.email,
                password: data.password,
            };
            await login(payload);
        } catch (error) {
        }
    };

    return (
        <div className="w-full max-w-md border border-gray-300 bg-white rounded-2xl p-8 transition-all duration-300">
            {/* Header */}
            <div className="flex flex-col items-center mb-1">
                <Logo width={48} height={48} showText={false} className="mb-2" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Lock size={18} />
                        </div>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl mt-2 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        "Log In"
                    )}
                </Button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-4">
                <div className="relative w-full text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <span className="relative px-3 bg-white text-xs font-medium text-gray-400 uppercase tracking-widest">
                        Or continue with
                    </span>
                </div>

                <div className="w-full flex justify-center">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            googleLogin(credentialResponse.credential);
                        }}
                        onError={() => {
                            console.log('Google Login Failed');
                        }}
                        useOneTap
                        theme="filled_blue"
                        shape="pill"
                        size="large"
                        width="100%"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">

            </div>
        </div>
    );
};

export default LoginForm;
