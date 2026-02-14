import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema } from '../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';
import { Logo } from '@/components/base/Logo';
import LoginTransition from './LoginTransition';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showTransition, setShowTransition] = useState(false);

    const { login, googleLogin, isEmailLoading } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
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
            setShowTransition(true);

            const payload = {
                email_id: data.email,
                password: data.password,
            };

            await login(payload, null);

            setTimeout(() => {
                navigate("/employees");
            }, 2000);

        } catch (error) {
            setShowTransition(false);

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Login failed";

            toast.error(errorMessage);
            reset();
        }
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {!showTransition && (
                    <motion.div
                        key="login-form"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-md border border-gray-300 bg-white rounded-2xl p-6"
                    >
                        {/* Header */}
                        <div className="flex flex-col items-center mb-2">
                            <Logo width={40} height={40} showText={false} />
                            <h1 className="text-xl font-bold text-gray-900">Login</h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email address
                                </label>

                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <Input
                                        type="email"
                                        className="pl-10 h-11"
                                        placeholder="name@example.com"
                                        {...register("email")}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <div className="relative mt-1">
                                    <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        className="pl-10 h-11"
                                        placeholder="Enter password"
                                        {...register("password")}
                                    />

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={isEmailLoading}
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                            >
                                {isEmailLoading ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={16} />
                                        Logging in...
                                    </>
                                ) : "Log In"}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="mt-4 text-center text-xs text-gray-400 uppercase">
                            Or continue with
                        </div>

                        {/* Google */}
                       <div className="mt-3 flex justify-center min-h-[48px]">
  <GoogleLogin
    onSuccess={async (res) => {
      setShowTransition(true); // show AFTER popup
      try {
        await googleLogin(res.credential, null);
        setTimeout(() => navigate("/employees"), 2000);
      } catch {
        setShowTransition(false);
        toast.error("Google login failed");
      }
    }}
    onError={() => {
      toast.error("Google login failed");
    }}
    theme="filled_blue"
    shape="pill"
    size="large"
  />
</div>

                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showTransition && <LoginTransition />}
            </AnimatePresence>
        </>
    );
};

export default LoginForm;
