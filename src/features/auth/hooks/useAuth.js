import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

export const useAuth = () => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const googleLogin = useAuthStore((state) => state.googleLogin);
    const logout = useAuthStore((state) => state.logout);
    const isEmailLoading = useAuthStore((state) => state.isEmailLoading);
    const isGoogleLoading = useAuthStore((state) => state.isGoogleLoading);

    return {
        login: (data, customNavigate) => login(data, customNavigate !== undefined ? customNavigate : navigate),
        googleLogin: (idToken, customNavigate) => googleLogin(idToken, customNavigate !== undefined ? customNavigate : navigate),
        logout: () => logout(navigate),
        isEmailLoading,
        isGoogleLoading,
    };
};
