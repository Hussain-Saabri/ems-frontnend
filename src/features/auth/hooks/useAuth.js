// hooks/useAuth.js
import { useState } from "react";
import { authService } from "../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (data) => {
        setIsLoading(true);
        const minDelay = new Promise(resolve => setTimeout(resolve, 3000));

        try {
            const response = await authService.login(data);
            await minDelay; // Ensure at least 3 seconds have passed

            const { token, user } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful");
            navigate("/dashboard");
            return response.data;
        } catch (err) {
            await minDelay; // Ensure at least 3 seconds have passed even on error
            const errorMessage = err.response?.data?.message || "Login failed";
            toast.error(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data) => {
        setIsLoading(true);
        const minDelay = new Promise(resolve => setTimeout(resolve, 3000));

        try {
            const response = await authService.register(data);
            await minDelay; // Ensure at least 3 seconds have passed

            toast.success("Registration successful! Please login.");
            navigate("/");
            return response.data;
        } catch (err) {
            await minDelay; // Ensure at least 3 seconds have passed even on error
            const errorMessage = err.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        toast.info("Logged out successfully");
    };

    return {
        login,
        register,
        logout,
        isLoading
    };
};
