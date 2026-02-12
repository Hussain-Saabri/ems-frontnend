import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

export const useAuth = () => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const googleLogin = useAuthStore((state) => state.googleLogin);
    const logout = useAuthStore((state) => state.logout);
    const isLoading = useAuthStore((state) => state.isLoading);

    return {
        login: (data) => login(data, navigate),
        googleLogin: (idToken) => googleLogin(idToken, navigate),
        logout: () => logout(navigate),
        isLoading,
    };
};
