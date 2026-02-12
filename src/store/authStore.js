import { create } from "zustand";
import { authService } from "@/features/auth/services/authService";
import { toast } from "sonner";

const useAuthStore = create((set) => ({
    user: (() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch (e) {
            return null;
        }
    })(),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,

    login: async (data, navigate) => {
        set({ isLoading: true });

        try {
            const response = await authService.login(data);

            const { token, data: user } = response.data;

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful");
            navigate("/employees");

        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Login failed";

            toast.error(errorMessage);
            set({ isLoading: false });
            throw err;
        }
    },

    googleLogin: async (idToken, navigate) => {
        set({ isLoading: true });
        try {
            const response = await authService.googleLogin({ idToken });
            const { token, data: user } = response.data;

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Google Login successful");
            navigate("/employees");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Google Login failed";
            toast.error(errorMessage);
            set({ isLoading: false });
            throw err;
        }
    },

    logout: (navigate) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });

        toast.info("Logged out successfully");
        navigate("/");
    },
}));

export default useAuthStore;
