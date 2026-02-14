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
    isEmailLoading: false,
    isGoogleLoading: false,

    login: async (data, navigate) => {
        set({ isEmailLoading: true });

        try {
            const response = await authService.login(data);

            const { token, data: user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            set({
                user,
                token,
                isAuthenticated: true,
                isEmailLoading: false,
            });

            toast.success("Login successful");
            if (navigate) navigate("/employees");

        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Login failed";

            // toast.error(errorMessage); // Removed to prevent duplicate toasts (LoginForm handles it)
            set({ isEmailLoading: false });
            throw err;
        }
    },

    googleLogin: async (idToken, navigate) => {
        set({ isGoogleLoading: true });
        try {
            const response = await authService.googleLogin({ idToken });
            const { token, data: user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            set({
                user,
                token,
                isAuthenticated: true,
                isGoogleLoading: false,
            });


            if (navigate) navigate("/employees");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Google Login failed";
            // toast.error(errorMessage); // Removed to prevent duplicate toasts (LoginForm handles it)
            set({ isGoogleLoading: false });
            throw err;
        }
    },

    logout: async (navigate) => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });

            if (navigate) navigate("/login");
        }
    },
}));

export default useAuthStore;
